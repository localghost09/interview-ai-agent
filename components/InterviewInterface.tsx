"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    const recorder = new VoiceRecorder(
      (transcript: string) => { setCurrentResponse(transcript); },
      (recording: boolean) => { setIsRecording(recording); }
    );
    setVoiceRecorder(recorder);
    return () => {
      if (speechSynthesizer) speechSynthesizer.stop();
      if (recorder) recorder.stop();
    };
  }, []);

  useEffect(() => {
    if (interviewStarted && currentQuestion) {
      setIsSpeaking(true);
      speechSynthesizer.speak(currentQuestion, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false)
      });
    }
  }, [currentQuestionIndex, interviewStarted, currentQuestion]);

  const handleStartInterview = () => { setInterviewStarted(true); };
  const toggleRecording = () => { if (voiceRecorder) voiceRecorder.toggle(); };

  const handleNextQuestion = async () => {
    if (!currentResponse.trim()) {
      toast.error("Please provide an answer before proceeding");
      return;
    }
    speechSynthesizer.stop();
    setResponses(prev => [...prev, { question: currentQuestion, answer: currentResponse.trim() }]);
    setCurrentResponse("");
    if (isLastQuestion) handleCompleteInterview();
    else setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleCompleteInterview = async () => {
    setIsLoading(true);
    try {
      const finalAnalysis = await realTimeAnalysisService.generateFinalAnalysis(
        responses.map(r => ({ question: r.question, answer: r.answer, score: 7, feedback: "Answer provided" })),
        interview.role, interview.techstack || [], interview.level
      );
      const transcript: { role: string; content: string }[] = [];
      responses.forEach((r) => {
        transcript.push({ role: 'assistant', content: r.question });
        transcript.push({ role: 'user', content: r.answer });
      });
      transcript.push({ role: 'assistant', content: `FINAL ANALYSIS: Overall Score: ${finalAnalysis.overallScore}/100, Performance: ${finalAnalysis.performanceLevel}, Hiring Recommendation: ${finalAnalysis.hiringRecommendation}` });
      transcript.push({ role: 'assistant', content: `Final Feedback: ${finalAnalysis.finalFeedback}` });
      await finalizeInterview(interview.id);
      const feedbackResult = await createFeedback({ interviewId: interview.id, userId, transcript, finalAnalysis });
      if (!feedbackResult.success) throw new Error('Failed to generate feedback');
      speechSynthesizer.speak(
        `Interview completed! Your overall score is ${finalAnalysis.overallScore} out of 100. Performance level: ${finalAnalysis.performanceLevel}. Hiring recommendation: ${finalAnalysis.hiringRecommendation}. You can view your comprehensive detailed feedback now.`,
        { onEnd: () => { toast.success(`Interview completed! Score: ${finalAnalysis.overallScore}/100 - ${finalAnalysis.performanceLevel}`); router.push(`/interview/${interview.id}/feedback`); } }
      );
    } catch (error) {
      console.error('Interview completion error:', error);
      toast.error("Failed to complete interview");
      setTimeout(() => { router.push(`/interview/${interview.id}/feedback`); }, 2000);
    } finally { setIsLoading(false); }
  };

  /* ── Pre-interview Screen ──────────────────────── */
  if (!interviewStarted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="interview-glass interview-glass-glow p-10 md:p-12 max-w-lg w-full text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ background: 'rgba(202, 197, 254, 0.08)', border: '1px solid rgba(202, 197, 254, 0.12)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[11px] font-medium text-primary-200/80 tracking-wide">AI Interviewer Ready</span>
          </div>

          <Image src="/ai-avatar.png" alt="AI Interviewer" width={120} height={120} className="mx-auto mb-6 rounded-full border-2 border-primary-200/20 shadow-lg shadow-primary-200/10" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Ready to <span className="interview-shimmer-text">Begin?</span>
          </h1>
          <p className="text-sm text-light-400 mb-8 max-w-xs mx-auto leading-relaxed">
            Your AI interviewer is prepared for the <span className="text-white font-medium">{interview.role}</span> interview session.
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="interview-stat-card">
              <p className="text-xl font-extrabold text-white">{interview.questions.length}</p>
              <p className="text-[10px] text-light-400 mt-0.5">Questions</p>
            </div>
            <div className="interview-stat-card">
              <p className="text-xl font-extrabold text-white">{interview.type}</p>
              <p className="text-[10px] text-light-400 mt-0.5">Type</p>
            </div>
            <div className="interview-stat-card">
              <p className="text-xl font-extrabold text-white">{interview.level}</p>
              <p className="text-[10px] text-light-400 mt-0.5">Level</p>
            </div>
          </div>

          <button onClick={handleStartInterview} className="interview-submit-btn text-base">
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  /* ── Active Interview Screen ───────────────────── */
  const progressPct = ((currentQuestionIndex + 1) / interview.questions.length) * 100;

  return (
    <div className="min-h-[80vh] p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="interview-glass rounded-b-none p-5 md:p-6">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-white">{interview.role} Interview</h1>
              <p className="text-light-400 text-sm mt-0.5">Question {currentQuestionIndex + 1} of {interview.questions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Question dots */}
              <div className="hidden md:flex items-center gap-1.5">
                {interview.questions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i < currentQuestionIndex ? '#cac5fe' : i === currentQuestionIndex ? '#a78bfa' : 'rgba(255,255,255,0.1)',
                      boxShadow: i === currentQuestionIndex ? '0 0 8px 2px rgba(167, 139, 250, 0.3)' : 'none'
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-xs text-light-400 font-medium">{Math.round(progressPct)}%</span>
                <div className="interview-progress-track">
                  <div className="interview-progress-fill" style={{ width: `${progressPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="interview-glass rounded-none border-t-0 p-6 md:p-8">
          {/* AI Question Bubble */}
          <div className="flex items-start gap-4 mb-6">
            <Image src="/ai-avatar.png" alt="AI Interviewer" width={44} height={44} className="rounded-full flex-shrink-0 border border-primary-200/20 shadow-md shadow-primary-200/5" />
            <div className="flex-1">
              <p className="text-xs text-primary-200/60 font-semibold uppercase tracking-wider mb-2">AI Interviewer</p>
              <div className="interview-ai-bubble">
                <p className="text-light-100 text-[15px] leading-relaxed">{currentQuestion}</p>
              </div>
            </div>
          </div>

          {/* Voice Mode Bar */}
          <div className="interview-instruction-card mb-5 flex items-center gap-3 p-3">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
            <div>
              <p className="text-xs text-primary-100 font-medium">Voice Mode Active</p>
              <p className="text-[11px] text-light-400">The AI speaks questions automatically. Use the button below to record your voice answer.</p>
            </div>
          </div>

          {/* Response Area */}
          <div className="flex items-start gap-4 mb-4">
            <Image src="/user-avatar.png" alt="You" width={44} height={44} className="rounded-full flex-shrink-0 border border-white/10" />
            <div className="flex-1 space-y-3">
              <p className="text-xs text-light-400 font-semibold uppercase tracking-wider">Your Answer</p>
              <textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                placeholder={isRecording ? "Listening... Speak your answer now" : "Type your answer here or use voice recording"}
                className={`interview-textarea ${isRecording ? "interview-textarea-recording" : ""}`}
                disabled={isRecording}
              />
              <div className="flex justify-center">
                <button
                  onClick={toggleRecording}
                  disabled={isSpeaking}
                  className={`interview-voice-btn ${isRecording ? "interview-voice-btn-recording" : ""}`}
                >
                  {isRecording ? (
                    <><div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>Stop Recording</>
                  ) : (
                    <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /></svg>Start Voice Recording</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-light-600/15 to-transparent my-5" />
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {isSpeaking && (
                <div className="interview-speaking-indicator">
                  <div className="w-2 h-2 bg-primary-200 rounded-full animate-pulse"></div>
                  AI is speaking...
                </div>
              )}
              {currentResponse && (
                <button onClick={() => setCurrentResponse("")} className="interview-outline-btn !py-1.5 !px-3 text-xs">Clear</button>
              )}
            </div>
            <div className="flex gap-3">
              {currentQuestionIndex > 0 && (
                <button onClick={() => setCurrentQuestionIndex(prev => prev - 1)} className="interview-outline-btn">Previous</button>
              )}
              <button onClick={handleNextQuestion} disabled={isLoading} className="interview-primary-btn">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    Completing...
                  </span>
                ) : isLastQuestion ? "Complete Interview" : "Next Question"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="interview-glass rounded-t-none border-t-0 p-4 text-center">
          <p className="text-xs text-light-400">Take your time. You can revise answers before moving to the next question.</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;
