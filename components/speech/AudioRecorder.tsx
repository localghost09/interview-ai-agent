'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { analyzeSpeech } from '@/lib/speech/api';

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionResultEvent extends Event {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: { transcript: string };
    };
  };
}

/** RMS threshold (0-1 scale) above which speech is considered confident. */
const CONFIDENCE_THRESHOLD = 0.03;

interface AudioRecorderProps {
  onAnalysisComplete: (result: SpeechAnalysisResponse) => void;
  onError: (error: string) => void;
  onStateChange?: (state: 'idle' | 'recording' | 'analyzing') => void;
  language?: 'en-US' | 'hi-IN';
  onTranscriptUpdate?: (transcript: string, isInterim: boolean) => void;
}

/**
 * Records microphone audio, tracks real-time confidence via RMS volume,
 * and submits the recording to the speech analysis API.
 */
export default function AudioRecorder({ onAnalysisComplete, onError, onStateChange, language = 'en-US', onTranscriptUpdate }: AudioRecorderProps) {
  const [state, setState] = useState<'idle' | 'recording' | 'analyzing'>('idle');
  const [duration, setDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Confidence tracking refs
  const sampleCountRef = useRef(0);
  const aboveThresholdCountRef = useRef(0);
  const startTimeRef = useRef(0);

  // Speech recognition refs
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const accumulatedTranscriptRef = useRef('');
  const isRecordingRef = useRef(false);
  const onTranscriptUpdateRef = useRef(onTranscriptUpdate);
  onTranscriptUpdateRef.current = onTranscriptUpdate;

  const updateState = useCallback((newState: 'idle' | 'recording' | 'analyzing') => {
    setState(newState);
    onStateChange?.(newState);
  }, [onStateChange]);

  /** Samples RMS volume from the AnalyserNode and updates confidence tracking. */
  const sampleVolume = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(dataArray);

    // Compute RMS
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / dataArray.length);

    setVolumeLevel(Math.min(rms * 5, 1)); // Scale for visual display

    // Track confidence
    sampleCountRef.current++;
    if (rms > CONFIDENCE_THRESHOLD) {
      aboveThresholdCountRef.current++;
    }

    const ratio = sampleCountRef.current > 0
      ? aboveThresholdCountRef.current / sampleCountRef.current
      : 0;
    setConfidenceScore(Math.round(ratio * 100));

    animationFrameRef.current = requestAnimationFrame(sampleVolume);
  }, []);

  /** Stops all audio resources and clears timers. */
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    isRecordingRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  /** Starts recording audio from the microphone. */
  const startRecording = async () => {
    try {
      chunksRef.current = [];
      sampleCountRef.current = 0;
      aboveThresholdCountRef.current = 0;
      setDuration(0);
      setVolumeLevel(0);
      setConfidenceScore(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up Web Audio API for volume analysis
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      source.connect(analyser);

      // Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm',
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      startTimeRef.current = Date.now();
      isRecordingRef.current = true;
      updateState('recording');

      // Start live speech recognition
      accumulatedTranscriptRef.current = '';
      try {
        const SpeechRecognitionCtor =
          (window as unknown as { SpeechRecognition?: { new (): ISpeechRecognition } }).SpeechRecognition ||
          (window as unknown as { webkitSpeechRecognition?: { new (): ISpeechRecognition } }).webkitSpeechRecognition;

        if (SpeechRecognitionCtor) {
          const recognition = new SpeechRecognitionCtor();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = language;

          recognition.onresult = (event: SpeechRecognitionResultEvent) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
              } else {
                interimTranscript += transcript;
              }
            }

            if (finalTranscript) {
              accumulatedTranscriptRef.current += finalTranscript + ' ';
              onTranscriptUpdateRef.current?.(accumulatedTranscriptRef.current.trim(), false);
            } else if (interimTranscript) {
              const full = accumulatedTranscriptRef.current + interimTranscript;
              onTranscriptUpdateRef.current?.(full.trim(), true);
            }
          };

          recognition.onend = () => {
            // Auto-restart if still recording (recognition stops after silence)
            if (isRecordingRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch {
                // Ignore — may already be starting
              }
            }
          };

          recognition.onerror = () => {
            // Non-fatal — live transcription is supplementary
          };

          recognitionRef.current = recognition;
          recognition.start();
        }
      } catch {
        // Speech recognition not available — continue recording without it
      }

      // Start volume sampling
      animationFrameRef.current = requestAnimationFrame(sampleVolume);

      // Duration timer
      timerRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } catch (err) {
      cleanup();
      onError(
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Microphone access was denied. Please allow microphone access and try again.'
          : 'Failed to start recording. Please check your microphone.'
      );
    }
  };

  /** Stops recording and sends audio to the analysis API. */
  const stopRecording = () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') return;

    isRecordingRef.current = false;

    // Stop speech recognition
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }

    const finalConfidence = confidenceScore;

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      cleanup();

      if (audioBlob.size === 0) {
        onError('No audio was recorded. Please try again.');
        updateState('idle');
        return;
      }

      updateState('analyzing');

      try {
        const result = await analyzeSpeech(audioBlob, finalConfidence);
        onAnalysisComplete(result);
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Speech analysis failed');
        updateState('idle');
      }
    };

    mediaRecorderRef.current.stop();
  };

  /** Formats seconds as MM:SS. */
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const confidenceLabel = confidenceScore >= 70 ? 'High Confidence' : confidenceScore >= 40 ? 'Moderate' : 'Low';
  const confidenceColor = confidenceScore >= 70 ? 'text-green-500' : confidenceScore >= 40 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Record / Stop Button */}
      <button
        onClick={state === 'recording' ? stopRecording : startRecording}
        disabled={state === 'analyzing'}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
          state === 'recording'
            ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30'
            : state === 'analyzing'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
        }`}
      >
        {state === 'analyzing' ? (
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        ) : state === 'recording' ? (
          <Square className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-10 h-10 text-white" />
        )}

        {/* Pulsing ring when recording */}
        {state === 'recording' && (
          <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-30" />
        )}
      </button>

      {/* Status text */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {state === 'idle' && 'Tap to start recording'}
        {state === 'recording' && 'Recording... tap to stop'}
        {state === 'analyzing' && 'Analyzing your speech...'}
      </p>

      {/* Recording info */}
      {state === 'recording' && (
        <div className="w-full max-w-sm space-y-4">
          {/* Timer */}
          <div className="text-center">
            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume meter */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Volume</span>
              <span>{Math.round(volumeLevel * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-100"
                style={{ width: `${volumeLevel * 100}%` }}
              />
            </div>
          </div>

          {/* Confidence indicator */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Confidence</span>
              <span className={confidenceColor}>{confidenceLabel} ({confidenceScore}%)</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  confidenceScore >= 70
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : confidenceScore >= 40
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
