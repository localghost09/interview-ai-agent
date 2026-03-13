import { requireAuth } from '@/lib/auth';
import { createResume } from '@/lib/actions/resume-builder.action';
import { createEmptyResumeData } from '@/lib/resume-builder/default-data';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NewResumePage() {
  const user = await requireAuth();

  const result = await createResume({
    userId: user.uid,
    title: 'Untitled Resume',
    templateId: 'modern-01',
    data: createEmptyResumeData(),
  });

  if (result.success && result.resumeId) {
    redirect(`/resume-builder/${result.resumeId}/edit`);
  }

  redirect('/resume-builder');
}
