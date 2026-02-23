import { ReactNode } from 'react'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auth-bg">
      {/* Animated orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="auth-container">
        {/* Left branding panel - hidden on mobile */}
        <div className="auth-brand-panel">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="logo" height={32} width={38} />
              <span className="text-2xl font-bold text-primary-100">AI MockPrep</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
              Your AI-Powered
              <span className="hero-gradient-text"> Interview Coach</span>
            </h1>
            <p className="text-light-100/70 leading-relaxed">
              Practice with real questions, get instant AI feedback, and land your dream job at top tech companies.
            </p>
          </div>

          <Image
            src="/robot.png"
            alt="AI Assistant"
            width={280}
            height={280}
            className="hero-float mx-auto mt-auto opacity-90"
          />
        </div>

        {/* Right form panel */}
        <div className="auth-form-panel">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
