"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import DisplayTechIcons from "./DisplayTechIcons";

interface Props {
  interview: Interview;
  feedback: Feedback;
}

const FeedbackDisplay = ({ interview, feedback }: Props) => {
  const router = useRouter();

  const getScoreBarClass = (score: number) => {
    if (score >= 80) return "feedback-bar-excellent";
    if (score >= 70) return "feedback-bar-good";
    return "feedback-bar-needs-work";
  };

  const getPerformanceBadge = (level: string) => {
    switch (level) {
      case "Excellent": return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20";
      case "Good": return "bg-blue-500/15 text-blue-400 border border-blue-500/20";
      case "Average": return "bg-amber-500/15 text-amber-400 border border-amber-500/20";
      case "Needs Improvement": return "bg-orange-500/15 text-orange-400 border border-orange-500/20";
      default: return "bg-red-500/15 text-red-400 border border-red-500/20";
    }
  };

  const getHiringBadge = (rec: string) => {
    switch (rec) {
      case "Strong Hire": return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20";
      case "Hire": return "bg-blue-500/15 text-blue-400 border border-blue-500/20";
      case "No Hire": return "bg-orange-500/15 text-orange-400 border border-orange-500/20";
      default: return "bg-red-500/15 text-red-400 border border-red-500/20";
    }
  };

  const getOverallPerformance = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "text-emerald-400" };
    if (score >= 70) return { text: "Good", color: "text-blue-400" };
    if (score >= 60) return { text: "Fair", color: "text-amber-400" };
    return { text: "Needs Improvement", color: "text-red-400" };
  };

  const performance = getOverallPerformance(feedback.totalScore);

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Header */}
      <div className="interview-glass p-7 md:p-9 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-[11px] font-medium text-emerald-400/90 tracking-wide">Interview Complete</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {interview.role} <span className="hero-gradient-text">Feedback</span>
            </h1>
            <p className="text-light-400 text-sm mt-1.5">
              {interview.type} &bull; {interview.level} Level
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="interview-badge">{interview.type}</span>
            <span className="text-xs text-light-400">
              {dayjs(feedback.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-light-600/20 to-transparent mb-6" />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-medium text-light-400 mb-2.5 uppercase tracking-wider">Technologies Covered</h3>
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
          <div>
            <h3 className="text-xs font-medium text-light-400 mb-2.5 uppercase tracking-wider">Questions Asked</h3>
            <p className="text-2xl font-extrabold text-white">{interview.questions.length} <span className="text-sm font-normal text-light-400">questions</span></p>
          </div>
        </div>
      </div>

      {/* Overall Score — hero card */}
      <div className="interview-glass interview-glass-glow p-8 md:p-10 text-center mb-6">
        <p className="text-xs font-medium text-light-400 uppercase tracking-wider mb-4">Overall Performance</p>
        <div className="feedback-score-ring mx-auto mb-5" style={{ '--score': feedback.totalScore } as React.CSSProperties}>
          <span className="text-3xl font-extrabold text-white">{feedback.totalScore}</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-1">
          Score: <span className="interview-shimmer-text">{feedback.totalScore}/100</span>
        </h2>
        <p className={`text-base font-semibold ${performance.color}`}>
          {performance.text} Performance
        </p>
      </div>

      {/* Category Scores */}
      <div className="interview-glass p-7 md:p-9 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="interview-icon-box !w-9 !h-9">
            <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Detailed Assessment</h2>
        </div>
        <div className="space-y-4">
          {feedback.categoryScores.map((category, index) => (
            <div key={index} className="p-5 rounded-xl transition-all duration-200 hover:bg-[rgba(202,197,254,0.04)]" style={{ background: 'rgba(202, 197, 254, 0.02)', border: '1px solid rgba(202, 197, 254, 0.06)' }}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white">{category.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  category.score >= 80 ? 'bg-emerald-500/15 text-emerald-400' :
                  category.score >= 70 ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'
                }`}>
                  {category.score}/100
                </span>
              </div>
              <div className="feedback-bar-track mb-3">
                <div className={`feedback-bar-fill ${getScoreBarClass(category.score)}`} style={{ width: `${category.score}%` }}></div>
              </div>
              <p className="text-sm text-light-400 leading-relaxed">{category.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Strengths */}
        <div className="interview-glass p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Your Strengths</h2>
          </div>
          <div className="space-y-3">
            {feedback.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(16,185,129,0.04)]">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-light-100/80 leading-relaxed">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="interview-glass p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Areas for Improvement</h2>
          </div>
          <div className="space-y-3">
            {feedback.areasForImprovement.map((area, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(245,158,11,0.04)]">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-light-100/80 leading-relaxed">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Assessment */}
      <div className="interview-instruction-card p-7 md:p-9 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="interview-icon-box !w-9 !h-9">
            <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Final Assessment</h2>
        </div>
        <p className="text-sm text-light-100/80 leading-relaxed mb-6">
          {feedback.finalAssessment}
        </p>

        {feedback.performanceLevel && (
          <div className="p-5 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(202, 197, 254, 0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Performance Level</h3>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${getPerformanceBadge(feedback.performanceLevel)}`}>
                {feedback.performanceLevel}
              </span>
            </div>

            {feedback.hiringRecommendation && (
              <>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-light-600/10 to-transparent mb-4" />
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Hiring Recommendation</h3>
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${getHiringBadge(feedback.hiringRecommendation)}`}>
                    {feedback.hiringRecommendation}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Next Steps */}
      {feedback.nextSteps && feedback.nextSteps.length > 0 && (
        <div className="interview-glass p-7 md:p-9 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="interview-icon-box !w-9 !h-9">
              <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Next Steps for Development</h2>
          </div>
          <div className="space-y-4">
            {feedback.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-[rgba(202,197,254,0.03)]">
                <div className="interview-number-badge !w-8 !h-8 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-light-100/80 leading-relaxed flex-1 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interviewer Notes */}
      {feedback.interviewerNotes && (
        <div className="interview-glass p-7 md:p-9 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="interview-icon-box !w-9 !h-9">
              <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Interviewer Notes</h2>
          </div>
          <div className="p-5 rounded-xl italic" style={{ background: 'rgba(202, 197, 254, 0.03)', border: '1px solid rgba(202, 197, 254, 0.08)' }}>
            <p className="text-sm text-light-100/70 leading-relaxed">
              &ldquo;{feedback.interviewerNotes}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pb-6">
        <button onClick={() => router.push('/')} className="interview-outline-btn py-3 px-6">
          Back to Dashboard
        </button>
        <button onClick={() => router.push('/interview')} className="interview-primary-btn py-3 px-8 text-base">
          Take Another Interview
        </button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
