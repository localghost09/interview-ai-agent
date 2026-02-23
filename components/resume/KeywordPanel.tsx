'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Check, X, AlertTriangle } from 'lucide-react';

interface KeywordPanelProps {
  data: KeywordAnalysis;
}

const KeywordPanel: React.FC<KeywordPanelProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft' | 'tools'>('technical');

  const categories = {
    technical: data.categorized.technical || [],
    soft: data.categorized.soft || [],
    tools: data.categorized.tools || []
  };

  const getStatus = (keyword: string) => {
    if (data.matched.includes(keyword)) return 'matched';
    if (data.partial.includes(keyword)) return 'partial';
    return 'missing';
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Keyword Intelligence</h3>
        <span className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full font-medium">
          {data.matched.length} Matched
        </span>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-1">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors capitalize",
              activeTab === cat
                ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories[activeTab].map((keyword, idx) => {
          const status = getStatus(keyword);
          return (
            <div
              key={idx}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-1.5",
                status === 'matched' && "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
                status === 'partial' && "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
                status === 'missing' && "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
              )}
            >
              {status === 'matched' && <Check size={14} />}
              {status === 'partial' && <AlertTriangle size={14} />}
              {status === 'missing' && <X size={14} />}
              {keyword}
            </div>
          );
        })}
        {categories[activeTab].length === 0 && (
          <p className="text-gray-500 text-sm italic py-4">No keywords found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default KeywordPanel;
