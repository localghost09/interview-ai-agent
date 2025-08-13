import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | AI MockPrep",
  description: "Privacy policy and data protection information for AI MockPrep",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm">
          Last updated: August 13, 2025
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mt-4">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-600/20 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Our Commitment to Privacy</h2>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          At AI MockPrep, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
        </p>
      </div>

      {/* Information We Collect */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-green-400" />
          <h2 className="text-3xl font-bold text-white">Information We Collect</h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Email address and name when you create an account</li>
              <li>Profile information you choose to provide</li>
              <li>Communication preferences and settings</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Interview Data</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Interview responses (text and voice recordings)</li>
              <li>Performance analytics and feedback scores</li>
              <li>Interview session metadata (duration, questions, etc.)</li>
              <li>Technology preferences and role specifications</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Technical Information</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Device information and browser type</li>
              <li>IP address and general location data</li>
              <li>Usage patterns and feature interactions</li>
              <li>Error logs and performance metrics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Information */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">How We Use Your Information</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Service Delivery</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Provide personalized interview experiences</li>
              <li>Generate AI-powered feedback and analysis</li>
              <li>Maintain your interview history and progress</li>
              <li>Ensure platform functionality and security</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Improvement & Analytics</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Improve AI models and algorithms</li>
              <li>Analyze usage patterns for better UX</li>
              <li>Develop new features and capabilities</li>
              <li>Monitor and prevent platform abuse</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Communication</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Send important account notifications</li>
              <li>Provide customer support responses</li>
              <li>Share platform updates (with consent)</li>
              <li>Respond to your inquiries and feedback</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Legal Compliance</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Comply with applicable laws and regulations</li>
              <li>Protect against fraud and security threats</li>
              <li>Enforce our Terms of Service</li>
              <li>Respond to legal requests when required</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Security */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Data Security & Protection</h2>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Security Measures</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure cloud storage with Firebase</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Data backup and recovery systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Data Retention</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
                <li>Account data retained while account is active</li>
                <li>Interview data kept for analysis and improvement</li>
                <li>Automatic deletion of inactive accounts (2+ years)</li>
                <li>Right to request data deletion at any time</li>
                <li>Anonymized data may be retained for research</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Your Privacy Rights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Access & Control</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Access your personal data</li>
              <li>Update or correct information</li>
              <li>Download your data</li>
              <li>Delete your account</li>
            </ul>
          </div>
          <div className="bg-purple-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Privacy Choices</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Opt out of marketing communications</li>
              <li>Limit data processing</li>
              <li>Object to automated decision-making</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Third Party Services */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Third-Party Services</h2>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <p className="text-gray-300 mb-4">
            We use trusted third-party services to provide our platform functionality:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Firebase (Google)</h4>
              <p className="text-gray-400 text-sm">Authentication, database, and hosting services</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Google Gemini AI</h4>
              <p className="text-gray-400 text-sm">AI-powered interview analysis and feedback</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Vercel</h4>
              <p className="text-gray-400 text-sm">Platform hosting and deployment</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Voice Processing</h4>
              <p className="text-gray-400 text-sm">Speech recognition and synthesis services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Updates */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
        <p className="text-blue-100 mb-6">
          We&apos;re here to help. Contact us if you have any questions about this privacy policy or how we handle your data.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Privacy Team
          </Link>
          <a
            href="mailto:privacy@aimockprep.com"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            privacy@aimockprep.com
          </a>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          We may update this privacy policy from time to time. We&apos;ll notify you of any significant changes.
        </p>
      </div>
    </>
  );
}
