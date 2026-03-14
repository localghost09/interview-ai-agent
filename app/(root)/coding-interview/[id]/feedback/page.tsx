import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { getInterview } from '@/lib/actions/interview.action';
import CodingFeedbackDashboard from '@/components/coding/CodingFeedbackDashboard';
import type { CodingQuestion } from '@/lib/codingInterview';

export const dynamic = 'force-dynamic';

export default async function CodingFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();

  const { id } = await params;
  const response = await getInterview(id);

  if (!response.success || !response.interview) {
    notFound();
  }

  const interview = response.interview as Interview & {
    codingQuestions?: CodingQuestion[];
  };

  if (interview.type !== 'Coding') {
    notFound();
  }

  const questions = Array.isArray(interview.codingQuestions) ? interview.codingQuestions : [];

  return (
    <CodingFeedbackDashboard
      interviewId={interview.id}
      role={interview.role}
      level={interview.level}
      questions={questions}
    />
  );
}
