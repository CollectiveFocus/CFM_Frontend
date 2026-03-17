import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ButtonLink } from 'components/ui';

export default function NotFound() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        py: 8,
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Image
          src="/card/paragraph/pearTomatoAndFridge.svg"
          alt="Pear and tomato dancing with a fridge"
          width={250}
          height={190}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Typography
        variant="h1"
        color="primary.main"
        sx={{ mb: 2, fontSize: { xs: '3rem', md: '4rem' } }}
      >
        404
      </Typography>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 6, maxWidth: 500 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <ButtonLink
        to="/"
        title="BACK TO HOME"
        aria-label="Return to the home page"
        variant="contained"
        sx={{ minWidth: 200 }}
      />
    </Box>
  );
}
