'use server';

import { db } from '@/firebase/admin';

const COMPLETION_BONUS = 0.5;

function toNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function roundScore(value: number): number {
  return Number(value.toFixed(2));
}

function resolveDisplayName(data: Record<string, unknown>, userId: string): string {
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const displayName = typeof data.displayName === 'string' ? data.displayName.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';

  if (name) return name;
  if (displayName) return displayName;
  if (email.includes('@')) return email.split('@')[0];
  if (email) return email;

  return `User ${userId.slice(0, 6)}`;
}

function resolveAvatar(data: Record<string, unknown>): string | null {
  const avatar = typeof data.avatar === 'string' ? data.avatar.trim() : '';
  const photoURL = typeof data.photoURL === 'string' ? data.photoURL.trim() : '';

  if (avatar) return avatar;
  if (photoURL) return photoURL;
  return null;
}

function calculateLeaderboardScore(averageScore: number, interviewsCompleted: number): number {
  return roundScore(averageScore + interviewsCompleted * COMPLETION_BONUS);
}

function mapUserToEntry(doc: FirebaseFirestore.QueryDocumentSnapshot): Omit<LeaderboardEntry, 'rank'> {
  const data = doc.data() as Record<string, unknown>;
  const interviewsCompleted = Math.max(0, Math.floor(toNumber(data.interviewsCompleted)));
  const totalScore = roundScore(toNumber(data.totalScore));

  const storedAverage = toNumber(data.averageScore);
  const averageScore = interviewsCompleted > 0
    ? roundScore(totalScore / interviewsCompleted)
    : roundScore(storedAverage);

  const storedLeaderboardScore = toNumber(data.leaderboardScore);
  const leaderboardScore = roundScore(
    storedLeaderboardScore > 0
      ? storedLeaderboardScore
      : calculateLeaderboardScore(averageScore, interviewsCompleted)
  );

  return {
    id: doc.id,
    name: resolveDisplayName(data, doc.id),
    email: (data.email as string) || '',
    avatar: resolveAvatar(data),
    interviewsCompleted,
    totalScore,
    averageScore,
    leaderboardScore,
    streak: Math.max(0, Math.floor(toNumber(data.streak))),
  };
}

function rankEntries(entries: Omit<LeaderboardEntry, 'rank'>[]): LeaderboardEntry[] {
  return entries
    .sort((a, b) => {
      if (b.leaderboardScore !== a.leaderboardScore) return b.leaderboardScore - a.leaderboardScore;
      if (b.averageScore !== a.averageScore) return b.averageScore - a.averageScore;
      return b.interviewsCompleted - a.interviewsCompleted;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

export async function syncUserLeaderboardStats(userId: string) {
  if (!userId) {
    return { success: false };
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const feedbackSnapshot = await db.collection('feedback').where('userId', '==', userId).get();
    const userSnap = await userRef.get();
    const existing = userSnap.exists ? userSnap.data() || {} : {};

    const interviewsCompleted = feedbackSnapshot.size;
    const totalScore = roundScore(
      feedbackSnapshot.docs.reduce((sum: number, doc: any) => sum + toNumber(doc.data().totalScore), 0)
    );
    const averageScore = interviewsCompleted > 0 ? roundScore(totalScore / interviewsCompleted) : 0;
    const leaderboardScore = calculateLeaderboardScore(averageScore, interviewsCompleted);

    const resolvedName = resolveDisplayName(existing as Record<string, unknown>, userId);

    await userRef.set(
      {
        name: resolvedName,
        displayName: (existing.displayName as string) || resolvedName,
        email: existing.email || '',
        avatar: resolveAvatar(existing as Record<string, unknown>),
        interviewsCompleted,
        totalScore,
        averageScore,
        leaderboardScore,
        streak: Math.max(interviewsCompleted, Math.floor(toNumber(existing.streak))),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return {
      success: true,
      interviewsCompleted,
      totalScore,
      averageScore,
      leaderboardScore,
    };
  } catch (error) {
    console.error('Error syncing user leaderboard stats:', error);
    return { success: false };
  }
}

export async function updateUserLeaderboardAfterInterview(params: {
  userId: string;
  interviewId: string;
  score: number;
}) {
  const { userId, interviewId, score } = params;

  if (!userId || !interviewId) {
    throw new Error('Missing required leaderboard update fields');
  }

  const numericScore = toNumber(score);

  return db.runTransaction(async (transaction: any) => {
    const userRef = db.collection('users').doc(userId);
    const interviewRef = db.collection('interviews').doc(interviewId);

    const userSnap = await transaction.get(userRef);
    const interviewSnap = await transaction.get(interviewRef);

    if (!interviewSnap.exists) {
      throw new Error('Interview not found for leaderboard update');
    }

    const interviewData = interviewSnap.data() || {};

    if (interviewData.userId && interviewData.userId !== userId) {
      // Legacy compatibility: older interview flow used hardcoded "user1".
      // Rebind the interview to the authenticated user so scores are not lost.
      if (interviewData.userId === 'user1') {
        transaction.update(interviewRef, {
          userId,
        });
      } else {
        throw new Error('Interview does not belong to the provided user');
      }
    }

    // Prevent double counting if feedback generation is retried.
    if (interviewData.leaderboardProcessed) {
      return { success: true, alreadyProcessed: true };
    }

    const existing = userSnap.exists ? userSnap.data() || {} : {};
    const resolvedName = resolveDisplayName(existing as Record<string, unknown>, userId);

    const interviewsCompleted = Math.max(0, Math.floor(toNumber(existing.interviewsCompleted)));
    const totalScore = roundScore(toNumber(existing.totalScore));
    const streak = Math.max(0, Math.floor(toNumber(existing.streak)));

    const nextInterviewsCompleted = interviewsCompleted + 1;
    const nextTotalScore = roundScore(totalScore + numericScore);
    const nextAverageScore = roundScore(nextTotalScore / nextInterviewsCompleted);
    const nextLeaderboardScore = calculateLeaderboardScore(nextAverageScore, nextInterviewsCompleted);

    transaction.set(
      userRef,
      {
        name: resolvedName,
        displayName: (existing.displayName as string) || resolvedName,
        email: existing.email || '',
        avatar: resolveAvatar(existing as Record<string, unknown>),
        interviewsCompleted: nextInterviewsCompleted,
        totalScore: nextTotalScore,
        averageScore: nextAverageScore,
        leaderboardScore: nextLeaderboardScore,
        streak: streak + 1,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    transaction.update(interviewRef, {
      leaderboardProcessed: true,
      leaderboardProcessedAt: new Date().toISOString(),
      finalScore: numericScore,
    });

    return {
      success: true,
      alreadyProcessed: false,
      interviewsCompleted: nextInterviewsCompleted,
      totalScore: nextTotalScore,
      averageScore: nextAverageScore,
      leaderboardScore: nextLeaderboardScore,
    };
  });
}

export async function getLeaderboardSnapshot(params?: {
  limit?: number;
  currentUserId?: string;
}) {
  const { limit = 10, currentUserId } = params || {};

  try {
    if (currentUserId) {
      await syncUserLeaderboardStats(currentUserId);
    }

    const snapshot = await db.collection('users').get();
    const ranked = rankEntries(snapshot.docs.map(mapUserToEntry));

    const topUsers = ranked.slice(0, limit);
    const currentUser = currentUserId
      ? ranked.find((entry) => entry.id === currentUserId) || null
      : null;

    return {
      success: true,
      topUsers,
      currentUser,
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return {
      success: false,
      topUsers: [] as LeaderboardEntry[],
      currentUser: null as LeaderboardEntry | null,
    };
  }
}

export async function getTopLeaderboardUsers(limit = 3) {
  const result = await getLeaderboardSnapshot({ limit });
  return {
    success: result.success,
    users: result.topUsers,
  };
}
