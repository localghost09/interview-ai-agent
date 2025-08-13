import { Metadata } from "next";
import Link from "next/link";
import { Target, Zap, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | AI MockPrep",
  description: "Learn about AI MockPrep - the advanced AI-powered interview preparation platform",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About AI MockPrep
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Revolutionizing interview preparation with advanced AI technology and personalized feedback.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-800/50 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          At AI MockPrep, we believe that everyone deserves the opportunity to excel in their career journey. 
          Our mission is to democratize interview preparation by providing cutting-edge AI technology that 
          offers personalized, comprehensive, and accessible interview training for professionals at all levels.
        </p>
      </div>

      {/* What We Offer */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-8">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">AI-Powered Interviews</h3>
            </div>
            <p className="text-gray-300">
              Experience realistic interview scenarios powered by advanced AI that adapts to your responses 
              and provides intelligent follow-up questions based on your role and expertise level.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Comprehensive Analysis</h3>
            </div>
            <p className="text-gray-300">
              Get detailed feedback on your performance with insights into communication skills, 
              technical knowledge, problem-solving abilities, and areas for improvement.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Personalized Experience</h3>
            </div>
            <p className="text-gray-300">
              Customize your interview preparation based on specific roles, experience levels, 
              and technology stacks to ensure relevant and targeted practice sessions.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Voice & Text Support</h3>
            </div>
            <p className="text-gray-300">
              Practice with both voice and text inputs, featuring automatic transcription 
              and real-time analysis to improve your verbal communication skills.
            </p>
          </div>
        </div>
      </div>

      {/* Technology */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Our Technology</h2>
        <div className="text-gray-300 space-y-4">
          <p>
            AI MockPrep is built on a robust technology stack that ensures reliability, 
            scalability, and cutting-edge performance:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Next.js 15:</strong> Modern React framework for optimal performance</li>
            <li><strong>Google Gemini AI:</strong> Advanced language model for intelligent analysis</li>
            <li><strong>Firebase:</strong> Secure authentication and real-time database</li>
            <li><strong>TypeScript:</strong> Type-safe development for reliability</li>
            <li><strong>Voice Integration:</strong> Advanced speech recognition and synthesis</li>
          </ul>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-800/50 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Our Team</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Our team consists of experienced software engineers, AI researchers, and career development 
          experts who are passionate about creating tools that empower professionals to achieve their 
          career goals. We combine technical expertise with deep understanding of the interview process 
          to deliver a platform that truly makes a difference.
        </p>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Interview Skills?</h2>
        <p className="text-blue-100 mb-6">
          Join thousands of professionals who have improved their interview performance with AI MockPrep.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/sign-up"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
