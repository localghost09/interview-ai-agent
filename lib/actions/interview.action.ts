'use server';

import { db } from "@/firebase/admin";
import { generateQuestions } from "@/lib/serverQuestions";

export async function createInterview(params: {
  userId: string;
  role: string;
  level: string;
  techstack: string[];
  type: string;
}) {
  const { userId, role, level, techstack, type } = params;

  try {
    // Generate interview questions based on role, level, tech stack, and type
    const questions = await generateQuestions(role, level, techstack, type);
    
    const interviewData = {
      userId,
      role,
      level,
      techstack,
      type,
      questions,
      finalized: false,
      createdAt: new Date().toISOString(),
    };

    // Create interview document in Firestore
    const docRef = await db.collection('interviews').add(interviewData);

    return {
      success: true,
      interviewId: docRef.id,
      message: 'Interview created successfully'
    };

  } catch (error) {
    console.error('Error creating interview:', error);
    return {
      success: false,
      message: 'Failed to create interview'
    };
  }
}

export async function getInterview(interviewId: string) {
  try {
    const doc = await db.collection('interviews').doc(interviewId).get();
    
    if (!doc.exists) {
      return {
        success: false,
        message: 'Interview not found'
      };
    }

    return {
      success: true,
      interview: { id: doc.id, ...doc.data() } as Interview
    };

  } catch (error) {
    console.error('Error fetching interview:', error);
    return {
      success: false,
      message: 'Failed to fetch interview'
    };
  }
}

export async function getUserInterviews(userId: string) {
  try {
    const snapshot = await db.collection('interviews')
      .where('userId', '==', userId)
      .get();

    const interviews = snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data()
    })) as Interview[];

    // Sort by createdAt in JavaScript instead of Firestore
    interviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      success: true,
      interviews
    };

  } catch (error) {
    console.error('Error fetching user interviews:', error);
    return {
      success: false,
      interviews: []
    };
  }
}

export async function finalizeInterview(interviewId: string) {
  try {
    await db.collection('interviews').doc(interviewId).update({
      finalized: true
    });

    return {
      success: true,
      message: 'Interview finalized successfully'
    };

  } catch (error) {
    console.error('Error finalizing interview:', error);
    return {
      success: false,
      message: 'Failed to finalize interview'
    };
  }
}
