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
