'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageFooterProps {
  scrollButton?: boolean;
}

export function PageFooter({
  scrollButton = false,
}: PageFooterProps): React.ReactElement {
  const sxFooter = {
    py: 1.5,
    px: 2,
    backgroundColor: 'transparent',
    color: 'text.secondary',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    mt: 'auto',
  };

  return (
    <Box component="footer" sx={sxFooter}>
      <Typography
        sx={{
          fontSize: '0.7rem',
          opacity: 0.8,
          textAlign: 'center',
          lineHeight: 1.4,
          maxWidth: 800,
        }}
      >
        &copy; 2022-2025 Fridge Finder. All rights reserved. We may use cookies
        for storing information to help provide you with a better, faster, and
        safer experience and for SEO purposes.
      </Typography>
    </Box>
  );
}
