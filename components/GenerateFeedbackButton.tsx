'use client';

import { useState } from 'react';
import { createFeedback } from '@/lib/actions/feedback.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface GenerateFeedbackButtonProps {
  interviewId: string;
  userId: string;
}

const GenerateFeedbackButton = ({ interviewId, userId }: GenerateFeedbackButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGenerateFeedback = async () => {
    setIsLoading(true);
    try {
      const mockTranscript = [
        { role: 'assistant', content: 'Tell me about yourself and your background.' },
        { role: 'user', content: 'I am a software developer with 3 years of experience in web development.' },
        { role: 'assistant', content: 'What are your strengths and weaknesses?' },
        { role: 'user', content: 'My strength is problem-solving and my weakness is public speaking.' },
        { role: 'assistant', content: 'Describe a challenging project you worked on.' },
        { role: 'user', content: 'I worked on a complex e-commerce platform with microservices architecture.' }
      ];

      const result = await createFeedback({
        interviewId,
        userId,
        transcript: mockTranscript
      });

      if (result.success) {
        toast.success('Feedback generated successfully!');
        router.refresh();
      } else {
        toast.error('Failed to generate feedback');
      }
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast.error('An error occurred while generating feedback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateFeedback}
      disabled={isLoading}
      className="interview-primary-btn"
    >
      {isLoading ? 'Generating...' : 'Generate Feedback'}
    </button>
  );
};

export default GenerateFeedbackButton;
