import { redirect } from 'next/navigation';

// Keep creation unified through the existing interview setup flow.
export default function CodingInterviewEntryPage() {
  redirect('/interview?type=Coding');
}
