'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function ConditionalRootContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Coding interview pages should be edge-to-edge with no root-layout spacing.
  if (pathname.startsWith('/coding-interview')) {
    return <>{children}</>;
  }

  return <div className="root-layout flex-1">{children}</div>;
}
