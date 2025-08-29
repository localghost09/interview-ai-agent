'use client';

import { useState, useEffect, useRef } from "react";
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
    { 
      id: '1', 
      text: 'Hello! 👋 Welcome to AI MockPrep support! I\'m your AI assistant here to help with:\n\n🎯 Mock interviews & practice\n📄 Resume building & optimization\n🔧 Technical issues & troubleshooting\n👤 Account & profile management\n💡 Study tips & strategies\n\nWhat can I help you with today?', 
      sender: 'agent', 
      timestamp: new Date() 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "How to start mock interview?",
    "Resume builder help",
    "Login issues",
    "Microphone not working",
    "View feedback reports",
    "Pricing information"
  ];

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuickAction = (action: string) => {
    setNewMessage(action);
    setShowQuickActions(false);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Get response for the quick action
    setTimeout(() => {
      const response = getIntelligentResponse(action);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Hide quick actions once user starts chatting
    setShowQuickActions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    // Enhanced AI response system
    setTimeout(() => {
      const response = getIntelligentResponse(currentMessage);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000); // Random delay 1-2 seconds for realism
  };

  const getIntelligentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();
    
    // Greeting responses
    if (input.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
      return "Hello! 👋 Welcome to AI MockPrep support! I'm here to help you with interview preparation, resume building, and any technical issues. What can I assist you with today?";
    }

    // Login and Authentication Issues
    if (input.includes('login') || input.includes('sign in') || input.includes('password') || input.includes('forgot password')) {
      return "🔐 **Login Help:**\n\n1. **Forgot Password**: Click 'Forgot Password' on the sign-in page\n2. **Email Verification**: Check your inbox for verification email\n3. **Account Issues**: Make sure you're using the correct email\n4. **Still stuck?** Try clearing browser cache or use incognito mode\n\nNeed more help? I can guide you through the process step by step!";
    }

    // Interview-related questions
    if (input.includes('interview') || input.includes('mock interview') || input.includes('practice')) {
      return "🎯 **Mock Interview Help:**\n\n**Getting Started:**\n• Click 'Start Interview' from your dashboard\n• Choose your role (Frontend, Backend, Full-Stack, etc.)\n• Select difficulty level\n• Pick question types (Technical, Behavioral, or Mixed)\n\n**During Interview:**\n• Use voice or text responses\n• Take your time to think\n• Real-time AI analysis of your answers\n\n**After Interview:**\n• Detailed feedback report\n• Areas for improvement\n• Performance analytics\n\nWould you like me to walk you through starting your first interview?";
    }

    // Resume and CV help
    if (input.includes('resume') || input.includes('cv') || input.includes('resume builder')) {
      return "📄 **Resume Builder Guide:**\n\n**Features:**\n• ATS-friendly templates\n• AI-powered content suggestions\n• Professional formatting\n• Multiple download formats\n\n**How to Use:**\n1. Go to 'Resume' section\n2. Upload existing resume or start fresh\n3. Choose a template\n4. AI will optimize content for your target role\n5. Download in PDF/Word format\n\n**Pro Tips:**\n• Use action verbs\n• Quantify achievements\n• Tailor for each job application\n\nNeed help with a specific section of your resume?";
    }

    // Feedback and Reports
    if (input.includes('feedback') || input.includes('report') || input.includes('score') || input.includes('analysis')) {
      return "📊 **Feedback & Analytics:**\n\n**What You Get:**\n• Overall performance score\n• Communication skills analysis\n• Technical knowledge assessment\n• Areas for improvement\n• Suggested resources\n\n**Access Your Reports:**\n1. Go to your Profile dashboard\n2. Click 'Interview History'\n3. View detailed feedback for each session\n\n**Understanding Scores:**\n• 🟢 Excellent (80-100%)\n• 🟡 Good (60-79%)\n• 🔴 Needs Improvement (Below 60%)\n\nWant to know how to improve your scores?";
    }

    // Pricing and Plans
    if (input.includes('price') || input.includes('cost') || input.includes('free') || input.includes('premium') || input.includes('subscription')) {
      return "💰 **Pricing Information:**\n\n**Free Plan:**\n• 3 mock interviews per month\n• Basic feedback reports\n• Standard resume templates\n• Email support\n\n**Premium Plan:**\n• Unlimited mock interviews\n• Advanced AI feedback\n• Premium resume templates\n• Priority support\n• Detailed analytics\n• Industry-specific questions\n\n**Coming Soon:**\n• 1-on-1 coaching sessions\n• Company-specific interview prep\n• Salary negotiation guidance\n\nWould you like to upgrade to Premium for unlimited practice?";
    }

    // Technical Issues and Bugs
    if (input.includes('error') || input.includes('bug') || input.includes('not working') || input.includes('broken') || input.includes('issue')) {
      return "🔧 **Technical Support:**\n\nI'm sorry you're experiencing issues! Let me help:\n\n**Quick Fixes:**\n• Refresh the page (Ctrl/Cmd + R)\n• Clear browser cache\n• Try incognito/private mode\n• Check internet connection\n\n**Common Issues:**\n• **Microphone not working**: Allow browser permissions\n• **Page loading slowly**: Check internet speed\n• **Interview not starting**: Disable browser extensions\n\n**For detailed help, please share:**\n• What were you trying to do?\n• What browser are you using?\n• Any error messages you see?\n\nI'll get this resolved for you quickly!";
    }

    // Account and Profile Issues
    if (input.includes('account') || input.includes('profile') || input.includes('settings') || input.includes('delete account')) {
      return "👤 **Account Management:**\n\n**Profile Settings:**\n• Update personal information\n• Change password\n• Email preferences\n• Privacy settings\n\n**Account Issues:**\n• **Can't access account**: Use password reset\n• **Update email**: Contact support\n• **Delete account**: Available in Settings > Privacy\n\n**Data & Privacy:**\n• Your interview data is encrypted\n• We don't share personal information\n• You can export your data anytime\n\nNeed help with a specific account setting?";
    }

    // Voice and Audio Issues
    if (input.includes('voice') || input.includes('microphone') || input.includes('audio') || input.includes('recording')) {
      return "🎤 **Voice & Audio Help:**\n\n**Microphone Setup:**\n1. Allow microphone permissions in browser\n2. Test microphone in Settings\n3. Ensure microphone is not muted\n4. Check system audio settings\n\n**Common Audio Issues:**\n• **No audio detected**: Check microphone permissions\n• **Poor quality**: Use headphones/external mic\n• **Echo/feedback**: Use headphones\n\n**Voice Interview Tips:**\n• Speak clearly and at normal pace\n• Find a quiet environment\n• Test audio before starting interview\n\nWould you like me to guide you through a microphone test?";
    }

    // Getting Started Guide
    if (input.includes('how to start') || input.includes('getting started') || input.includes('new user') || input.includes('beginner')) {
      return "🚀 **Getting Started with AI MockPrep:**\n\n**Step 1: Complete Your Profile**\n• Add your experience level\n• Select target roles\n• Upload your resume\n\n**Step 2: Take Your First Interview**\n• Choose 'Start Interview'\n• Pick difficulty: Beginner\n• Select 'Mixed' questions\n• Practice with 5 questions\n\n**Step 3: Review Feedback**\n• Check your performance report\n• Note improvement areas\n• Practice specific skills\n\n**Step 4: Keep Practicing**\n• Take regular mock interviews\n• Track your progress\n• Focus on weak areas\n\nReady to start your first interview? I can guide you through it!";
    }

    // Company-specific questions
    if (input.includes('google') || input.includes('amazon') || input.includes('microsoft') || input.includes('facebook') || input.includes('apple')) {
      return "🏢 **Company-Specific Preparation:**\n\nGreat choice! Here's how to prepare for top tech companies:\n\n**Popular Companies We Cover:**\n• Google (Algorithm focus)\n• Amazon (Leadership principles)\n• Microsoft (System design)\n• Meta/Facebook (Product thinking)\n• Apple (Innovation & design)\n\n**Preparation Strategy:**\n1. Practice company-specific question types\n2. Study their values and culture\n3. Review recent tech developments\n4. Practice behavioral questions\n\n**Pro Tip**: Use our interview simulator with company-specific settings for the most realistic practice!\n\nWhich company are you targeting? I can provide specific guidance!";
    }

    // Thank you responses
    if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
      return "You're absolutely welcome! 😊 I'm here to help you succeed in your interview preparation. Feel free to ask me anything about:\n\n• Mock interviews\n• Resume building\n• Technical support\n• Account help\n• Study strategies\n\nGood luck with your preparation! Remember, practice makes perfect. Is there anything else I can help you with?";
    }

    // Goodbye responses
    if (input.match(/^(bye|goodbye|see you|thanks bye|have a good day)$/)) {
      return "Goodbye! 👋 Best of luck with your interview preparation! Remember, I'm here 24/7 whenever you need help. Keep practicing and you'll ace that interview! 🚀";
    }

    // Help with specific technologies
    if (input.includes('javascript') || input.includes('python') || input.includes('react') || input.includes('node') || input.includes('programming')) {
      return "💻 **Technical Interview Prep:**\n\nOur platform covers all major technologies:\n\n**Frontend**: React, Vue, Angular, JavaScript, CSS\n**Backend**: Node.js, Python, Java, C++, Go\n**Database**: SQL, MongoDB, Redis\n**System Design**: Scalability, Architecture\n**Algorithms**: Data structures, problem-solving\n\n**Practice Approach:**\n1. Start with your strongest language\n2. Practice coding problems daily\n3. Focus on explaining your thought process\n4. Review time/space complexity\n\nWant to practice questions in a specific technology? I can recommend the best starting point for your level!";
    }

    // Default intelligent response
    const responses = [
      `I understand you're asking about "${userInput}". Let me help you with that! 🤔\n\n**Here are some ways I can assist:**\n\n• 🎯 Mock interview guidance\n• 📄 Resume building help\n• 🔧 Technical support\n• 👤 Account management\n• 💡 Study strategies\n\n**Popular topics:**\n• How to start your first interview\n• Fixing login issues\n• Understanding feedback reports\n• Choosing the right difficulty level\n\nCould you be more specific about what you need help with? I'm here to make your interview prep journey smooth and successful!`,
      
      `Thanks for reaching out about "${userInput}"! 💪\n\n**Quick Help Options:**\n\n🎯 **Interview Prep**: Practice questions, get AI feedback\n📊 **Progress Tracking**: View your improvement over time\n🎤 **Voice Practice**: Perfect your verbal communication\n📄 **Resume Polish**: AI-powered resume optimization\n\n**Need immediate help?**\nTry describing your issue in more detail, like:\n• "How do I start a mock interview?"\n• "My microphone isn't working"\n• "I can't see my feedback report"\n\nWhat specific challenge can I help you solve today?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-75 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Quick Actions - show after welcome message and when no user messages yet */}
        {showQuickActions && messages.length === 1 && (
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-xs text-gray-400 px-2">Quick Help:</p>
            <div className="grid grid-cols-1 gap-1">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="text-left text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}
        
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-1 border-t border-gray-700 ">
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