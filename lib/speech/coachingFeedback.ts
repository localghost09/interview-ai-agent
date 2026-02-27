import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are a senior career coach and interview evaluator. You will receive an interview QUESTION, the candidate's spoken transcript, and detailed speech metrics including pace analysis. Evaluate the answer using all five evaluation methods and the clarity sub-metrics described in the user prompt. You must be neutral and unbiased — do not make assumptions based on accent, speaking speed norms, or cultural background. Return ONLY valid JSON matching the provided schema — no markdown, no extra keys.`;

/**
 * Collects all configured Gemini API keys from environment variables.
 * Supports GEMINI_API_KEY, GOOGLE_GEMINI_API_KEY, and GEMINI_API_KEY_2 through _5.
 */
function getApiKeys(): string[] {
  const keys: string[] = [];
  const primary = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
  if (primary) keys.push(primary);
  for (let i = 2; i <= 5; i++) {
    const key = process.env[`GEMINI_API_KEY_${i}`];
    if (key) keys.push(key);
  }
  return keys;
}

/** Async sleep helper. */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extracts the suggested retry delay (in ms) from a 429 error, or returns null.
 */
function parseRetryDelay(error: unknown): number | null {
  const msg = error instanceof Error ? error.message : String(error);
  const match = msg.match(/retry\s*(?:in|Delay[":]*\s*)["]?(\d+(?:\.\d+)?)\s*s/i);
  if (match) return Math.ceil(parseFloat(match[1]) * 1000);
  return null;
}

/** Returns true if the error is a 429 rate-limit error. */
function isRateLimitError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota');
}

/**
 * Computes a deterministic filler-word-frequency score (0-100) from fillers/min.
 * Uses exponential decay: score = 100 * e^(-0.15 * fillersPerMinute).
 * Curve: 0/min=100, 2/min≈74, 5/min≈47, 10/min≈22, 15/min≈11.
 * This avoids the harshness of a linear scale that hits 0 at 10 fillers/min.
 */
function computeFillerScore(fillersPerMinute: number): number {
  if (fillersPerMinute <= 0) return 100;
  return Math.round(100 * Math.exp(-0.15 * fillersPerMinute));
}

/** Clamp a value between 0 and 100 (inclusive). */
function clamp(val: number): number {
  return Math.max(0, Math.min(100, Math.round(val)));
}

/** Fill default sub-objects if the AI omitted any evaluation method. */
function fillDefaults(data: EnhancedCoachingFeedback): void {
  if (!data.evaluationMethods) {
    data.evaluationMethods = {} as EvaluationMethods;
  }
  const em = data.evaluationMethods;

  if (!em.semanticSimilarity) {
    em.semanticSimilarity = { score: 0, explanation: 'Not evaluated.', idealAnswerSummary: '' };
  }
  if (!em.keywordRecall) {
    em.keywordRecall = { score: 0, expectedKeywords: [], matchedKeywords: [], missingKeywords: [] };
  }
  if (!em.contextCompleteness) {
    em.contextCompleteness = { score: 0, expectedAspects: [], coveredAspects: [], missingAspects: [], explanation: 'Not evaluated.' };
  }
  if (!em.confidenceDetection) {
    em.confidenceDetection = { score: 0, assertivePatterns: [], hedgingPatterns: [], passivePatterns: [], explanation: 'Not evaluated.' };
  }
  if (!em.sentimentPolarity) {
    em.sentimentPolarity = { score: 0, polarity: 'neutral', positiveIndicators: [], negativeIndicators: [], explanation: 'Not evaluated.' };
  }

  if (!data.evaluationScores) {
    data.evaluationScores = { technicalAccuracy: 0, behaviouralConfidence: 0, communicationClarity: 0, fillerWordFrequency: 0 };
  }

  if (!data.claritySubMetrics) {
    data.claritySubMetrics = { structureScore: 0, coherenceScore: 0, conciseness: 0, vocabularyAppropriateness: 0 };
  }
}

/** Clamp all scores inside the evaluation data to 0-100. */
function clampAllScores(data: EnhancedCoachingFeedback): void {
  data.clarityScore = clamp(data.clarityScore);
  data.overallScore = clamp(data.overallScore);

  const es = data.evaluationScores;
  es.technicalAccuracy = clamp(es.technicalAccuracy);
  es.behaviouralConfidence = clamp(es.behaviouralConfidence);
  es.communicationClarity = clamp(es.communicationClarity);
  es.fillerWordFrequency = clamp(es.fillerWordFrequency);

  const em = data.evaluationMethods;
  em.semanticSimilarity.score = clamp(em.semanticSimilarity.score);
  em.keywordRecall.score = clamp(em.keywordRecall.score);
  em.contextCompleteness.score = clamp(em.contextCompleteness.score);
  em.confidenceDetection.score = clamp(em.confidenceDetection.score);
  em.sentimentPolarity.score = clamp(em.sentimentPolarity.score);

  const cs = data.claritySubMetrics;
  cs.structureScore = clamp(cs.structureScore);
  cs.coherenceScore = clamp(cs.coherenceScore);
  cs.conciseness = clamp(cs.conciseness);
  cs.vocabularyAppropriateness = clamp(cs.vocabularyAppropriateness);
}

/**
 * Generates advanced AI coaching feedback from a speech transcript, computed
 * metrics, the interview question, and filler frequency.
 */
export async function generateCoachingFeedback(
  transcript: string,
  metrics: SpeechMetrics,
  question: string,
  fillerFrequency: number
): Promise<EnhancedCoachingFeedback & { isFallback: boolean }> {
  const apiKeys = getApiKeys();
  if (apiKeys.length === 0) {
    throw new Error('Gemini API key not configured. Set GEMINI_API_KEY in environment variables.');
  }

  // Build pace breakdown strings for the prompt
  const paceData = metrics.segmentedWpm.length > 0
    ? metrics.segmentedWpm.map(s => `  ${s.windowStartSec}-${s.windowEndSec}s: ${s.wpm} WPM (${s.wordCount} words)`).join('\n')
    : '  No segmented data available.';

  const rushInfo = metrics.rushingSegments.length > 0
    ? metrics.rushingSegments.map(s => `  ${s.windowStartSec}-${s.windowEndSec}s: ${s.wpm} WPM`).join('\n')
    : '  None detected.';

  const dragInfo = metrics.draggingSegments.length > 0
    ? metrics.draggingSegments.map(s => `  ${s.windowStartSec}-${s.windowEndSec}s: ${s.wpm} WPM`).join('\n')
    : '  None detected.';

  const prompt = `You are evaluating a candidate's spoken answer to an interview question.

INTERVIEW QUESTION:
${question}

CANDIDATE'S TRANSCRIPT:
${transcript.slice(0, 10000)}

SPEECH METRICS (measured by audio analysis — treat as ground truth):
- Total words: ${transcript.split(/\s+/).filter(Boolean).length}
- Words per minute (overall): ${metrics.wpm}
- Filler word count: ${metrics.fillerCount}
- Filler words detected: ${metrics.fillers.map(f => f.word).join(', ') || 'None'}
- Filler frequency: ${fillerFrequency.toFixed(2)} fillers/min
- Hesitation pauses (gaps > ${metrics.adaptiveHesitationThreshold.toFixed(1)}s): ${metrics.hesitationCount}
- Duration: ${metrics.durationSeconds.toFixed(1)} seconds
- Vocabulary diversity (Guiraud index, 0-1 normalized): ${metrics.vocabularyDiversityRatio.toFixed(3)}
- Pace consistency score: ${metrics.paceConsistencyScore}/100

PACE BREAKDOWN (per 15-second window):
${paceData}

RUSHING SEGMENTS (significantly faster than average):
${rushInfo}

DRAGGING SEGMENTS (significantly slower than average):
${dragInfo}

NEUTRALITY POLICY (you MUST follow these):
- Do NOT penalize or reward based on accent, dialect, or regional speaking patterns.
- Do NOT penalize slower speakers from cultures where measured speech is normal.
- A speaking pace between 110-180 WPM is all equally acceptable; only extreme outliers (<90 or >200) should be noted mildly.
- Judge content quality and structure, not pronunciation or fluency markers that correlate with non-native speakers.
- Hesitation pauses should be evaluated in context: a thoughtful pause before a complex explanation is not a weakness.
- Do NOT assume gender, ethnicity, or background from the transcript.
- Be fair and balanced — identify genuine strengths even in weaker answers, and identify genuine weaknesses even in strong answers.
- Context-aware hedging: "I think this is the right approach because..." is CONFIDENT (hedging word + supporting reasoning = assertive opinion). Only flag hedging when it lacks justification, e.g., "I think maybe we could sort of try...".

EVALUATION INSTRUCTIONS:
Evaluate the candidate's answer using these 5 methods. For each, provide the fields exactly as described:

1. SEMANTIC SIMILARITY — Compare the candidate's answer meaning to an ideal response for this specific question.
   Rubric:
   - 90-100: Covers all key points of an ideal answer with strong depth
   - 70-89: Covers most key points, minor gaps in depth
   - 50-69: Partial coverage, some important points missing
   - 30-49: Significant gaps, only surface-level relevance
   - 0-29: Largely off-topic or irrelevant
   Return: { "score": 0-100, "explanation": "specific reasoning with transcript evidence", "idealAnswerSummary": "2-3 sentence ideal answer" }

2. KEYWORD RECALL — Identify 5-10 important domain keywords/phrases expected for this question. Count how many the candidate mentioned.
   Score = (matchedKeywords.length / expectedKeywords.length) * 100
   Return: { "score": 0-100, "expectedKeywords": [...], "matchedKeywords": [...], "missingKeywords": [...] }

3. CONTEXT COMPLETENESS — Identify 3-6 key aspects/dimensions the answer should cover (e.g., situation, action, result for behavioral questions).
   Score = (coveredAspects.length / expectedAspects.length) * 100
   Return: { "score": 0-100, "expectedAspects": [...], "coveredAspects": [...], "missingAspects": [...], "explanation": "..." }

4. CONFIDENCE DETECTION — Analyze LINGUISTIC patterns only (word choice, sentence structure). Do NOT use audio volume or pace as a confidence proxy.
   Identify: assertive language ("I led", "I decided"), hedging language ("maybe", "I think", "sort of"), passive constructions ("it was done").
   Rubric:
   - 90-100: Consistently assertive, strong ownership language
   - 70-89: Mostly assertive with occasional hedging
   - 50-69: Mixed assertive and hedging patterns
   - 30-49: Predominantly hedging or passive language
   - 0-29: Almost entirely passive or uncertain language
   Return: { "score": 0-100, "assertivePatterns": ["quote from transcript"], "hedgingPatterns": ["quote"], "passivePatterns": ["quote"], "explanation": "..." }

5. SENTIMENT POLARITY — Assess the overall emotional tone. This measures professional positivity, not personality.
   Score: 50 = neutral, >50 = positive, <50 = negative. Most professional answers should score 45-75.
   Return: { "score": 0-100, "polarity": "positive"|"neutral"|"negative", "positiveIndicators": [...], "negativeIndicators": [...], "explanation": "..." }

ANSWER STRUCTURE ANALYSIS (incorporate into Context Completeness and Clarity sub-metrics):
- Does the answer have a clear opening/introduction?
- Does it have a substantive body with specifics/examples?
- Does it have a conclusion or summary?
- For behavioral questions, does it follow STAR format (Situation, Task, Action, Result)?

COMMUNICATION CLARITY SUB-METRICS (you MUST score each individually):
- structureScore: 0-100 (does the answer have intro/body/conclusion? is it logically ordered?)
- coherenceScore: 0-100 (do sentences flow logically? are transitions smooth?)
- conciseness: 0-100 (is the answer appropriately detailed without being rambling or too terse?)
- vocabularyAppropriateness: 0-100 (does the candidate use domain-appropriate language?)

SCORING DERIVATION (use these exact weights):
- technicalAccuracy = 0.40 * semanticSimilarity.score + 0.35 * keywordRecall.score + 0.25 * contextCompleteness.score
- behaviouralConfidence = 0.60 * confidenceDetection.score + 0.20 * sentimentPolarity.score + 0.20 * paceAndDeliveryScore
  where paceAndDeliveryScore = paceConsistencyScore * 0.6 + max(0, 100 - hesitationCount * 15) * 0.4
- communicationClarity = 0.30 * structureScore + 0.25 * coherenceScore + 0.25 * conciseness + 0.20 * vocabularyAppropriateness
- fillerWordFrequency = your estimate (will be blended with server computation)
- overallScore = 0.35 * technicalAccuracy + 0.25 * behaviouralConfidence + 0.25 * communicationClarity + 0.15 * fillerWordFrequency

Return a JSON object with this exact schema:
{
  "clarityScore": number (0-100),
  "strengths": ["string (2-4 specific positive observations with transcript evidence)"],
  "weaknesses": ["string (2-4 specific areas for improvement with concrete suggestions)"],
  "actionableSteps": ["step 1", "step 2", "step 3"],
  "evaluationScores": {
    "technicalAccuracy": number (0-100),
    "behaviouralConfidence": number (0-100),
    "communicationClarity": number (0-100),
    "fillerWordFrequency": number (0-100)
  },
  "claritySubMetrics": {
    "structureScore": number (0-100),
    "coherenceScore": number (0-100),
    "conciseness": number (0-100),
    "vocabularyAppropriateness": number (0-100)
  },
  "evaluationMethods": {
    "semanticSimilarity": { "score": number, "explanation": "string", "idealAnswerSummary": "string" },
    "keywordRecall": { "score": number, "expectedKeywords": [], "matchedKeywords": [], "missingKeywords": [] },
    "contextCompleteness": { "score": number, "expectedAspects": [], "coveredAspects": [], "missingAspects": [], "explanation": "string" },
    "confidenceDetection": { "score": number, "assertivePatterns": [], "hedgingPatterns": [], "passivePatterns": [], "explanation": "string" },
    "sentimentPolarity": { "score": number, "polarity": "positive"|"neutral"|"negative", "positiveIndicators": [], "negativeIndicators": [], "explanation": "string" }
  },
  "overallScore": number (0-100),
  "overallVerdict": "string (1-2 sentence summary verdict)"
}`;

  let lastError: Error | null = null;
  const maxAttempts = apiKeys.length * 2; // 2 passes through all keys

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const keyIndex = attempt % apiKeys.length;
    const apiKey = apiKeys[keyIndex];
    const ai = new GoogleGenAI({ apiKey });

    try {
      console.log(`Coaching feedback attempt ${attempt + 1}/${maxAttempts} (key ${keyIndex + 1}/${apiKeys.length})`);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (!text) throw new Error('No response from AI');

      const data = JSON.parse(text) as EnhancedCoachingFeedback;

      // Validate base required fields
      if (
        typeof data.clarityScore !== 'number' ||
        !Array.isArray(data.strengths) ||
        !Array.isArray(data.weaknesses) ||
        !Array.isArray(data.actionableSteps)
      ) {
        throw new Error('Invalid response schema from AI');
      }

      // Ensure exactly 3 actionable steps
      while (data.actionableSteps.length < 3) {
        data.actionableSteps.push('Continue practicing your interview responses regularly.');
      }
      data.actionableSteps = data.actionableSteps.slice(0, 3) as [string, string, string];

      // Fill defaults for any missing evaluation sub-objects
      fillDefaults(data);

      // Blended filler score: 70% deterministic (ground truth) + 30% AI (contextual)
      const deterministicFiller = computeFillerScore(fillerFrequency);
      const aiFiller = data.evaluationScores.fillerWordFrequency;
      data.evaluationScores.fillerWordFrequency = Math.round(
        deterministicFiller * 0.70 + aiFiller * 0.30
      );

      // Recompute communicationClarity from grounded sub-metrics
      const cs = data.claritySubMetrics;
      data.evaluationScores.communicationClarity = Math.round(
        cs.structureScore * 0.30 +
        cs.coherenceScore * 0.25 +
        cs.conciseness * 0.25 +
        cs.vocabularyAppropriateness * 0.20
      );

      // Recompute overall score for consistency
      const es = data.evaluationScores;
      data.overallScore = Math.round(
        es.technicalAccuracy * 0.35 +
        es.behaviouralConfidence * 0.25 +
        es.communicationClarity * 0.25 +
        es.fillerWordFrequency * 0.15
      );

      if (!data.overallVerdict || typeof data.overallVerdict !== 'string') {
        data.overallVerdict = data.overallScore >= 75
          ? 'Strong performance — well-structured and confident.'
          : data.overallScore >= 50
            ? 'Decent effort with room for improvement in content and delivery.'
            : 'Needs significant improvement in both content coverage and delivery.';
      }

      // Clamp all scores
      clampAllScores(data);

      return { ...data, isFallback: false };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Coaching feedback attempt ${attempt + 1} failed (key ${keyIndex + 1}):`, lastError.message);

      // On rate-limit errors, wait before trying the next key
      if (isRateLimitError(error) && attempt < maxAttempts - 1) {
        const serverDelay = parseRetryDelay(error);
        // Use server-suggested delay (capped at 30s), or exponential backoff: 2s, 4s, 8s…
        const backoffMs = serverDelay
          ? Math.min(serverDelay, 30_000)
          : Math.min(2000 * Math.pow(2, Math.floor(attempt / apiKeys.length)), 30_000);
        console.log(`Rate limited — waiting ${(backoffMs / 1000).toFixed(1)}s before next attempt`);
        await sleep(backoffMs);
      }
    }
  }

  // All attempts exhausted — return graceful fallback with isFallback flag
  console.error(`Coaching feedback generation failed after ${maxAttempts} attempts across ${apiKeys.length} API keys:`, lastError);
  const deterministicFiller = computeFillerScore(fillerFrequency);
  return {
    clarityScore: 0,
    strengths: ['Unable to generate detailed feedback at this time.'],
    weaknesses: ['Please try again for a full analysis.'],
    actionableSteps: [
      'Practice speaking at a steady pace.',
      'Reduce filler words by pausing instead.',
      'Record yourself and review for improvement.',
    ],
    evaluationScores: {
      technicalAccuracy: 0,
      behaviouralConfidence: 0,
      communicationClarity: 0,
      fillerWordFrequency: deterministicFiller,
    },
    claritySubMetrics: {
      structureScore: 0,
      coherenceScore: 0,
      conciseness: 0,
      vocabularyAppropriateness: 0,
    },
    evaluationMethods: {
      semanticSimilarity: { score: 0, explanation: 'Evaluation unavailable.', idealAnswerSummary: '' },
      keywordRecall: { score: 0, expectedKeywords: [], matchedKeywords: [], missingKeywords: [] },
      contextCompleteness: { score: 0, expectedAspects: [], coveredAspects: [], missingAspects: [], explanation: 'Evaluation unavailable.' },
      confidenceDetection: { score: 0, assertivePatterns: [], hedgingPatterns: [], passivePatterns: [], explanation: 'Evaluation unavailable.' },
      sentimentPolarity: { score: 0, polarity: 'neutral', positiveIndicators: [], negativeIndicators: [], explanation: 'Evaluation unavailable.' },
    },
    overallScore: 0,
    overallVerdict: 'Unable to evaluate — please try again.',
    isFallback: true,
  };
}
