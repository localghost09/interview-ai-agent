'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone, Clock, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import LiveChat from "@/components/LiveChat";

export default function ContactPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-2 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 top-40 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />

      {/* Hero */}
      <div className="relative mb-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#161728] via-[#1d1f35] to-[#111320] px-6 py-10 md:px-10 md:py-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200/25 bg-primary-200/10 px-4 py-1.5 text-xs font-medium text-primary-100">
          <Sparkles className="h-3.5 w-3.5" />
          Support that actually helps
        </div>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
          Questions, feedback, bugs, or guidance for interview prep. Share what you need and our team will respond quickly with practical help.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-indigo-500"
          >
            <MessageSquare className="h-4 w-4" />
            Start Live Chat
          </button>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
          >
            Browse Help Center
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="mb-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex min-h-[228px] flex-col rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/25 to-blue-900/20 p-6 text-center">
          <Mail className="mx-auto mb-3 h-8 w-8 text-blue-200" />
          <h3 className="mb-2 text-base font-semibold leading-tight text-white">Email Support</h3>
          <p className="mb-4 text-sm leading-relaxed text-blue-100">General inquiries and support</p>
          <a
            href="mailto:localghost678@gmail.com"
            className="mt-auto inline-block w-full whitespace-nowrap text-[12px] font-medium leading-relaxed tracking-tight text-white hover:underline"
          >
            localghost678@gmail.com
          </a>
        </div>

        <div className="flex min-h-[228px] flex-col rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/25 to-emerald-900/20 p-6 text-center">
          <MessageSquare className="mx-auto mb-3 h-8 w-8 text-emerald-200" />
          <h3 className="mb-2 text-base font-semibold leading-tight text-white">Live Chat</h3>
          <p className="mb-4 text-sm leading-relaxed text-emerald-100">Quick questions and help</p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="mt-auto rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Start Chat
          </button>
        </div>

        <div className="flex min-h-[228px] flex-col rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/25 to-violet-900/20 p-6 text-center">
          <Phone className="mx-auto mb-3 h-8 w-8 text-violet-200" />
          <h3 className="mb-2 text-base font-semibold leading-tight text-white">Phone Support</h3>
          <p className="mb-4 text-sm leading-relaxed text-violet-100">Urgent technical issues</p>
          <span className="mt-auto text-sm font-medium text-white">Coming Soon</span>
        </div>

        <div className="flex min-h-[228px] flex-col rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/25 to-amber-900/20 p-6 text-center">
          <Clock className="mx-auto mb-3 h-8 w-8 text-amber-200" />
          <h3 className="mb-2 text-base font-semibold leading-tight text-white">Response Time</h3>
          <p className="mb-4 text-sm leading-relaxed text-amber-100">We typically respond within</p>
          <span className="mt-auto text-sm font-medium text-white">2-4 hours</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mb-12 grid items-stretch gap-8 lg:grid-cols-3">
        <div className="h-full lg:col-span-2">
          <div className="h-full rounded-2xl border border-white/10 bg-gray-900/55 p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex h-full flex-col gap-6 lg:min-h-full">
          <div className="rounded-xl border border-white/10 bg-gray-900/55 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                <div className="min-w-0">
                  <p className="font-medium leading-none text-white">Email</p>
                  <a
                    href="mailto:localghost678@gmail.com"
                    className="mt-1 block w-full whitespace-nowrap text-[13px] leading-5 tracking-tight text-gray-200 transition-colors hover:text-white"
                  >
                    localghost678@gmail.com
                  </a>
                  <p className="mt-1 text-sm leading-5 text-gray-300">For all inquiries and support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-300 text-sm">Noida (Remote Team)</p>
                  <p className="text-gray-300 text-sm">Serving users worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-400" />
                <div>
                  <p className="text-white font-medium">Response Time</p>
                  <p className="text-gray-300 text-sm">2-4 hours (business days)</p>
                  <p className="text-gray-300 text-sm">24-48 hours (weekends)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white">Quick Help</h3>
            <p className="mb-4 text-sm text-gray-300">
              Before contacting us, check out our help center for quick answers to common questions.
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200"
            >
              Visit Help Center
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>

          <div className="rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white">Need Instant Help?</h3>
            <p className="mb-4 text-sm text-gray-300">
              Try our live chat for immediate assistance with common questions and technical support.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              <MessageSquare className="h-4 w-4" />
              Start Live Chat
            </button>
          </div>

          <div className="flex flex-1 flex-col rounded-xl border border-primary-200/25 bg-primary-200/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-primary-100">
              <ShieldCheck className="h-4 w-4" />
              <p className="text-sm font-semibold">Private & Secure</p>
            </div>
            <p className="text-xs leading-relaxed text-primary-100/80">
              Your contact details are used only to resolve your request and are never shared with third parties.
              All conversations are encrypted and handled with strict privacy standards.
            
            </p>

          </div>

        </div>
      </div>

      {/* FAQ Reference */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="mb-6 text-gray-300">
          Many common questions are already answered in our comprehensive help center.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/help"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Browse FAQ
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-gray-600 px-6 py-3 font-semibold text-gray-300 transition-colors hover:bg-gray-700"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Live Chat Component */}
      <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Live Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-emerald-600 p-4 text-white shadow-lg transition-all hover:bg-emerald-500"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="group-hover:block hidden absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
            Need help? Chat with us!
          </span>
        </button>
      )}
    </div>
  );
}