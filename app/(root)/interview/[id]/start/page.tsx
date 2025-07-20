import { getInterview } from "@/lib/actions/interview.action";
import { notFound } from "next/navigation";
import InterviewInterface from "@/components/InterviewInterface";

interface Props {
  params: {
    id: string;
  };
}

const InterviewStartPage = async ({ params }: Props) => {
  const result = await getInterview(params.id);
  
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
