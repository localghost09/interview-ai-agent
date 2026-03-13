import InterviewForm from "@/components/InterviewForm";
import { requireAuth } from "@/lib/auth";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const InterviewPage = async () => {
  await requireAuth();

  return (
    <div className="saas-interview-page">
      {/* Ambient background effects */}
      <div className="saas-bg-glow saas-bg-glow-1" />
      <div className="saas-bg-glow saas-bg-glow-2" />
      <div className="saas-bg-glow saas-bg-glow-3" />
      <div className="saas-grid-overlay" />

      <div className="saas-container">
        {/* ─── Left Hero Column ─── */}
        <div className="saas-hero">
          <div className="saas-hero-inner">
            {/* Status badge */}
            <div className="saas-status-badge">
              <span className="saas-status-dot" />
              <span>Ready to practice</span>
            </div>

            {/* Main heading */}
            <h1 className="saas-heading">
              Your{" "}
              <span className="saas-gradient-text">AI-Powered</span>
              <br />
              Mock Interview
            </h1>

            <p className="saas-subheading">
              Practice with an adaptive AI that tailors questions to your role,
              experience, and tech stack. Get instant, actionable feedback to ace
              your real interviews.
            </p>

            {/* Progress steps */}
            <div className="saas-progress">
              <div className="saas-progress-track">
                <div className="saas-progress-fill" />
              </div>
              <div className="saas-progress-steps">
                <div className="saas-progress-step active">
                  <div className="saas-step-number">1</div>
                  <div>
                    <p className="saas-step-label">Configure</p>
                    <p className="saas-step-sublabel">Role & tech stack</p>
                  </div>
                </div>
                <div className="saas-progress-step">
                  <div className="saas-step-number">2</div>
                  <div>
                    <p className="saas-step-label">Practice</p>
                    <p className="saas-step-sublabel">AI interview session</p>
                  </div>
                </div>
                <div className="saas-progress-step">
                  <div className="saas-step-number">3</div>
                  <div>
                    <p className="saas-step-label">Improve</p>
                    <p className="saas-step-sublabel">Review & feedback</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="saas-social-proof">
              <div className="saas-avatars">
                <div className="saas-avatar" style={{ background: 'linear-gradient(135deg, #7c6fff, #5b4cd4)' }}>J</div>
                <div className="saas-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>A</div>
                <div className="saas-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>M</div>
                <div className="saas-avatar" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>S</div>
              </div>
              <p className="saas-social-text">
                <span className="text-white font-semibold">2,400+</span> engineers practiced this week
              </p>
            </div>
          </div>
        </div>

        {/* ─── Right Config Column ─── */}
        <div className="saas-config-col">
          <div className="saas-config-card">
            <div className="saas-config-header">
              <div className="saas-config-icon">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="saas-config-title">Interview Configuration</h2>
                <p className="saas-config-subtitle">Customize your session in seconds</p>
              </div>
            </div>
            <InterviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
