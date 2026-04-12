import Link from 'next/link';
import { Medal, Trophy, ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getLeaderboardSnapshot } from '@/lib/actions/leaderboard.action';

export const dynamic = 'force-dynamic';

const medalClasses: Record<number, string> = {
  1: 'text-yellow-300',
  2: 'text-slate-300',
  3: 'text-amber-500',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';
}

export default async function LeaderboardPage() {
  const currentUser = await getCurrentUser();
  const leaderboard = await getLeaderboardSnapshot({
    limit: 10,
    currentUserId: currentUser?.uid,
  });

  const topUsers = leaderboard.topUsers;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="relative px-2 py-6 md:px-4 md:py-8">
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight hero-gradient-text">Leaderboard</h1>
            <p className="mt-2 max-w-2xl text-light-400 text-sm md:text-base">
              Top performers based on interview scores and consistency.
            </p>
          </div>
          <Link
            href="/"
            className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-300/15 border border-cyan-300/40 text-sm font-medium text-cyan-200 transition-all hover:bg-cyan-300/25 hover:border-cyan-300/60 whitespace-nowrap flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Current User Section */}
      {currentUser && leaderboard.currentUser && (
        <section className="rounded-xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(34,197,94,0.08)_0%,rgba(17,94,89,0.05)_100%)] p-4 md:p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">Your Standing</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">
                Rank <span className="text-cyan-300">#{leaderboard.currentUser.rank}</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/5 p-3 text-center">
                <p className="text-xs text-light-400">Avg Score</p>
                <p className="mt-1 text-lg font-bold text-cyan-300">{leaderboard.currentUser.leaderboardScore.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border border-indigo-300/20 bg-indigo-300/5 p-3 text-center">
                <p className="text-xs text-light-400">Interviews</p>
                <p className="mt-1 text-lg font-bold text-indigo-300">{leaderboard.currentUser.interviewsCompleted}</p>
              </div>
              <div className="rounded-lg border border-rose-300/20 bg-rose-300/5 p-3 text-center">
                <p className="text-xs text-light-400">Status</p>
                <p className="mt-1 text-lg font-bold text-rose-300">Active</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leaderboard Table Section */}
      <section className="rounded-2xl border border-white/10 bg-[linear-gradient(168deg,rgba(24,26,44,0.60)_0%,rgba(10,11,20,0.70)_100%)] p-6 md:p-8 backdrop-blur-sm">
        {topUsers.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <Trophy className="mx-auto h-12 w-12 text-light-400 mb-4" />
            <h2 className="text-xl font-semibold text-white">No rankings yet</h2>
            <p className="mt-2 text-sm text-light-300">Complete interviews to appear on the leaderboard.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-xl border border-white/10 md:block">
              <table className="w-full text-left text-base">
                <thead className="bg-white/5 text-sm uppercase tracking-wide text-light-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Avg Score</th>
                    <th className="px-6 py-4">Interviews</th>
                    <th className="px-6 py-4">Leaderboard Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((entry) => {
                    const isCurrentUser = currentUser?.uid === entry.id;

                    return (
                      <tr
                        key={entry.id}
                        className={`border-t border-white/10 transition-colors ${
                          isCurrentUser ? 'bg-cyan-300/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-lg text-white">
                          <span className="inline-flex items-center gap-2">
                            #{entry.rank}
                            {entry.rank <= 3 && <Medal className={`h-5 w-5 ${medalClasses[entry.rank]}`} />}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {entry.avatar ? (
                              <img src={entry.avatar} alt={entry.name} className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-bold text-white">
                                {getInitials(entry.name)}
                              </div>
                            )}
                            <div className="flex flex-col">
                              <p className="text-base font-semibold text-white">{entry.name}</p>
                              {isCurrentUser && (
                                <span className="text-sm font-semibold text-cyan-300">You</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-base font-medium text-light-200">{entry.averageScore.toFixed(2)}</td>
                        <td className="px-6 py-4 text-base font-medium text-light-200">{entry.interviewsCompleted}</td>
                        <td className="px-6 py-4 text-xl font-bold text-cyan-300">{entry.leaderboardScore.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {topUsers.map((entry) => {
                const isCurrentUser = currentUser?.uid === entry.id;

                return (
                  <article
                    key={entry.id}
                    className={`rounded-lg border p-4 transition-colors ${
                      isCurrentUser
                        ? 'border-cyan-300/40 bg-cyan-300/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-base font-bold text-white">#{entry.rank}</span>
                      {entry.rank <= 3 && <Medal className={`h-5 w-5 ${medalClasses[entry.rank]}`} />}
                    </div>
                    <div className="mb-3 flex items-center gap-3">
                      {entry.avatar ? (
                        <img src={entry.avatar} alt={entry.name} className="h-11 w-11 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-bold text-white">
                          {getInitials(entry.name)}
                        </div>
                      )}
                      <div>
                        <p className="text-base font-semibold text-white">{entry.name}</p>
                        {isCurrentUser && <p className="text-sm font-semibold text-cyan-300">You</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                        <p className="text-sm text-light-400 font-medium">Avg</p>
                        <p className="mt-2 text-base font-semibold text-light-200">{entry.averageScore.toFixed(2)}</p>
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                        <p className="text-sm text-light-400 font-medium">Done</p>
                        <p className="mt-2 text-base font-semibold text-light-200">{entry.interviewsCompleted}</p>
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                        <p className="text-sm text-light-400 font-medium">Score</p>
                        <p className="mt-2 text-base font-semibold text-cyan-300">{entry.leaderboardScore.toFixed(2)}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

