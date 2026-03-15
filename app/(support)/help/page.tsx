import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageCircle, Book, Zap, BarChart3, Settings, Sparkles } from "lucide-react";

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
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-4 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Header */}
      <div className="relative mb-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#161728] via-[#1d1f35] to-[#111320] px-6 py-10 md:px-10 md:py-14">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-blue-300 transition-colors hover:text-blue-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200/25 bg-primary-200/10 px-4 py-1.5 text-xs font-medium text-primary-100">
          <Sparkles className="h-3.5 w-3.5" />
          Answers in one place
        </div>

        <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">Help Center</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
          Find quick answers, platform guidance, and troubleshooting tips to get the most out of AI MockPrep.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <Link
          href="/contact"
          className="group rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600/80 to-blue-700/80 p-6 transition-all hover:from-blue-500 hover:to-blue-600"
        >
          <MessageCircle className="mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
          <h3 className="mb-2 font-semibold text-white">Contact Support</h3>
          <p className="text-blue-100 text-sm">Get personalized help from our team</p>
        </Link>

        <Link
          href="/interview"
          className="group rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 p-6 transition-all hover:from-emerald-500 hover:to-emerald-600"
        >
          <Zap className="mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
          <h3 className="mb-2 font-semibold text-white">Start Interview</h3>
          <p className="text-green-100 text-sm">Jump right into a practice session</p>
        </Link>

        <Link
          href="/about"
          className="group rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-600/80 to-violet-700/80 p-6 transition-all hover:from-violet-500 hover:to-violet-600"
        >
          <Book className="mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
          <h3 className="mb-2 font-semibold text-white">Learn More</h3>
          <p className="text-purple-100 text-sm">Discover platform features and benefits</p>
        </Link>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-10">
        {faqs.map((category, categoryIndex) => (
          <section key={categoryIndex} className="rounded-2xl border border-white/10 bg-gray-900/45 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-2">
                <category.icon className="h-5 w-5 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">{category.category}</h2>
            </div>
            
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => (
                <details
                  key={faqIndex}
                  className="group rounded-xl border border-white/10 bg-gray-800/45 p-6 transition-all [&[open]]:border-blue-400/35 [&[open]]:bg-gray-800/70"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {faq.q}
                    </h3>
                    <HelpCircle className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-300 group-open:rotate-180" />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-gray-800 to-gray-900 p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Additional Resources</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Interview Tips</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside text-sm">
              <li>Practice speaking your answers out loud for better fluency</li>
              <li>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</li>
              <li>Research common questions for your specific role and industry</li>
              <li>Focus on explaining your thought process, not just the final answer</li>
              <li>Be specific and use concrete examples from your experience</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Platform Features</h3>
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
      <div className="mt-12 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Still Need Help?</h2>
        <p className="mb-6 text-blue-100">
          Our support team is here to help you succeed. Don&apos;t hesitate to reach out with any questions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
          >
            Contact Support
          </Link>
          <a
            href="mailto:localghost678@gmail.com"
            className="rounded-full border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            localghost678@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
