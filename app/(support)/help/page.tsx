import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageCircle, Book, Zap, BarChart3, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | AI MockPrep",
  description: "Frequently asked questions and help documentation for AI MockPrep",
};

export default function HelpPage() {
  const faqs = [
    {
      category: "Getting Started",
      icon: Zap,
      questions: [
        {
          q: "How do I create my first interview?",
          a: "Sign up for an account, go to the Interview section, select your role and experience level, choose your tech stack, and click 'Create Interview'. The AI will generate personalized questions for you."
        },
        {
          q: "What information do I need to provide?",
          a: "You'll need to specify your target job role (e.g., Software Engineer, Data Scientist), experience level (Junior, Mid-level, Senior), and the technologies you want to be interviewed on."
        },
        {
          q: "Is AI MockPrep free to use?",
          a: "Yes, AI MockPrep offers free access to core interview features. Premium features may be added in the future with advanced analytics and additional customization options."
        }
      ]
    },
    {
      category: "Interview Experience",
      icon: MessageCircle,
      questions: [
        {
          q: "Can I use voice input for my answers?",
          a: "Yes! Click the microphone button to record your response. The AI will automatically transcribe your speech and analyze your verbal communication skills along with your technical answers."
        },
        {
          q: "How long should my answers be?",
          a: "Aim for comprehensive answers that demonstrate your knowledge. Most technical questions benefit from 2-5 minute responses, while behavioral questions might need 1-3 minutes."
        },
        {
          q: "Can I pause or restart an interview?",
          a: "Currently, interviews are designed to be completed in one session to simulate real interview conditions. However, you can create multiple interviews to practice different aspects."
        },
        {
          q: "What types of questions will I get?",
          a: "Questions are tailored to your role and tech stack, including technical concepts, coding problems, system design (for senior roles), and behavioral/situational questions."
        }
      ]
    },
    {
      category: "AI Analysis & Feedback",
      icon: BarChart3,
      questions: [
        {
          q: "How accurate is the AI feedback?",
          a: "Our AI uses advanced language models trained on interview best practices. While highly accurate for technical assessment, remember that real interviews involve human factors the AI cannot fully replicate."
        },
        {
          q: "What does the performance score mean?",
          a: "Scores are based on technical accuracy, communication clarity, problem-solving approach, and completeness of answers. Scores below 30 indicate significant gaps, 30-60 show room for improvement, and 60+ demonstrate strong performance."
        },
        {
          q: "Why did I get a low score despite knowing the answers?",
          a: "Low scores often result from incomplete answers, unclear communication, or responses like &apos;I don&apos;t know&apos;. The AI values detailed explanations and problem-solving approaches over just correct answers."
        },
        {
          q: "Can I get feedback on specific areas?",
          a: "Yes! The detailed feedback section breaks down your performance by categories like technical knowledge, communication skills, and problem-solving abilities, with specific improvement suggestions."
        }
      ]
    },
    {
      category: "Technical Issues",
      icon: Settings,
      questions: [
        {
          q: "The microphone isn't working. What should I do?",
          a: "Ensure your browser has microphone permissions enabled. Try refreshing the page and clicking &apos;Allow&apos; when prompted. Check your device&apos;s microphone settings and try a different browser if needed."
        },
        {
          q: "My interview responses aren't being saved.",
          a: "Make sure you're signed in to your account. Check your internet connection and try refreshing the page. If problems persist, contact our support team."
        },
        {
          q: "The AI is taking too long to generate feedback.",
          a: "Feedback generation typically takes 30-60 seconds. For complex interviews with many questions, it may take up to 2 minutes. If it takes longer, please refresh and try again."
        },
        {
          q: "I'm getting 'Failed to create interview' error.",
          a: "This usually indicates a temporary server issue or connection problem. Try refreshing the page, check your internet connection, and attempt to create the interview again."
        }
      ]
    }
  ];

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
          Help Center
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Find answers to common questions and learn how to get the most out of AI MockPrep.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link
          href="/contact"
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 hover:from-blue-700 hover:to-blue-800 transition-all group"
        >
          <MessageCircle className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-2">Contact Support</h3>
          <p className="text-blue-100 text-sm">Get personalized help from our team</p>
        </Link>

        <Link
          href="/interview"
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 hover:from-green-700 hover:to-green-800 transition-all group"
        >
          <Zap className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-2">Start Interview</h3>
          <p className="text-green-100 text-sm">Jump right into a practice session</p>
        </Link>

        <Link
          href="/about"
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 hover:from-purple-700 hover:to-purple-800 transition-all group"
        >
          <Book className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-2">Learn More</h3>
          <p className="text-purple-100 text-sm">Discover platform features and benefits</p>
        </Link>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center gap-3 mb-6">
              <category.icon className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">{category.category}</h2>
            </div>
            
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => (
                <details
                  key={faqIndex}
                  className="bg-gray-800/50 rounded-xl p-6 group [&[open]]:bg-gray-800/70 transition-all"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {faq.q}
                    </h3>
                    <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors group-open:rotate-180" />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Interview Tips</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Practice speaking your answers out loud for better fluency</li>
              <li>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</li>
              <li>Research common questions for your specific role and industry</li>
              <li>Focus on explaining your thought process, not just the final answer</li>
              <li>Be specific and use concrete examples from your experience</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Platform Features</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Voice recording with automatic transcription</li>
              <li>Personalized questions based on your tech stack</li>
              <li>Comprehensive AI-powered feedback and scoring</li>
              <li>Interview history tracking and progress monitoring</li>
              <li>Multiple experience levels from junior to senior</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
        <p className="text-blue-100 mb-6">
          Our support team is here to help you succeed. Don&apos;t hesitate to reach out with any questions.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </Link>
          <a
            href="mailto:support@aimockprep.com"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            support@aimockprep.com
          </a>
        </div>
      </div>
    </>
  );
}
