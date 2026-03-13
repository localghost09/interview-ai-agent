'use client';

import { useState } from 'react';
import { MoreVertical, Edit3, Copy, Trash2, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteResume, duplicateResume } from '@/lib/actions/resume-builder.action';
import { exportResumeToPdf } from '@/lib/resume-builder/pdf-export';
import { getTemplate } from '@/lib/resume-builder/template-registry';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ResumeCardProps {
  resume: ResumeDocument;
  onDeleted: () => void;
  onDuplicated: () => void;
}

export default function ResumeCard({ resume, onDeleted, onDuplicated }: ResumeCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const templateEntry = getTemplate(resume.templateId);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    setIsDeleting(true);
    try {
      const result = await deleteResume({ resumeId: resume.id, userId: resume.userId });
      if (result.success) {
        toast.success('Resume deleted');
        onDeleted();
      } else {
        toast.error(result.message || 'Failed to delete');
      }
    } catch {
      toast.error('Failed to delete resume');
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    try {
      const result = await duplicateResume(resume.id, resume.userId);
      if (result.success) {
        toast.success('Resume duplicated');
        onDuplicated();
      } else {
        toast.error(result.message || 'Failed to duplicate');
      }
    } catch {
      toast.error('Failed to duplicate resume');
    } finally {
      setIsDuplicating(false);
      setShowMenu(false);
    }
  };

  return (
    <div className="interview-glass group relative overflow-hidden">
      {/* Template preview area */}
      <Link href={`/resume-builder/${resume.id}/edit`}>
        <div className="h-48 bg-white rounded-t-lg overflow-hidden relative cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: templateEntry?.previewColors?.[0] || '#cac5fe' }}
              />
              <p className="text-xs text-gray-500">{templateEntry?.name || 'Template'}</p>
              <p className="text-[10px] text-gray-400 capitalize">{templateEntry?.category}</p>
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary-200/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 bg-primary-200 text-dark-100 text-sm font-medium rounded-lg">
              Edit Resume
            </span>
          </div>
        </div>
      </Link>

      {/* Info section */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{resume.title}</h3>
            <p className="text-xs text-light-600 mt-0.5">
              {templateEntry?.name} &middot; Updated {dayjs(resume.updatedAt).fromNow()}
            </p>
          </div>

          {/* Actions menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 text-light-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-8 z-50 w-44 bg-dark-200 rounded-lg border border-gray-700 shadow-xl py-1">
                  <Link
                    href={`/resume-builder/${resume.id}/edit`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-light-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDuplicate}
                    disabled={isDuplicating}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-light-400 hover:text-white hover:bg-gray-700 transition-colors w-full"
                  >
                    {isDuplicating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Copy className="w-3.5 h-3.5" />}
                    Duplicate
                  </button>
                  <hr className="my-1 border-gray-700" />
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-destructive-100 hover:bg-gray-700 transition-colors w-full"
                  >
                    {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
