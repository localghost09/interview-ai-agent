'use client';

import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const getColor = (val: number) => {
    if (val >= 75) return '#22c55e'; // green-500
    if (val >= 50) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const data = [{ name: 'Score', value: score, fill: getColor(score) }];

  return (
    <div className="relative w-full h-64 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1 mt-4 text-center">
        <span className="text-5xl font-bold text-gray-900 dark:text-white block">{score}</span>
        <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Match Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
