'use client';

import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { ButtonLink } from '../ButtonLink/ButtonLink';

interface PageHeroProps {
  img: {
    src: string;
    alt: string;
  };
  button?: {
    to: string | object;
    'aria-label': string;
    title: string;
    variant?: 'outlined' | 'contained';
  };
}

export function PageHero({ img, button }: PageHeroProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: '50vh', md: '450px' },
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        priority
        fill
        style={{ objectFit: 'cover' }}
        alt={img.alt}
        src={img.src}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
          zIndex: 0,
        }}
      />
      {button && (
        <ButtonLink
          variant={button.variant || 'contained'}
          to={button.to}
          aria-label={button['aria-label']}
          sx={{
            minWidth: { xs: '90vw', md: '500px' },
            fontVariant: 'small-caps',
            boxShadow: 8,
            position: 'relative',
            zIndex: 1,
          }}
          title={button.title}
        />
      )}
    </Box>
  );
}
