import { Metadata } from 'next';
import { requireAuth } from '@/lib/auth';
import { getResume } from '@/lib/actions/resume-builder.action';
import { redirect } from 'next/navigation';
import ResumeEditor from '@/components/resume-builder/ResumeEditor';

export const metadata: Metadata = {
  title: 'Edit Resume | AI MockPrep',
  description: 'Edit your resume with real-time preview',
};

export const dynamic = 'force-dynamic';

export default async function EditResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth();
  const { id } = await params;

  const result = await getResume(id);

  if (!result.success || !result.resume) {
    redirect('/resume-builder');
  }

  if (result.resume.userId !== user.uid) {
    redirect('/resume-builder');
  }

  return <ResumeEditor resume={result.resume} />;
}
