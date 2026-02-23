'use client';

import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';

interface ImpactPanelProps {
  data: ImpactAnalysis;
}

const ImpactPanel: React.FC<ImpactPanelProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
           <Zap size={20} />
        </div>
        <div>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white">Impact Analysis</h3>
           <p className="text-sm text-gray-500">Score: {data.impact_score}/100</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.weak_bullets.map((bullet, idx) => (
          <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-3">&quot;{bullet}&quot;</p>
                <div className="flex flex-wrap gap-2">
                  {data.issues.map((issue, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded font-medium">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {data.weak_bullets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
             <p>No weak bullets detected. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactPanel;
