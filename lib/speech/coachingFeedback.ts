import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are a senior career coach specializing in interview communication skills. You will receive a candidate's spoken transcript and speech metrics. Return ONLY valid JSON matching the provided schema — no markdown, no extra keys.`;

/**
 * Generates AI coaching feedback from a speech transcript and computed metrics.
 * Uses Google Gemini to analyze communication quality and provide actionable advice.
 */
export async function generateCoachingFeedback(
  transcript: string,
  metrics: SpeechMetrics
): Promise<CoachingFeedback> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Set GEMINI_API_KEY in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Analyze the following interview speech transcript and metrics, then provide coaching feedback.

TRANSCRIPT:
${transcript.slice(0, 10000)}

SPEECH METRICS:
- Words per minute: ${metrics.wpm}
- Filler word count: ${metrics.fillerCount}
- Filler words used: ${metrics.fillers.map(f => f.word).join(', ') || 'None'}
- Hesitation pauses (>1.5s gaps): ${metrics.hesitationCount}
- Duration: ${metrics.durationSeconds.toFixed(1)} seconds

Return a JSON object with this exact schema:
{
  "clarityScore": number (0-100, how clear and articulate the speech is),
  "strengths": ["string (specific positive observations about the speech)"],
  "weaknesses": ["string (specific areas where the speech could improve)"],
  "actionableSteps": ["string (concrete step 1)", "string (concrete step 2)", "string (concrete step 3)"]
}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (!text) throw new Error('No response from AI');

      const data = JSON.parse(text) as CoachingFeedback;

      // Validate required fields
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

      // Clamp clarity score
      data.clarityScore = Math.max(0, Math.min(100, Math.round(data.clarityScore)));

      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Coaching feedback attempt ${attempt + 1} failed:`, lastError.message);
    }
  }

  // Both attempts failed — return graceful fallback
  console.error('Coaching feedback generation failed after 2 attempts:', lastError);
  return {
    clarityScore: 50,
    strengths: ['Unable to generate detailed feedback at this time.'],
    weaknesses: ['Please try again for a full analysis.'],
    actionableSteps: [
      'Practice speaking at a steady pace.',
      'Reduce filler words by pausing instead.',
      'Record yourself and review for improvement.',
    ],
  };
}
