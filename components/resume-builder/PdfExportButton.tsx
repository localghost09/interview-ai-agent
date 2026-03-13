'use client';

import { Download } from 'lucide-react';
import { exportResumeToPdf } from '@/lib/resume-builder/pdf-export';
import { toast } from 'sonner';
import type { LivePreviewHandle } from './LivePreview';

interface PdfExportButtonProps {
  previewRef: React.RefObject<LivePreviewHandle | null>;
  fileName: string;
}

export default function PdfExportButton({ previewRef, fileName }: PdfExportButtonProps) {
  const handleExport = () => {
    const element = previewRef.current?.getElement();
    if (!element) {
      toast.error('Preview not ready. Please wait and try again.');
      return;
    }

    try {
      const safeName = fileName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Resume';
      exportResumeToPdf(element, safeName);
      toast.success('Print dialog opened — choose "Save as PDF" to download.');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error(
        error instanceof Error && error.message.includes('Popup')
          ? 'Please allow popups for this site and try again.'
          : 'Failed to generate PDF. Please try again.'
      );
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gradient-to-r from-primary-200 to-[#a78bfa] text-dark-100 hover:opacity-90 disabled:opacity-50"
    >
      <Download className="w-4 h-4" />
      Download PDF
    </button>
  );
}
