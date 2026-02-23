'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import {
  Zap, Clock, MessageCircle, Pause,
  CheckCircle, AlertTriangle, ArrowRight,
} from 'lucide-react';

interface SpeechDashboardProps {
  data: SpeechAnalysisResponse;
}

/** Reusable radial gauge matching the existing ScoreGauge pattern. */
function ScoreGauge({ score, label }: { score: number; label: string }) {
  const getColor = (val: number) => {
    if (val >= 75) return '#22c55e';
    if (val >= 50) return '#eab308';
    return '#ef4444';
  };

  const chartData = [{ name: label, value: score, fill: getColor(score) }];

  return (
    <div className="relative w-full h-52 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          barSize={18}
          data={chartData}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-2 text-center">
        <span className="text-4xl font-bold text-gray-900 dark:text-white block">{score}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</span>
      </div>
    </div>
  );
}

/** Stat card for numeric metrics. */
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

/** Highlights filler words in the transcript with colored badges. */
function HighlightedTranscript({ transcript, fillers }: { transcript: string; fillers: SpeechFiller[] }) {
  const singleFillers = new Set<string>();
  const multiFillers: string[] = [];

  for (const f of fillers) {
    const cleaned = f.word.toLowerCase().replace(/[.,!?]/g, '');
    if (cleaned.includes(' ')) {
      if (!multiFillers.includes(cleaned)) multiFillers.push(cleaned);
    } else {
      singleFillers.add(cleaned);
    }
  }

  const words = transcript.split(/(\s+)/);

  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < words.length) {
    // Check for multi-word filler matches first
    let matched = false;
    for (const mf of multiFillers) {
      const parts = mf.split(' ');
      const slice: string[] = [];
      let j = i;
      for (const part of parts) {
        // Skip whitespace tokens
        while (j < words.length && words[j].trim() === '') j++;
        if (j < words.length && words[j].toLowerCase().replace(/[.,!?]/g, '') === part) {
          slice.push(words[j]);
          j++;
        } else {
          break;
        }
      }
      if (slice.length === parts.length) {
        // Collect whitespace between matched words
        const fullSlice: string[] = [];
        for (let k = i; k < j; k++) fullSlice.push(words[k]);
        result.push(
          <span
            key={i}
            className="inline-block bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded text-xs font-medium mx-0.5"
          >
            {fullSlice.join('')}
          </span>
        );
        i = j;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const word = words[i];
      const cleaned = word.toLowerCase().replace(/[.,!?]/g, '');
      if (cleaned && singleFillers.has(cleaned)) {
        result.push(
          <span
            key={i}
            className="inline-block bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded text-xs font-medium mx-0.5"
          >
            {word}
          </span>
        );
      } else {
        result.push(<span key={i}>{word}</span>);
      }
      i++;
    }
  }

  return (
    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      {result}
    </p>
  );
}

/**
 * Displays the full speech analysis results including confidence/clarity
 * gauges, stats grid, coaching feedback lists, and an annotated transcript.
 */
const SpeechDashboard: React.FC<SpeechDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Row 1: Score Gauges + Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Confidence Score */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
        >
          <h3 className="text-center font-bold text-gray-900 dark:text-white mb-2">Confidence Score</h3>
          <ScoreGauge score={data.confidenceScore} label="Confidence" />
          <p className="text-center text-sm text-gray-500 mt-2">
            {data.confidenceScore >= 70
              ? 'Your voice projected strong confidence throughout.'
              : data.confidenceScore >= 40
                ? 'Your confidence was moderate — try speaking more steadily.'
                : 'Low confidence detected — practice projecting your voice.'}
          </p>
        </motion.div>

        {/* Clarity Score */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
        >
          <h3 className="text-center font-bold text-gray-900 dark:text-white mb-2">Clarity Score</h3>
          <ScoreGauge score={data.clarityScore} label="Clarity" />
          <p className="text-center text-sm text-gray-500 mt-2">
            {data.clarityScore >= 75
              ? 'Excellent clarity — your speech was well-articulated.'
              : data.clarityScore >= 50
                ? 'Decent clarity — some areas could be more precise.'
                : 'Clarity needs work — focus on structure and articulation.'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <StatCard icon={Zap} label="Words per Minute" value={data.wpm} color="bg-blue-500" />
          <StatCard icon={MessageCircle} label="Filler Words" value={data.fillerCount} color="bg-amber-500" />
          <StatCard icon={Pause} label="Hesitation Pauses" value={data.hesitationCount} color="bg-purple-500" />
          <StatCard icon={Clock} label="Duration" value={`${data.durationSeconds.toFixed(0)}s`} color="bg-indigo-500" />
        </motion.div>
      </div>

      {/* Row 2: Strengths, Weaknesses, Actionable Steps */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Strengths */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {data.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {data.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Actionable Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-500" />
            Action Steps
          </h3>
          <ol className="space-y-3">
            {data.actionableSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>

      {/* Row 3: Transcript */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
      >
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Transcript</h3>
        <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {data.transcript ? (
            <HighlightedTranscript transcript={data.transcript} fillers={data.fillers} />
          ) : (
            <p className="text-sm text-gray-400 italic">No transcript available.</p>
          )}
        </div>
        {data.fillerCount > 0 && (
          <p className="mt-3 text-xs text-gray-400">
            Filler words are highlighted in amber. {data.fillerCount} filler word{data.fillerCount !== 1 ? 's' : ''} detected.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SpeechDashboard;
