'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Something went wrong
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', mb: 4, maxWidth: 500 }}
      >
        We encountered an error while trying to load this fridge's information.
      </Typography>
      <Button
        onClick={() => reset()}
        variant="contained"
        sx={{ borderRadius: 24, px: 4, py: 1.5, fontWeight: 700 }}
      >
        Try Again
      </Button>
    </Box>
  );
}
