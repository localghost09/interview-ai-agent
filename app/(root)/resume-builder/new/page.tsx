import { requireAuth } from '@/lib/auth';
import { createResume } from '@/lib/actions/resume-builder.action';
import { createEmptyResumeData } from '@/lib/resume-builder/default-data';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type NewResumeSearchParams = {
  templateId?: string | string[];
};

interface NewResumePageProps {
  searchParams?: NewResumeSearchParams | Promise<NewResumeSearchParams>;
}

export default async function NewResumePage({ searchParams }: NewResumePageProps) {
  const user = await requireAuth();

  const resolvedSearchParams = await Promise.resolve(searchParams);

  const templateParam = Array.isArray(resolvedSearchParams?.templateId)
    ? resolvedSearchParams?.templateId[0]
    : resolvedSearchParams?.templateId;
  const selectedTemplateId = templateParam?.trim() ? templateParam.trim() : 'modern-01';

  const result = await createResume({
    userId: user.uid,
    title: 'Untitled Resume',
    templateId: selectedTemplateId,
    data: createEmptyResumeData(),
  });

  if (result.success && result.resumeId) {
    redirect(`/resume-builder/${result.resumeId}/edit`);
  }

  redirect('/resume-builder');
}
