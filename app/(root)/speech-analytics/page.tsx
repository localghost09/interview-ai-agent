import { requireAuth } from '@/lib/auth';
import SpeechAnalyzer from '@/components/speech/SpeechAnalyzer';

export const metadata = {
  title: 'Speech Coach | AI MockPrep',
  description: 'AI-powered speech analysis — get feedback on confidence, clarity, filler words, and pacing.',
};

export default async function SpeechAnalyticsPage() {
  await requireAuth();
  return <SpeechAnalyzer />;
}
