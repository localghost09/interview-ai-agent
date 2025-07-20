import InterviewForm from "@/components/InterviewForm";
import { requireAuth } from "@/lib/auth";

const InterviewPage = async () => {
  await requireAuth(); // Ensure user is authenticated
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Create New Interview</h1>
        <p className="text-lg text-gray-600">
          Set up your AI-powered interview practice session
        </p>
      </div>
      
      <InterviewForm />
    </div>
  );
};

export default InterviewPage;
