"use client";

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): ISpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): ISpeechRecognition;
    };
  }
}

export class VoiceRecorder {
  private recognition: ISpeechRecognition | null = null;
  private isRecording = false;
  private onTranscript: (text: string) => void;
  private onRecordingChange: (recording: boolean) => void;
  private onError?: (message: string) => void;
  private accumulatedTranscript = '';
  private supported = false;
  private networkRetryCount = 0;
  private readonly maxNetworkRetries = 2;

  constructor(
    onTranscript: (text: string) => void,
    onRecordingChange: (recording: boolean) => void,
    onError?: (message: string) => void
  ) {
    this.onTranscript = onTranscript;
    this.onRecordingChange = onRecordingChange;
    this.onError = onError;
    this.setupSpeechRecognition();
  }

  private setupSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.supported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          console.log('Speech recognition started');
          this.isRecording = true;
          this.networkRetryCount = 0;
          this.onRecordingChange(true);
        };

        this.recognition.onend = () => {
          console.log('Speech recognition ended');
          this.isRecording = false;
          this.onRecordingChange(false);
        };

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
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
          
          // Add final results to accumulated transcript
          if (finalTranscript) {
            this.accumulatedTranscript += finalTranscript + ' ';
            this.onTranscript(this.accumulatedTranscript.trim());
          } else if (interimTranscript) {
            // Show interim results combined with accumulated
            const fullTranscript = this.accumulatedTranscript + interimTranscript;
            this.onTranscript(fullTranscript.trim());
          }
        };

        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          const code = event.error;

          // "aborted" is usually expected when user stops recording manually.
          if (code === 'aborted') {
            this.isRecording = false;
            this.onRecordingChange(false);
            return;
          }

          this.isRecording = false;
          this.onRecordingChange(false);

          let message = 'Speech recognition failed. Please try again or type your answer.';

          if (code === 'network') {
            if (this.networkRetryCount < this.maxNetworkRetries) {
              this.networkRetryCount += 1;

              // Retry once/twice for transient browser speech-service failures.
              setTimeout(() => {
                if (!this.recognition || this.isRecording) return;
                try {
                  this.recognition.start();
                } catch (retryError) {
                  console.error('Speech recognition retry failed:', retryError);
                }
              }, 700);

              return;
            }

            message = 'Speech recognition network issue. Check internet and browser microphone permissions, then retry.';
          } else if (code === 'not-allowed' || code === 'service-not-allowed') {
            message = 'Microphone access denied. Enable microphone permission in your browser and retry.';
          } else if (code === 'no-speech') {
            message = 'No speech detected. Speak clearly and try recording again.';
          } else if (code === 'audio-capture') {
            message = 'No microphone detected. Connect/select a microphone and retry.';
          }

          console.error('Speech recognition error:', code);
          this.onError?.(message);
        };
      } else {
        console.warn('Speech recognition not supported');
        this.supported = false;
        this.onError?.('Speech recognition is not supported in this browser. Please type your answer.');
      }
    }
  }

  start() {
    if (this.recognition && !this.isRecording) {
      try {
        this.accumulatedTranscript = ''; // Reset accumulated transcript
        this.recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }

  stop() {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
    }
  }

  toggle() {
    if (this.isRecording) {
      this.stop();
    } else {
      this.start();
    }
  }

  isActive() {
    return this.isRecording;
  }

  isSupported() {
    return this.supported;
  }
}

export default VoiceRecorder;
