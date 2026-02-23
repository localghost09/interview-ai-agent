'use client';

import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-4 pb-4 md:pt-6 md:pb-6 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />

      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
        Resume Optimization <br /> for the AI Era
      </h1>

      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
        Stop guessing with ATS systems. Get instant, AI-driven feedback to parse, match, and optimize your resume for your dream job.
      </p>
    </div>
  );
};

export default Hero;
