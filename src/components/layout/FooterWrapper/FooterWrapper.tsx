'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PageFooter } from '../PageFooter/PageFooter';

export function FooterWrapper(): React.ReactElement | null {
  const pathname = usePathname();

  // The user specified that the map (browse) page should never have a footer.
  // Other pages should all display it globally.
  if (pathname === '/browse') {
    return null;
  }

  return <PageFooter />;
}
