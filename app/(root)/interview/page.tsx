import InterviewForm from "@/components/InterviewForm";
import { requireAuth } from "@/lib/auth";
import Image from "next/image";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const InterviewPage = async () => {
  await requireAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="interview-page-header mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(202, 197, 254, 0.08)', border: '1px solid rgba(202, 197, 254, 0.12)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-medium text-primary-200/80 tracking-wide">AI-Powered Session</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Create Your <span className="interview-shimmer-text">Interview</span>
        </h1>
        <p className="text-light-400 max-w-md mx-auto leading-relaxed text-[15px]">
          Configure your AI-powered mock interview and start practicing for your dream role at top tech companies.
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="interview-stat-card">
          <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(202, 197, 254, 0.12)' }}>
            <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-white">Voice & Text</p>
          <p className="text-[10px] text-light-400 mt-0.5">Dual input modes</p>
        </div>
        <div className="interview-stat-card">
          <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(202, 197, 254, 0.12)' }}>
            <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-white">AI Analysis</p>
          <p className="text-[10px] text-light-400 mt-0.5">Real-time scoring</p>
        </div>
        <div className="interview-stat-card">
          <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(202, 197, 254, 0.12)' }}>
            <svg className="w-4 h-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-white">Detailed Feedback</p>
          <p className="text-[10px] text-light-400 mt-0.5">Actionable insights</p>
        </div>
      </div>

      {/* Tips Banner */}
      <div className="interview-instruction-card flex items-start gap-4 mb-8">
        <div className="flex-shrink-0 mt-0.5">
          <Image src="/robot.png" alt="AI" width={48} height={48} className="rounded-lg opacity-80" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">AI Interview Tips</h3>
          <p className="text-xs text-light-400 leading-relaxed">
            Choose a specific role and relevant technologies for the most realistic experience. The AI adapts questions based on your experience level and tech stack.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="interview-glass interview-glass-glow p-8 md:p-10">
        <div className="flex items-center gap-3.5 mb-7">
          <div className="interview-icon-box">
            <svg className="w-5 h-5 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Interview Configuration</h2>
            <p className="text-xs text-light-400">Fill in the details below to generate your custom interview</p>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-light-600/20 to-transparent mb-7" />
        <InterviewForm />
      </div>
    </div>
  );
};

export default InterviewPage;
