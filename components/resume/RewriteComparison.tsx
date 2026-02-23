'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RewriteComparisonProps {
  rewrites: Rewrite[];
}

const RewriteComparison: React.FC<RewriteComparisonProps> = ({ rewrites }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Suggested Improvements</h3>

      {rewrites.map((item, idx) => (
        <div key={idx} className="grid md:grid-cols-2 gap-4 md:gap-8 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">

          {/* Arrow indicator on desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-200 dark:border-gray-700 z-10 shadow-sm">
            <ArrowRight size={14} className="text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-red-500 uppercase tracking-wide">Original</div>
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 text-gray-800 dark:text-gray-200 text-sm">
              {item.original}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-green-500 uppercase tracking-wide">AI Rewritten</div>
            <div className="p-4 rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10 text-gray-800 dark:text-gray-200 text-sm">
              {item.improved}
            </div>
            <p className="text-xs text-gray-500 italic mt-2">
              <span className="font-semibold not-italic">Why:</span> {item.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default RewriteComparison;
