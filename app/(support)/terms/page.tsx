import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle, Scale, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | AI MockPrep",
  description: "Terms of service and user agreement for AI MockPrep platform",
};

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-400 text-sm">
          Last updated: August 13, 2025
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mt-4">
          Please read these terms carefully before using AI MockPrep services.
        </p>
      </div>

      {/* Agreement */}
      <div className="bg-blue-600/20 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Agreement to Terms</h2>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          By accessing and using AI MockPrep, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
          If you do not agree with any part of these terms, you may not use our service.
        </p>
      </div>

      {/* Service Description */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Service Description</h2>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <p className="text-gray-300 mb-4">
            AI MockPrep is an artificial intelligence-powered interview preparation platform that provides:
          </p>
          <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
            <li>Personalized mock interview sessions</li>
            <li>AI-generated questions based on role and technology stack</li>
            <li>Comprehensive performance analysis and feedback</li>
            <li>Voice and text input capabilities</li>
            <li>Progress tracking and interview history</li>
            <li>Career development resources and insights</li>
          </ul>
        </div>
      </div>

      {/* User Accounts */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">User Accounts and Responsibilities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Account Creation</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>One account per person; no sharing accounts</li>
              <li>You must be at least 16 years old to use the service</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Account Usage</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Use the service only for lawful purposes</li>
              <li>Do not attempt to reverse engineer or hack the platform</li>
              <li>Respect other users and provide authentic responses</li>
              <li>Report any security vulnerabilities to our team</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acceptable Use */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h2 className="text-3xl font-bold text-white">Acceptable Use Policy</h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-green-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Permitted Uses</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Personal interview preparation and skill development</li>
              <li>Professional career advancement activities</li>
              <li>Educational purposes and learning</li>
              <li>Legitimate job search and interview practice</li>
            </ul>
          </div>

          <div className="bg-red-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Prohibited Activities</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Submitting harmful, offensive, or inappropriate content</li>
              <li>Attempting to overwhelm or disrupt our systems</li>
              <li>Using the service to train competing AI models</li>
              <li>Sharing access credentials or circumventing usage limits</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating others or providing false information</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Intellectual Property Rights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Our Content</h3>
            <p className="text-gray-300 text-sm mb-3">
              All platform content, including but not limited to:
            </p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
              <li>Software code and algorithms</li>
              <li>AI models and training data</li>
              <li>User interface and design</li>
              <li>Generated questions and analysis</li>
              <li>Documentation and guides</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              Are owned by AI MockPrep and protected by intellectual property laws.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Your Content</h3>
            <p className="text-gray-300 text-sm mb-3">
              You retain ownership of your responses and data, but grant us:
            </p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside text-sm">
              <li>License to process and analyze your responses</li>
              <li>Right to use anonymized data for improvements</li>
              <li>Permission to provide feedback and recommendations</li>
              <li>Ability to store data for service delivery</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              You can request data deletion at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Service Availability */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Service Availability & Limitations</h2>
        </div>
        
        <div className="bg-yellow-600/20 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Service Availability</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
                <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                <li>Scheduled maintenance may temporarily limit access</li>
                <li>We reserve the right to modify or discontinue features</li>
                <li>Service levels may vary based on usage and demand</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">AI Limitations</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
                <li>AI feedback is for guidance only, not guaranteed accuracy</li>
                <li>Results may vary based on input quality and clarity</li>
                <li>AI may occasionally provide inconsistent responses</li>
                <li>Real interview outcomes may differ from practice results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Privacy & Data Protection</h2>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <p className="text-gray-300 mb-4">
            Your privacy is important to us. Our data practices are governed by our 
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 ml-1">
              Privacy Policy
            </Link>, which includes:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Secure data encryption and storage</li>
              <li>Limited data sharing with trusted partners only</li>
              <li>Your right to access, modify, or delete data</li>
              <li>Compliance with applicable privacy laws</li>
            </ul>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Transparent data collection practices</li>
              <li>User control over privacy settings</li>
              <li>Regular security audits and updates</li>
              <li>Prompt breach notification procedures</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Disclaimers & Limitation of Liability</h2>
        </div>
        
        <div className="bg-purple-600/20 rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Service Disclaimer</h3>
              <p className="text-gray-300 text-sm">
                AI MockPrep is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the service will meet your specific needs or that AI feedback will accurately predict interview performance. Use of our platform does not guarantee job placement or interview success.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Limitation of Liability</h3>
              <p className="text-gray-300 text-sm">
                To the fullest extent permitted by law, AI MockPrep shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Termination */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Account Termination</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">By You</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>You may delete your account at any time</li>
              <li>Contact support for complete data removal</li>
              <li>Some data may be retained for legal/operational needs</li>
              <li>Termination does not affect completed transactions</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">By Us</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>We may suspend accounts for terms violations</li>
              <li>Advance notice will be provided when possible</li>
              <li>Repeated violations may result in permanent bans</li>
              <li>We reserve the right to refuse service</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Changes & Contact */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
        <p className="text-blue-100 mb-6">
          If you have any questions about these Terms of Service, please don&apos;t hesitate to contact us.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Legal Team
          </Link>
          <a
            href="mailto:legal@aimockprep.com"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            legal@aimockprep.com
          </a>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          We may update these terms from time to time. Continued use of the service constitutes acceptance of any changes.
        </p>
      </div>
    </>
  );
}
