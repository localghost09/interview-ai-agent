"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { vapiService } from "@/lib/vapi";
import { toast } from "sonner";

interface VapiInterviewProps {
  interview: Interview;
  currentQuestionIndex: number;
  onQuestionComplete: (answer: string, feedback?: string) => void;
  onNextQuestion: () => void;
  isActive: boolean;
}

const VapiInterview = ({
  interview,
  currentQuestionIndex,
  onQuestionComplete,
  onNextQuestion,
  isActive,
}: VapiInterviewProps) => {
  const [isVapiActive, setIsVapiActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentPhase, setCurrentPhase] = useState<"waiting" | "asking" | "listening" | "analyzing" | "feedback">("waiting");
  const [interviewResults, setInterviewResults] = useState<{
    answers: Array<{question: string; answer: string; score: number; feedback: string}>;
    totalScore: number;
    maxScore: number;
    completedQuestions: number;
    totalQuestions: number;
  } | null>(null);

  const startVapiInterview = useCallback(async () => {
    setIsLoading(true);
    try {
      const success = await vapiService.startInterviewSession({
        role: interview.role,
        level: interview.level,
        type: interview.type,
        questions: interview.questions,
        currentQuestionIndex,
      });

      if (success) {
        setIsVapiActive(true);
        setTranscript("");
        setCurrentAnswer("");
        setCurrentPhase("asking");
        
        // Ask the current question immediately after starting
        setTimeout(() => {
          vapiService.askCurrentQuestion();
        }, 2000);
        
        toast.success("Structured voice interview started! The AI will ask questions and analyze your answers.");
      } else {
        toast.error("Failed to start voice interview. Please try again.");
      }
    } catch (error) {
      console.error("VAPI start error:", error);
      toast.error("Voice interview unavailable. Please use text mode.");
    } finally {
      setIsLoading(false);
    }
  }, [interview.role, interview.level, interview.type, interview.questions, currentQuestionIndex]);

  useEffect(() => {
    // Start VAPI and ask first question when component becomes active
    if (isActive && !isVapiActive) {
      startVapiInterview();
    }
    
    // Setup VAPI message listeners for structured workflow
    vapiService.onMessage((message: unknown) => {
      const messageObj = message as { 
        type?: string; 
        role?: string; 
        transcriptType?: string; 
        transcript?: string; 
      };
      
      if (messageObj.type === "transcript") {
        if (messageObj.role === "user" && messageObj.transcriptType === "final") {
          setCurrentAnswer(messageObj.transcript || "");
          setTranscript(prev => prev + "\n👤 You: " + (messageObj.transcript || ""));
          setCurrentPhase("analyzing");
        } else if (messageObj.role === "assistant" && messageObj.transcriptType === "final") {
          setTranscript(prev => prev + "\n🤖 AI: " + (messageObj.transcript || ""));
          
          // Detect phase based on AI message content
          const content = messageObj.transcript || "";
          if (content.includes("Question") && content.includes("of")) {
            setCurrentPhase("asking");
          } else if (content.includes("Thank you for your answer")) {
            setCurrentPhase("feedback");
          } else if (content.includes("Congratulations")) {
            setCurrentPhase("waiting");
            setInterviewResults(vapiService.getInterviewResults());
          }
        }
      }
    });

    // Setup function call listeners
    vapiService.onFunctionCall((functionCall: unknown) => {
      console.log("Function called:", functionCall);
      
      const funcCallObj = functionCall as {
        functionCall?: {
          name?: string;
          parameters?: {
            completed?: boolean;
            summary?: string;
            feedback?: string;
            score?: number;
          };
        };
      };
      
      if (funcCallObj.functionCall?.name === "moveToNextQuestion") {
        const { completed, summary } = funcCallObj.functionCall.parameters || {};
        if (completed) {
          onQuestionComplete(currentAnswer, summary);
          setCurrentAnswer("");
          setTimeout(() => {
            onNextQuestion();
          }, 1000);
        }
        
        // Send result back to VAPI
        vapiService.sendFunctionResult({
          success: true,
          message: "Moving to next question",
        });
      }
      
      if (funcCallObj.functionCall?.name === "provideFeedback") {
        const { feedback, score } = funcCallObj.functionCall.parameters || {};
        toast.info(`AI Feedback: ${feedback} (Score: ${score}/10)`);
        
        // Send result back to VAPI
        vapiService.sendFunctionResult({
          success: true,
          message: "Feedback provided",
        });
      }
    });

    return () => {
      // Cleanup listeners
      if (isVapiActive) {
        vapiService.stopSession();
      }
    };
  }, [currentAnswer, onQuestionComplete, onNextQuestion, isVapiActive, isActive, startVapiInterview]);

  // Update question when currentQuestionIndex changes
  useEffect(() => {
    if (isVapiActive && currentQuestionIndex < interview.questions.length) {
      const newQuestion = interview.questions[currentQuestionIndex];
      vapiService.updateQuestion(newQuestion, currentQuestionIndex, interview.questions.length);
    }
  }, [currentQuestionIndex, interview.questions, isVapiActive]);

  const stopVapiInterview = async () => {
    setIsLoading(true);
    try {
      await vapiService.stopSession();
      setIsVapiActive(false);
      setCurrentPhase("waiting");
      
      // Get final results
      const results = vapiService.getInterviewResults();
      setInterviewResults(results);
      
      toast.info(`Voice interview completed! Total score: ${results.totalScore}/${results.maxScore}`);
    } catch (error) {
      console.error("VAPI stop error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* VAPI Controls */}
      <div className="flex gap-3 items-center justify-center">
        {!isVapiActive ? (
          <Button
            onClick={startVapiInterview}
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 hover:border-green-700 font-medium disabled:opacity-50"
          >
            {isLoading ? "Starting..." : "🎤 Start Voice Interview"}
          </Button>
        ) : (
          <Button
            onClick={stopVapiInterview}
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 font-medium disabled:opacity-50"
          >
            {isLoading ? "Stopping..." : "⏹️ Stop Voice Interview"}
          </Button>
        )}
      </div>

      {/* Voice Status with Phase Indicator */}
      {isVapiActive && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Voice Interview Active</span>
          </div>
          
          {/* Phase Indicator */}
          <div className="flex justify-center mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Phase:</span>
                <span className={`font-medium px-2 py-1 rounded text-xs ${
                  currentPhase === "asking" ? "bg-blue-100 text-blue-800" :
                  currentPhase === "listening" ? "bg-yellow-100 text-yellow-800" :
                  currentPhase === "analyzing" ? "bg-purple-100 text-purple-800" :
                  currentPhase === "feedback" ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {currentPhase === "asking" && "🎤 AI Asking Question"}
                  {currentPhase === "listening" && "👂 Listening to Answer"}
                  {currentPhase === "analyzing" && "🧠 Analyzing Response"}
                  {currentPhase === "feedback" && "💬 Providing Feedback"}
                  {currentPhase === "waiting" && "⏳ Waiting"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Transcript */}
      {isVapiActive && transcript && (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Live Conversation:</h4>
          <div className="max-h-32 overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap">
            {transcript}
          </div>
        </div>
      )}

      {/* Current Answer Preview */}
      {currentAnswer && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Your Response:</h4>
          <p className="text-blue-800 text-sm">{currentAnswer}</p>
        </div>
      )}

      {/* Interview Results */}
      {interviewResults && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">Interview Results:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Total Score:</span>
              <span className="font-medium ml-1">{interviewResults.totalScore}/{interviewResults.maxScore}</span>
            </div>
            <div>
              <span className="text-blue-700">Percentage:</span>
              <span className="font-medium ml-1">{((interviewResults.totalScore / interviewResults.maxScore) * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-blue-700">Completed:</span>
              <span className="font-medium ml-1">{interviewResults.completedQuestions}/{interviewResults.totalQuestions} questions</span>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {isVapiActive && (
        <div className="text-center text-sm text-gray-600">
          <p>🎯 Listen to the AI question, then speak your answer clearly</p>
          <p>🤖 The AI will analyze your response and provide immediate feedback</p>
          <p>⏱️ You have 60 seconds per question (unanswered questions get 0 points)</p>
        </div>
      )}
    </div>
  );
};

export default VapiInterview;
