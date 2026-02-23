'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

interface CurrentUser {
  uid: string;
  email: string;
  name: string;
}

export default function ContactForm() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current user on component mount
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/current-user');
        if (response.ok) {
          const user = await response.json();
          setCurrentUser(user);
          // Pre-fill the email field with user's registered email
          setFormData(prev => ({
            ...prev,
            email: user.email,
            
          }));
        } else {
          // User is not authenticated, redirect to sign in
          toast.error('Please sign in to send us a message');
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('Error getting current user:', error);
        toast.error('Please sign in to send us a message');
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Prevent email field from being edited
    if (name === 'email') {
      toast.info('Email cannot be changed. It must match your registered account email.');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please sign in to send us a message');
      router.push('/sign-in');
      return;
    }

    // Ensure email matches the authenticated user's email
    if (formData.email !== currentUser.email) {
      toast.error('Email must match your registered account email');
      setFormData(prev => ({ ...prev, email: currentUser.email }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        // Reset form but keep user data
        setFormData({
          firstName: currentUser.name?.split(' ')[0] || '',
          lastName: currentUser.name?.split(' ')[1] || '',
          email: currentUser.email,
          subject: '',
          message: '',
          newsletter: false,
        });
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 mb-4">Please sign in to send us a message</div>
        <button
          onClick={() => router.push('/sign-in')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Authentication Notice */}
      <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1L5 6v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V6l-5-5zM8.414 3L11 5.586 13.586 3H8.414zM7 7h6v2H7V7z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Verified Account</span>
        </div>
        <p className="text-green-300 text-sm">
          You are sending this message from your verified account: <strong>{currentUser.email}</strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-300 font-medium mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-300 font-medium mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
          Email Address * (Account Email)
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            required
            className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-600 border border-gray-500 text-gray-300 cursor-not-allowed focus:outline-none"
            placeholder="Account email"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          🔒 Email is locked to your verified account for security
        </p>
      </div>

      <div>
        <label htmlFor="subject" className="block text-gray-300 font-medium mb-2">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select a subject</option>
          <option value="technical-support">Technical Support</option>
          <option value="account-help">Account Help</option>
          <option value="feedback">Feedback & Suggestions</option>
          <option value="bug-report">Bug Report</option>
          <option value="feature-request">Feature Request</option>
          <option value="billing">Billing & Payments</option>
          <option value="partnership">Partnership Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-vertical"
          placeholder="Please describe your question or issue in detail..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="newsletter" className="ml-2 text-gray-300 text-sm">
          I&apos;d like to receive updates about new features and improvements
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
