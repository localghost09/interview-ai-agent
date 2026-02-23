'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const steps = [
  "Extracting keywords...",
  "Evaluating semantic match...",
  "Analyzing bullet point impact...",
  "Generating smart improvements..."
];

const LoadingState: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
         <motion.div
           className="absolute inset-0 border-4 border-blue-100 dark:border-blue-900 rounded-full"
         />
         <motion.div
           className="absolute inset-0 border-4 border-t-blue-600 dark:border-t-blue-400 rounded-full"
           animate={{ rotate: 360 }}
           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
         />
         <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">AI</span>
         </div>
      </div>

      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Optimizing Resume</h3>

      <div className="space-y-4 text-left">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: index <= currentStep ? 1 : 0.4, x: 0 }}
            className="flex items-center gap-3"
          >
            {index < currentStep ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : index === currentStep ? (
              <Loader2 className="animate-spin text-blue-500" size={20} />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-700" />
            )}
            <span className={index === currentStep ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-600 dark:text-gray-400"}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
