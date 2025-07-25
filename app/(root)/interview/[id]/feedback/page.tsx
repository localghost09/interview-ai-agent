import { getFeedbackByInterview } from "@/lib/actions/feedback.action";
import { getInterview } from "@/lib/actions/interview.action";
import { notFound } from "next/navigation";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import { requireAuth } from "@/lib/auth";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const FeedbackPage = async ({ params }: Props) => {
  await requireAuth(); // Ensure user is authenticated
  const resolvedParams = await params;
  const [interviewResult, feedbackResult] = await Promise.all([
    getInterview(resolvedParams.id),
    getFeedbackByInterview(resolvedParams.id)
  ]);
  
  if (!interviewResult.success || !interviewResult.interview) {
    notFound();
  }

  // If no feedback exists yet, we'll show a placeholder or redirect to generate feedback
  if (!feedbackResult.success) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Thanks for completing the interview!</h2>
        <p className="text-gray-600 mb-6">
          Feedback for this interview has not been generated yet.
        </p>
        {/* Here you could add a button to generate feedback */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FeedbackDisplay 
        interview={interviewResult.interview} 
        feedback={feedbackResult.feedback!} 
      />
    </div>
  );
};

export default FeedbackPage;
