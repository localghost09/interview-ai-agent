'use client';

import React from 'react';
import ScoreGauge from '@/components/resume/ScoreGauge';
import ScoreBreakdown from '@/components/resume/ScoreBreakdown';
import KeywordPanel from '@/components/resume/KeywordPanel';
import ImpactPanel from '@/components/resume/ImpactPanel';
import RewriteComparison from '@/components/resume/RewriteComparison';
import ProjectionPanel from '@/components/resume/ProjectionPanel';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface DashboardProps {
  data: AnalysisResult;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Input
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Results</h2>
      </div>

      {/* Top Row: Scores */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
        >
           <h3 className="text-center font-bold text-gray-900 dark:text-white mb-4">Overall ATS Score</h3>
           <ScoreGauge score={data.final_score} />
           <p className="text-center text-sm text-gray-500 mt-4 px-4">
             {data.semantic_analysis.explanation}
           </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <ScoreBreakdown data={data} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <ProjectionPanel currentScore={data.final_score} projectedScore={data.projected_score} />
        </motion.div>
      </div>

      {/* Middle Row: Detailed Panels */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <KeywordPanel data={data.keyword_analysis} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ImpactPanel data={data.impact_analysis} />
        </motion.div>
      </div>

      {/* Bottom: Rewrites */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <RewriteComparison rewrites={data.rewrites} />
      </motion.div>

    </div>
  );
};

export default Dashboard;
