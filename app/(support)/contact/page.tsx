'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone, Clock, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import LiveChat from "@/components/LiveChat";

export default function ContactPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          We&apos;re here to help you succeed. Reach out with any questions, feedback, or support needs.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center">
          <Mail className="w-8 h-8 text-white mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Email Support</h3>
          <p className="text-blue-100 text-sm mb-3">General inquiries and support</p>
          <a
            href="mailto:localghost678@gmail.com"
            className="text-white font-medium hover:underline text-xs sm:text-sm break-all"
          >
            localghost678@gmail.com
          </a>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-center">
          <MessageSquare className="w-8 h-8 text-white mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Live Chat</h3>
          <p className="text-green-100 text-sm mb-3">Quick questions and help</p>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="text-white font-medium hover:underline hover:bg-green-800 px-3 py-1 rounded transition-colors"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-center">
          <Phone className="w-8 h-8 text-white mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Phone Support</h3>
          <p className="text-purple-100 text-sm mb-3">Urgent technical issues</p>
          <span className="text-white font-medium">
            Coming Soon
          </span>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-center">
          <Clock className="w-8 h-8 text-white mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Response Time</h3>
          <p className="text-orange-100 text-sm mb-3">We typically respond within</p>
          <span className="text-white font-medium">
            2-4 hours
          </span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300 text-sm break-all">localghost678@gmail.com</p>
                  <p className="text-gray-300 text-sm">For all inquiries and support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-300 text-sm">Noida (Remote Team)</p>
                  <p className="text-gray-300 text-sm">Serving users worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Response Time</p>
                  <p className="text-gray-300 text-sm">2-4 hours (business days)</p>
                  <p className="text-gray-300 text-sm">24-48 hours (weekends)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Help</h3>
            <p className="text-gray-300 text-sm mb-4">
              Before contacting us, check out our help center for quick answers to common questions.
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Visit Help Center
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Need Instant Help?</h3>
            <p className="text-gray-300 text-sm mb-4">
              Try our live chat for immediate assistance with common questions and technical support.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              Start Live Chat
            </button>
          </div>

      
        </div>
      </div>

      {/* FAQ Reference */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-300 mb-6">
          Many common questions are already answered in our comprehensive help center.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/help"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse FAQ
          </Link>
          <Link
            href="/about"
            className="border border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
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
          className="fixed bottom-4 right-4 z-40 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2 group transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="group-hover:block hidden absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
            Need help? Chat with us!
          </span>
        </button>
      )}
    </>
  );
}