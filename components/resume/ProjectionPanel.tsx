'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ProjectionPanelProps {
  currentScore: number;
  projectedScore: number;
}

const ProjectionPanel: React.FC<ProjectionPanelProps> = ({ currentScore, projectedScore }) => {
  const data = [
    { name: 'Current', score: currentScore },
    { name: 'Projected', score: projectedScore },
  ];

  const improvement = projectedScore - currentScore;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
       <div className="flex items-start justify-between mb-4">
         <div>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white">Score Projection</h3>
           <p className="text-sm text-gray-500">Potential Improvement</p>
         </div>
         <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm">
           <TrendingUp size={16} />
           +{improvement} pts
         </div>
       </div>

       <div className="h-48 w-full">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
             <YAxis hide domain={[0, 100]} />
             <Tooltip
               cursor={{ fill: 'transparent' }}
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
             />
             <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : '#22c55e'} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

export default ProjectionPanel;
