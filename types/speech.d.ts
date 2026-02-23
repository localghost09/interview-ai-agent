/** A single filler word detected in the transcript with its timestamp. */
interface SpeechFiller {
  word: string;
  timestamp: number;
}

/** A hesitation pause detected between two words. */
interface SpeechHesitation {
  startSec: number;
  endSec: number;
}

/** Linguistic metrics computed from the transcription. */
interface SpeechMetrics {
  transcript: string;
  durationSeconds: number;
  wpm: number;
  fillerCount: number;
  fillers: SpeechFiller[];
  hesitationCount: number;
  hesitations: SpeechHesitation[];
}

/** AI coaching feedback returned by the LLM. */
interface CoachingFeedback {
  clarityScore: number;
  strengths: string[];
  weaknesses: string[];
  actionableSteps: [string, string, string];
}

/** Full response from POST /api/speech/analyze. */
interface SpeechAnalysisResponse extends SpeechMetrics, CoachingFeedback {
  confidenceScore: number;
}
