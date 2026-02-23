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
  private accumulatedTranscript = '';

  constructor(onTranscript: (text: string) => void, onRecordingChange: (recording: boolean) => void) {
    this.onTranscript = onTranscript;
    this.onRecordingChange = onRecordingChange;
    this.setupSpeechRecognition();
  }

  private setupSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          console.log('Speech recognition started');
          this.isRecording = true;
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
          console.error('Speech recognition error:', event.error);
          this.stop();
        };
      } else {
        console.warn('Speech recognition not supported');
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
}

export default VoiceRecorder;
