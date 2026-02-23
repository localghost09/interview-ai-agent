import { getInterview } from "@/lib/actions/interview.action";
import { notFound } from "next/navigation";
import InterviewInterface from "@/components/InterviewInterface";
import { requireAuth, getCurrentUser } from "@/lib/auth";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const InterviewStartPage = async ({ params }: Props) => {
  await requireAuth();
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const resolvedParams = await params;
  const result = await getInterview(resolvedParams.id);

  if (!result.success || !result.interview) {
    notFound();
  }

  return (
    <div>
      <InterviewInterface interview={result.interview} userId={user.uid} />
    </div>
  );
};

export default InterviewStartPage;
