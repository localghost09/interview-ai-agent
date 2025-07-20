import { getInterview } from "@/lib/actions/interview.action";
import { notFound } from "next/navigation";
import InterviewInterface from "@/components/InterviewInterface";
import { requireAuth } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

const InterviewStartPage = async ({ params }: Props) => {
  await requireAuth(); // Ensure user is authenticated
  const resolvedParams = await params;
  const result = await getInterview(resolvedParams.id);
  
  if (!result.success || !result.interview) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InterviewInterface interview={result.interview} />
    </div>
  );
};

export default InterviewStartPage;
