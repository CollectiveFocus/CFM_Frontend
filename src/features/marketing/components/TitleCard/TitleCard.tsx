'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
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
        textDecoration: 'none',
        width: '100%',
        maxWidth: 240,
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          '& .icon-container': {
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            borderColor: 'primary.main',
          },
          '& .title-text': {
            color: 'primary.main',
          },
        },
      }}
    >
      <Box
        className="icon-container"
        sx={{
          width: { xs: 120, md: 150 },
          height: { xs: 120, md: 150 },
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          transition: 'all 0.2s ease',
          p: 3,
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={80}
          height={80}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>
      <Typography
        className="title-text"
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          color: 'text.primary',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
