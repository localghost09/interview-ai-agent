'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Keep coding interview fully focused like coding platforms.
  if (pathname.startsWith('/coding-interview')) {
    return null;
  }

  return <Footer />;
}
