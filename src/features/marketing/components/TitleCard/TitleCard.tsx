'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NextLink } from 'components/ui';

interface TitleCardProps {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  link: string;
}

export function TitleCard({
  img,
  title,
  link,
}: TitleCardProps): React.ReactElement {
  return (
    <Box
      component={NextLink}
      href={link}
      aria-label={title}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        width: '100%',
        maxWidth: 280,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        backgroundColor: 'transparent',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.02)',
          '& .title-text': {
            color: 'primary.main',
          },
          '& .arrow-icon': {
            color: 'primary.main',
            transform: 'translateX(6px)',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: { xs: 100, md: 120 },
          mb: 3,
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={120}
          height={120}
          style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
        }}
      >
        <Typography
          className="title-text"
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            color: 'text.primary',
            letterSpacing: '-0.02em',
            transition: 'color 0.2s ease',
            lineHeight: 1.3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </Typography>
        <ArrowForwardIcon
          className="arrow-icon"
          sx={{
            color: 'text.secondary',
            transition: 'all 0.2s ease',
            fontSize: '1.6rem',
            strokeWidth: 2,
          }}
        />
      </Box>
    </Box>
  );
}
