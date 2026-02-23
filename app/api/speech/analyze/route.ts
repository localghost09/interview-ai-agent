import { NextRequest, NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai';
import { generateCoachingFeedback } from '@/lib/speech/coachingFeedback';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const FILLER_WORDS = [
  'um', 'uh', 'like', 'basically', 'actually',
  'you know', 'sort of', 'kind of', 'i mean',
];

/**
 * POST /api/speech/analyze
 * Accepts an audio file via multipart/form-data, transcribes it with word-level
 * timestamps, computes speech metrics, and returns AI coaching feedback.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse form data
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    const confidenceScore = Number(formData.get('confidenceScore') ?? 0);

    // 2. Validate file
    if (!audioFile || !(audioFile instanceof File)) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      );
    }

    if (!audioFile.type.startsWith('audio/') && audioFile.type !== 'application/octet-stream') {
      return NextResponse.json(
        { error: 'File must be an audio format' },
        { status: 400 }
      );
    }

    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)} MB limit` },
        { status: 400 }
      );
    }

    // 3. Initialize AssemblyAI
    const assemblyApiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!assemblyApiKey) {
      return NextResponse.json(
        { error: 'AssemblyAI API key not configured. Set ASSEMBLYAI_API_KEY in environment variables.' },
        { status: 500 }
      );
    }

    const client = new AssemblyAI({ apiKey: assemblyApiKey });

    // 4. Upload and transcribe with word-level timestamps
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const transcript = await client.transcripts.transcribe({
      audio: audioBuffer,
      speech_models: ['universal-3-pro', 'universal-2'],
    });

    if (transcript.status === 'error') {
      return NextResponse.json(
        { error: transcript.error || 'Transcription failed' },
        { status: 500 }
      );
    }

    const transcriptText = transcript.text || '';
    const words = transcript.words || [];
    const durationSeconds = (transcript.audio_duration ?? 0);

    // 5. Compute WPM
    const totalWords = words.length;
    const wpm = durationSeconds > 0
      ? Math.round((totalWords / durationSeconds) * 60)
      : 0;

    // 6. Detect filler words
    const fillers: SpeechFiller[] = [];
    for (const word of words) {
      const lower = word.text.toLowerCase().replace(/[.,!?]/g, '');
      if (FILLER_WORDS.includes(lower)) {
        fillers.push({
          word: word.text,
          timestamp: (word.start ?? 0) / 1000, // ms to seconds
        });
      }
    }

    // Check for multi-word fillers ("you know", "sort of", etc.)
    for (let i = 0; i < words.length - 1; i++) {
      const twoWords = `${words[i].text} ${words[i + 1].text}`.toLowerCase().replace(/[.,!?]/g, '');
      if (FILLER_WORDS.includes(twoWords)) {
        fillers.push({
          word: `${words[i].text} ${words[i + 1].text}`,
          timestamp: (words[i].start ?? 0) / 1000,
        });
      }
    }

    // 7. Detect hesitation pauses (gaps > 1.5s between consecutive words)
    const hesitations: SpeechHesitation[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      const endCurrent = (words[i].end ?? 0) / 1000;
      const startNext = (words[i + 1].start ?? 0) / 1000;
      const gap = startNext - endCurrent;

      if (gap > 1.5) {
        hesitations.push({
          startSec: Number(endCurrent.toFixed(2)),
          endSec: Number(startNext.toFixed(2)),
        });
      }
    }

    // 8. Build metrics object
    const metrics: SpeechMetrics = {
      transcript: transcriptText,
      durationSeconds,
      wpm,
      fillerCount: fillers.length,
      fillers,
      hesitationCount: hesitations.length,
      hesitations,
    };

    // 9. Generate AI coaching feedback
    const coaching = await generateCoachingFeedback(transcriptText, metrics);

    // 10. Return merged response
    const response: SpeechAnalysisResponse = {
      ...metrics,
      ...coaching,
      confidenceScore: Math.max(0, Math.min(100, Math.round(confidenceScore))),
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Speech analysis error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
