'use server';

import { db } from "@/firebase/admin";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    // Generate AI feedback based on transcript
    const feedback = await generateAIFeedback(transcript);
    
    const feedbackData = {
      interviewId,
      userId,
      ...feedback,
      createdAt: new Date().toISOString(),
    };

    let docRef;
    if (feedbackId) {
      await db.collection('feedback').doc(feedbackId).set(feedbackData);
      docRef = { id: feedbackId };
    } else {
      docRef = await db.collection('feedback').add(feedbackData);
    }

    return {
      success: true,
      feedbackId: docRef.id,
      message: 'Feedback created successfully'
    };

  } catch (error) {
    console.error('Error creating feedback:', error);
    return {
      success: false,
      message: 'Failed to create feedback'
    };
  }
}

export async function getFeedback(feedbackId: string) {
  try {
    const doc = await db.collection('feedback').doc(feedbackId).get();
    
    if (!doc.exists) {
      return {
        success: false,
        message: 'Feedback not found'
      };
    }

    return {
      success: true,
      feedback: { id: doc.id, ...doc.data() } as Feedback
    };

  } catch (error) {
    console.error('Error fetching feedback:', error);
    return {
      success: false,
      message: 'Failed to fetch feedback'
    };
  }
}

export async function getFeedbackByInterview(interviewId: string) {
  try {
    const snapshot = await db.collection('feedback')
      .where('interviewId', '==', interviewId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return {
        success: false,
        message: 'No feedback found for this interview'
      };
    }

    const doc = snapshot.docs[0];
    return {
      success: true,
      feedback: { id: doc.id, ...doc.data() } as Feedback
    };

  } catch (error) {
    console.error('Error fetching feedback:', error);
    return {
      success: false,
      message: 'Failed to fetch feedback'
    };
  }
}

async function generateAIFeedback(transcript: { role: string; content: string }[]): Promise<Omit<Feedback, 'id' | 'interviewId' | 'createdAt'>> {
  // This would typically call an AI service like OpenAI to analyze the transcript
  // For now, we'll return a mock feedback based on the transcript length and content
  
  const responses = transcript.filter(t => t.role === 'user');
  const avgResponseLength = responses.reduce((acc, r) => acc + r.content.length, 0) / responses.length;
  
  // Mock scoring based on response quality indicators
  const communicationScore = Math.min(100, Math.max(60, avgResponseLength > 100 ? 85 : 70));
  const technicalScore = Math.min(100, Math.max(50, 
    responses.some(r => r.content.toLowerCase().includes('experience')) ? 80 : 65
  ));
  const problemSolvingScore = Math.min(100, Math.max(55, 
    responses.some(r => r.content.toLowerCase().includes('challenge')) ? 85 : 70
  ));

  const totalScore = Math.round((communicationScore + technicalScore + problemSolvingScore) / 3);

  return {
    totalScore,
    categoryScores: [
      {
        name: "Communication",
        score: communicationScore,
        comment: communicationScore > 80 
          ? "Excellent communication skills demonstrated throughout the interview."
          : "Good communication, but could be more detailed in explanations."
      },
      {
        name: "Technical Knowledge",
        score: technicalScore,
        comment: technicalScore > 75
          ? "Strong technical foundation and understanding of concepts."
          : "Solid technical knowledge with room for improvement."
      },
      {
        name: "Problem Solving",
        score: problemSolvingScore,
        comment: problemSolvingScore > 80
          ? "Great problem-solving approach and analytical thinking."
          : "Good problem-solving skills, consider more structured approaches."
      }
    ],
    strengths: [
      "Clear and concise communication",
      "Good understanding of fundamental concepts",
      "Professional demeanor and confidence"
    ],
    areasForImprovement: [
      "Provide more specific examples from past experience",
      "Elaborate more on technical implementations",
      "Ask clarifying questions when needed"
    ],
    finalAssessment: totalScore > 80 
      ? "Excellent performance! You demonstrated strong technical skills and communication abilities. You're well-prepared for this role."
      : totalScore > 70
        ? "Good performance overall. You showed solid understanding and communication skills with some areas for improvement."
        : "Fair performance. Focus on strengthening your technical knowledge and providing more detailed examples."
  };
}
