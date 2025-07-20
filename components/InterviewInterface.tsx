"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { finalizeInterview } from "@/lib/actions/interview.action";
import { toast } from "sonner";
import Image from "next/image";

interface Props {
  interview: Interview;
}

const InterviewInterface = ({ interview }: Props) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const currentQuestion = interview.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === interview.questions.length - 1;

  const handleStartInterview = () => {
    setInterviewStarted(true);
  };

  const handleNextQuestion = () => {
    if (!currentResponse.trim()) {
      toast.error("Please provide an answer before proceeding");
      return;
    }

    // Clear current response and move to next question
    setCurrentResponse("");

    if (isLastQuestion) {
      handleCompleteInterview();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleCompleteInterview = async () => {
    setIsLoading(true);
    try {
      // Here you would typically:
      // 1. Save responses to database
      // 2. Generate AI feedback
      // 3. Create feedback document
      
      await finalizeInterview(interview.id);
      
      toast.success("Interview completed successfully!");
      router.push(`/interview/${interview.id}/feedback`);
    } catch {
      toast.error("Failed to complete interview");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording logic
    toast.info(isRecording ? "Recording stopped" : "Recording started");
  };

  if (!interviewStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <Image 
              src="/ai-avatar.png" 
              alt="AI Interviewer" 
              width={100} 
              height={100} 
              className="mx-auto mb-4 rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Start?
            </h1>
            <p className="text-gray-600">
              Your AI interviewer is ready to begin the {interview.role} interview.
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Questions:</strong> {interview.questions.length}<br />
              <strong>Type:</strong> {interview.type}<br />
              <strong>Level:</strong> {interview.level}
            </p>
          </div>

          <Button 
            onClick={handleStartInterview}
            className="w-full btn-primary"
          >
            Start Interview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {interview.role} Interview
              </h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {interview.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / interview.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Content */}
        <div className="bg-white shadow-lg p-8">
          <div className="flex items-start gap-6 mb-8">
            <Image 
              src="/ai-avatar.png" 
              alt="AI Interviewer" 
              width={60} 
              height={60} 
              className="rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl p-4 mb-4">
                <p className="text-gray-900 leading-relaxed">
                  {currentQuestion}
                </p>
              </div>
            </div>
          </div>

          {/* Response Input */}
          <div className="space-y-4">
            <div className="flex items-start gap-6">
              <Image 
                src="/user-avatar.png" 
                alt="You" 
                width={60} 
                height={60} 
                className="rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  placeholder="Type your answer here or use voice recording..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  className="flex items-center gap-2"
                >
                  {isRecording ? (
                    <>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Start Recording
                    </>
                  )}
                </Button>
              </div>

              <div className="flex gap-3">
                {currentQuestionIndex > 0 && (
                  <Button
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    variant="outline"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNextQuestion}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  {isLoading 
                    ? "Completing..." 
                    : isLastQuestion 
                      ? "Complete Interview" 
                      : "Next Question"
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4 text-center text-sm text-gray-500">
          Take your time to provide thoughtful answers. You can always revise before moving to the next question.
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;
