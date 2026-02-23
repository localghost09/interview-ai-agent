'use client';

import dynamic from 'next/dynamic';

const ResumeAnalyzer = dynamic(() => import('@/components/resume/ResumeAnalyzer'), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading Resume Analyzer...</div>
    </div>
  ),
});

export default function ResumeAnalyzerLoader() {
  return <ResumeAnalyzer />;
}
