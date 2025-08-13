"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { finalizeInterview } from "@/lib/actions/interview.action";
import { createFeedback } from "@/lib/actions/feedback.action";
import { toast } from "sonner";
import Image from "next/image";
import { speechSynthesizer } from "@/lib/speechSynthesis";
import { realTimeAnalysisService } from "@/lib/realTimeAnalysis";
import { VoiceRecorder } from "@/lib/voiceRecorder";

interface Props {
  interview: Interview;
  userId: string;
}

const InterviewInterface = ({ interview, userId }: Props) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [responses, setResponses] = useState<{ question: string; answer: string }[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceRecorder, setVoiceRecorder] = useState<VoiceRecorder | null>(null);

  const currentQuestion = interview.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === interview.questions.length - 1;

  // Initialize speech synthesizer and voice recorder
  useEffect(() => {
    // Initialize voice recorder
    const recorder = new VoiceRecorder(
      (transcript: string) => {
        setCurrentResponse(transcript);
      },
      (recording: boolean) => {
        setIsRecording(recording);
      }
    );
    setVoiceRecorder(recorder);

    return () => {
      if (speechSynthesizer) {
        speechSynthesizer.stop();
      }
      if (recorder) {
        recorder.stop();
      }
    };
  }, []);

  // Auto-speak question when it changes
  useEffect(() => {
    if (interviewStarted && currentQuestion) {
      setIsSpeaking(true);
      speechSynthesizer.speak(currentQuestion, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false)
      });
    }
  }, [currentQuestionIndex, interviewStarted, currentQuestion]);

  const handleStartInterview = () => {
    setInterviewStarted(true);
  };

  const toggleRecording = () => {
    if (voiceRecorder) {
      voiceRecorder.toggle();
    }
  };

  const handleNextQuestion = async () => {
    if (!currentResponse.trim()) {
      toast.error("Please provide an answer before proceeding");
      return;
    }

    speechSynthesizer.stop(); // Stop any ongoing speech
    
    // Save the current response
    const newResponse = {
      question: currentQuestion,
      answer: currentResponse.trim()
    };

    // Add to responses
    setResponses(prev => [...prev, newResponse]);

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
      // Generate final analysis using all responses
      const finalAnalysis = await realTimeAnalysisService.generateFinalAnalysis(
        responses.map(r => ({
          question: r.question,
          answer: r.answer,
          score: 7, // Default score since we don't have real-time scoring
          feedback: "Answer provided" // Default feedback
        })),
        interview.role,
        interview.techstack || [],
        interview.level
      );

      // Create transcript format for saving
      const transcript: { role: string; content: string }[] = [];
      responses.forEach((response) => {
        transcript.push({ role: 'assistant', content: response.question });
        transcript.push({ role: 'user', content: response.answer });
      });

      // Add final analysis to transcript
      transcript.push({ 
        role: 'assistant', 
        content: `FINAL ANALYSIS: Overall Score: ${finalAnalysis.overallScore}/100, Performance: ${finalAnalysis.performanceLevel}, Hiring Recommendation: ${finalAnalysis.hiringRecommendation}` 
      });
      transcript.push({ 
        role: 'assistant', 
        content: `Final Feedback: ${finalAnalysis.finalFeedback}` 
      });

      // Finalize the interview
      await finalizeInterview(interview.id);
      
      // Generate and save comprehensive feedback with final analysis data
      const feedbackResult = await createFeedback({
        interviewId: interview.id,
        userId: userId,
        transcript,
        finalAnalysis // Pass the complete final analysis
      });

      if (!feedbackResult.success) {
        throw new Error('Failed to generate feedback');
      }
      
      // Speak completion message with more details
      speechSynthesizer.speak(
        `Interview completed! Your overall score is ${finalAnalysis.overallScore} out of 100. Performance level: ${finalAnalysis.performanceLevel}. Hiring recommendation: ${finalAnalysis.hiringRecommendation}. You can view your comprehensive detailed feedback now.`,
        {
          onEnd: () => {
            toast.success(`Interview completed! Score: ${finalAnalysis.overallScore}/100 - ${finalAnalysis.performanceLevel}`);
            router.push(`/interview/${interview.id}/feedback`);
          }
        }
      );
      
    } catch (error) {
      console.error('Interview completion error:', error);
      toast.error("Failed to complete interview");
      
      // Fallback - still redirect to feedback
      setTimeout(() => {
        router.push(`/interview/${interview.id}/feedback`);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
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
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b-2 border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {interview.role} Interview
              </h1>
              <p className="text-gray-600 text-base font-medium">
                Question {currentQuestionIndex + 1} of {interview.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700 mb-2">Progress</div>
              <div className="w-32 bg-gray-200 rounded-full h-3 border border-gray-300">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
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
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-4">
                <p className="text-gray-900 text-lg leading-relaxed font-medium">
                  {currentQuestion}
                </p>
              </div>
            </div>
          </div>

          {/* Text Mode Interface */}
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-800 font-medium">Voice Mode Active</p>
                </div>
                <p className="text-blue-700 text-sm">
                  The AI will speak each question automatically. Click &quot;Start Recording&quot; below to capture your voice answer. Your speech will be converted to text automatically.
                </p>
              </div>
              
              <div className="flex items-start gap-6">
                <Image 
                  src="/user-avatar.png" 
                  alt="You" 
                  width={60} 
                  height={60} 
                  className="rounded-full flex-shrink-0"
                />
                <div className="flex-1 space-y-3">
                  <textarea
                    value={currentResponse}
                    onChange={(e) => setCurrentResponse(e.target.value)}
                    placeholder={isRecording ? "Listening... Speak your answer now" : "Type your answer here or use voice recording"}
                    className={`w-full h-32 p-4 border-2 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base transition-all ${
                      isRecording ? "border-red-500 bg-red-50 shadow-lg" : "border-gray-300 bg-white"
                    }`}
                    disabled={isRecording}
                  />
                  
                  {/* Voice Recording Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={toggleRecording}
                      disabled={isSpeaking}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        isRecording 
                          ? "bg-red-500 hover:bg-red-600 text-white border-2 border-red-500 animate-pulse shadow-lg" 
                          : "bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-500"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isRecording ? (
                          <>
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                            </svg>
                            Start Voice Recording
                          </>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Text Mode Controls */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  {/* Speech indicator */}
                  {isSpeaking && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      AI is speaking...
                    </div>
                  )}
                  
                  {currentResponse && (
                    <Button
                      onClick={() => setCurrentResponse("")}
                      className="px-4 py-2 bg-gray-500 text-white border-2 border-gray-500 hover:bg-gray-600 hover:border-gray-600 font-medium"
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <div className="flex gap-3">
                  {currentQuestionIndex > 0 && (
                    <Button
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      className="px-6 py-2 bg-black text-white border-2 border-black hover:bg-gray-900 hover:border-gray-900 font-medium"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={handleNextQuestion}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-white rounded-b-2xl shadow-lg p-4 text-center border-t-2 border-gray-100">
          <p className="text-sm text-gray-600 font-medium">
            Take your time to provide thoughtful answers. You can always revise before moving to the next question.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;
