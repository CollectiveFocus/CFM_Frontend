'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { designColor } from 'theme/palette';

interface PageScrollProps {
  display: boolean;
}

function PageScroll({ display }: PageScrollProps): React.ReactElement | null {
  if (!display) return null;

  return (
    <a
      href="#"
      title="Top of page"
      style={{
        position: 'fixed',
        right: '1rem',
        bottom: '3rem',
        width: '2.8rem',
        height: '2.8rem',
        borderRadius: '50%',
        background:
          '#88B3FF url(\'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" height="3rem"  width="3rem" viewBox="0 0 24 24" fill="%23222"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/></svg>\') center no-repeat',
        boxShadow: '0 0.25rem 0.5rem 0 #222',
        opacity: 0.6,
      }}
    />
  );
}

interface PageFooterProps {
  scrollButton?: boolean;
}

export function PageFooter({
  scrollButton = true,
}: PageFooterProps): React.ReactElement {
  const sxFooter = {
    padding: { xs: 3, md: 4 },
    backgroundColor: '#1E232B',
    color: '#9ba1a6',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 1,
    borderTop: '1px solid rgba(255,255,255,0.1)',
  };

  return (
    <Box component="footer" sx={sxFooter}>
      <PageScroll display={scrollButton} />
      <Typography variant="body2" sx={{ fontWeight: 500, color: '#e8eaed' }}>
        &copy; 2022-2025 Fridge Finder. All rights reserved.
      </Typography>
      <Typography variant="caption" sx={{ maxWidth: 600 }}>
        We may use cookies for storing information to help provide you with a
        better, faster, and safer experience and for SEO purposes.
      </Typography>
    </Box>
  );
}
