'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PageFooter } from '../PageFooter/PageFooter';

export function FooterWrapper(): React.ReactElement | null {
  const pathname = usePathname();

  // Other pages should all display it globally.
  if (
    !pathname ||
    pathname === '/browse' ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/fridge/') ||
    pathname.endsWith('/notifications')
  ) {
    return null;
  }

  return <PageFooter />;
}
