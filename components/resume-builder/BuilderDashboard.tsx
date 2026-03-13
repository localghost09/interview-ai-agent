'use client';

import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import Link from 'next/link';
import ResumeCard from './ResumeCard';
import { useRouter } from 'next/navigation';

interface BuilderDashboardProps {
  resumes: ResumeDocument[];
  userId: string;
}

export default function BuilderDashboard({ resumes, userId }: BuilderDashboardProps) {
  const router = useRouter();

  const handleChange = () => {
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Resume Builder</h1>
          <p className="text-light-400 mt-1">
            Create, edit, and download professional resumes
          </p>
        </div>
        <Link
          href="/resume-builder/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-200 to-[#a78bfa] text-dark-100 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Resume
        </Link>
      </div>

      {/* Resume grid */}
      {resumes.length === 0 ? (
        <div className="interview-glass flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-primary-200/10 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-primary-200" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">No resumes yet</h3>
          <p className="text-sm text-light-400 mb-6 text-center max-w-md">
            Create your first resume to get started. Choose from 48 professionally designed templates.
          </p>
          <Link
            href="/resume-builder/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-200 to-[#a78bfa] text-dark-100 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* Create new card */}
          <Link
            href="/resume-builder/new"
            className="interview-glass border-2 border-dashed border-gray-600 hover:border-primary-200/50 flex flex-col items-center justify-center py-16 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-primary-200/10 flex items-center justify-center mb-3 group-hover:bg-primary-200/20 transition-colors">
              <Plus className="w-6 h-6 text-primary-200" />
            </div>
            <span className="text-sm font-medium text-light-400 group-hover:text-white transition-colors">
              New Resume
            </span>
          </Link>

          {/* Existing resumes */}
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDeleted={handleChange}
              onDuplicated={handleChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
