import { getInterview } from "@/lib/actions/interview.action";
import { notFound } from "next/navigation";
import InterviewQuestions from "@/components/InterviewQuestions";

interface Props {
  params: {
    id: string;
  };
}

const InterviewQuestionsPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const result = await getInterview(resolvedParams.id);
  
  if (!result.success || !result.interview) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <InterviewQuestions interview={result.interview} />
    </div>
  );
};

export default InterviewQuestionsPage;
