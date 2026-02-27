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

/** WPM computed over a time window. */
interface WpmSegment {
  windowStartSec: number;
  windowEndSec: number;
  wpm: number;
  wordCount: number;
}

/** A segment where pace deviated significantly from average. */
interface PaceSegment {
  windowStartSec: number;
  windowEndSec: number;
  wpm: number;
  deviationType: 'rushing' | 'dragging';
}

/** Sub-metrics that anchor communicationClarity to measurable observations. */
interface ClaritySubMetrics {
  structureScore: number;
  coherenceScore: number;
  conciseness: number;
  vocabularyAppropriateness: number;
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
  segmentedWpm: WpmSegment[];
  paceConsistencyScore: number;
  rushingSegments: PaceSegment[];
  draggingSegments: PaceSegment[];
  vocabularyDiversityRatio: number;
  averageGap: number;
  adaptiveHesitationThreshold: number;
}

/** AI coaching feedback returned by the LLM. */
interface CoachingFeedback {
  clarityScore: number;
  strengths: string[];
  weaknesses: string[];
  actionableSteps: [string, string, string];
}

// ---------------------------------------------------------------------------
// Advanced evaluation types
// ---------------------------------------------------------------------------

/** Semantic similarity between the user's answer and an ideal response. */
interface SemanticSimilarityAnalysis {
  score: number;
  explanation: string;
  idealAnswerSummary: string;
}

/** Keyword recall — how many expected keywords were mentioned. */
interface KeywordRecallAnalysis {
  score: number;
  expectedKeywords: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

/** Context completeness — aspects the answer should cover. */
interface ContextCompletenessAnalysis {
  score: number;
  expectedAspects: string[];
  coveredAspects: string[];
  missingAspects: string[];
  explanation: string;
}

/** Confidence detection — linguistic patterns indicating confidence or hedging. */
interface ConfidenceDetectionAnalysis {
  score: number;
  assertivePatterns: string[];
  hedgingPatterns: string[];
  passivePatterns: string[];
  explanation: string;
}

/** Sentiment polarity of the response. */
interface SentimentPolarityAnalysis {
  score: number;
  polarity: 'positive' | 'neutral' | 'negative';
  positiveIndicators: string[];
  negativeIndicators: string[];
  explanation: string;
}

/** All five evaluation method results bundled together. */
interface EvaluationMethods {
  semanticSimilarity: SemanticSimilarityAnalysis;
  keywordRecall: KeywordRecallAnalysis;
  contextCompleteness: ContextCompletenessAnalysis;
  confidenceDetection: ConfidenceDetectionAnalysis;
  sentimentPolarity: SentimentPolarityAnalysis;
}

/** The four primary scored parameters (0-100 each). */
interface EvaluationScores {
  technicalAccuracy: number;
  behaviouralConfidence: number;
  communicationClarity: number;
  fillerWordFrequency: number;
}

/** Enhanced coaching feedback — superset of CoachingFeedback. */
interface EnhancedCoachingFeedback extends CoachingFeedback {
  evaluationScores: EvaluationScores;
  evaluationMethods: EvaluationMethods;
  claritySubMetrics: ClaritySubMetrics;
  overallScore: number;
  overallVerdict: string;
}

/** Full response from POST /api/speech/analyze. */
interface SpeechAnalysisResponse extends SpeechMetrics, EnhancedCoachingFeedback {
  speechEnergyScore: number;
  fillerFrequency: number;
  question: string;
  isFallback: boolean;
  metricsReliability: 'high' | 'medium' | 'low';
}
