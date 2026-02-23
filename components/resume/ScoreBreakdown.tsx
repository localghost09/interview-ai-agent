'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBreakdownProps {
  data: AnalysisResult;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ data }) => {
  const metrics = [
    { label: 'Keyword Match', value: data.keyword_analysis.keyword_score, color: 'bg-blue-500' },
    { label: 'Semantic Match', value: data.semantic_analysis.semantic_score, color: 'bg-purple-500' },
    { label: 'Impact Strength', value: data.impact_analysis.impact_score, color: 'bg-green-500' },
    { label: 'Skills Alignment', value: data.skills_alignment, color: 'bg-orange-500' },
    { label: 'Experience', value: data.experience_alignment, color: 'bg-indigo-500' },
    { label: 'Formatting', value: data.format_compliance, color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm h-full">
      <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Detailed Breakdown</h3>
      <div className="space-y-5">
        {metrics.map((metric, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2 text-sm font-medium">
              <span className="text-gray-700 dark:text-gray-300">{metric.label}</span>
              <span className="text-gray-900 dark:text-white">{metric.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className={`h-full rounded-full ${metric.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
