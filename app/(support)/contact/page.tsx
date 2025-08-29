'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone, Clock, MapPin, X, Send, User, Bot, Minimize2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

// Simple Live Chat Component
function LiveChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! Welcome to AI MockPrep support. How can I help you today?', sender: 'agent', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Auto response
    setTimeout(() => {
      const response = newMessage.toLowerCase().includes('password') 
        ? 'I can help with login issues! Try the "Forgot Password" link on sign-in page.'
        : `Thanks for your message about "${newMessage}". For detailed support, email us at localghost678@gmail.com`;
        
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 h-96 w-80">
      {/* Header */}
      <div className="bg-green-600 rounded-t-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-white" />
          <div>
            <h3 className="text-white font-semibold">Live Chat Support</h3>
            <p className="text-green-100 text-xs">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:bg-green-700 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                {message.sender === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
              </div>
              <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-gray-700 text-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white p-2 rounded-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

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

          <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Bug Reports</h3>
            <p className="text-gray-300 text-sm mb-4">
              Found a bug? Help us improve by providing detailed information about the issue.
            </p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• Steps to reproduce the issue</li>
              <li>• Browser and device information</li>
              <li>• Screenshots if applicable</li>
              <li>• Error messages received</li>
            </ul>
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
    </>
  );
}