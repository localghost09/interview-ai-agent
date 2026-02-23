import { Metadata } from 'next';
import { requireAuth } from '@/lib/auth';
import ResumeAnalyzerLoader from '@/components/resume/ResumeAnalyzerLoader';

export const metadata: Metadata = {
  title: 'Resume ATS Optimizer | AI MockPrep',
  description: 'AI-powered ATS resume optimization and analysis',
};

export default async function ResumePage() {
  await requireAuth();

  return <ResumeAnalyzerLoader />;
}
