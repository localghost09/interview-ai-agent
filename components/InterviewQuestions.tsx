"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DisplayTechIcons from "./DisplayTechIcons";
import Image from "next/image";
import dayjs from "dayjs";

interface Props {
  interview: Interview;
}

const InterviewQuestions = ({ interview }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    setLoading(true);
    try {
      router.push(`/interview/${interview.id}/start`);
    } catch {
      toast.error("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = dayjs(interview.createdAt).format('DD/MM/YYYY');

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-4 md:space-y-8 md:py-6">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(130deg,rgba(22,25,45,0.95)_0%,rgba(15,18,35,0.92)_50%,rgba(12,14,28,0.96)_100%)] p-4 shadow-[0_20px_70px_-30px_rgba(124,111,255,0.45)] md:p-5">
        <div className="pointer-events-none absolute -left-20 top-0 h-36 w-36 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-primary-200/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 md:gap-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div
                className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1"
                style={{ background: 'rgba(202, 197, 254, 0.1)', border: '1px solid rgba(202, 197, 254, 0.2)' }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-medium tracking-wide text-primary-200/90">Preview Mode</span>
              </div>
              <h1 className="text-2xl font-extrabold leading-tight text-white md:text-3xl">
                {interview.role} <span className="hero-gradient-text">Interview</span>
              </h1>
              <p className="mt-1.5 text-sm text-light-300 md:text-base">
                {interview.type} · {interview.level} level session
              </p>
            </div>

            <div className="flex min-w-[168px] flex-col items-start gap-1.5 rounded-xl border border-primary-200/20 bg-primary-200/5 px-3 py-2.5 text-sm md:items-end">
              <span className="interview-badge">{interview.type}</span>
              <div className="flex items-center gap-2 text-light-300">
                <Image src="/calendar.svg" alt="calendar" width={14} height={14} className="opacity-60" />
                <span className="text-xs md:text-sm">{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 md:text-sm">
              {interview.questions.length} Questions
            </div>
            <div className="rounded-full border border-indigo-300/25 bg-indigo-300/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 md:text-sm">
              {interview.level} Difficulty
            </div>
            <div className="rounded-full border border-rose-300/25 bg-rose-300/10 px-3 py-1.5 text-xs font-semibold text-rose-200 md:text-sm">
              {interview.type} Format
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-light-400">Tech Stack</p>
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
        </div>
      </section>

      <section>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(32,37,69,0.55)_0%,rgba(15,17,30,0.8)_100%)] p-6 backdrop-blur-sm md:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Question Preview</h2>
            <span className="rounded-full border border-primary-200/30 bg-primary-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-100">
              {interview.questions.length} Total
            </span>
          </div>

          <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
            {interview.questions.map((question, index) => (
              <article
                key={index}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200/30 hover:bg-primary-200/[0.07]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-indigo-400 text-xs font-bold text-white shadow-[0_6px_20px_-8px_rgba(124,111,255,0.8)]">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-relaxed text-light-100 md:text-[15px]">{question}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-3 pb-2 pt-1 sm:flex-row">
        <button
          onClick={() => router.back()}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-light-100 transition-all hover:border-white/35 hover:bg-white/10 sm:w-auto"
        >
          Go Back
        </button>
        <button
          onClick={handleStartInterview}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-primary-200 to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_rgba(124,111,255,0.85)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Starting...
            </span>
          ) : (
            "Start Interview"
          )}
        </button>
      </section>
    </div>
  );
};

export default InterviewQuestions;
