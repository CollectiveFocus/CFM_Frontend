'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { ButtonLink } from '../ButtonLink/ButtonLink';

interface ParagraphCardProps {
  variant: 'h2' | 'h3';
  img: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  text: string;
  link: string;
}

export function ParagraphCard({
  variant,
  img,
  title,
  text,
  link,
}: ParagraphCardProps): React.ReactElement {
  if (variant === 'h2') {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          textAlign: { xs: 'center', md: 'left' },
          backgroundColor: 'white',
          boxShadow: 0,
        }}
      >
        <CardContent sx={{ display: { xs: 'block', md: 'none' }, p: 0 }}>
          <Typography variant="h2">{title}</Typography>
        </CardContent>

        <Box sx={{ width: 'clamp(300px, 100%, 400px)' }}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <CardContent
          sx={{
            flex: { md: 1.5 },
            ml: { xs: 0, md: 6 },
            p: 0,
          }}
        >
          <Typography
            variant="h2"
            sx={{ display: { xs: 'none', md: 'block' }, pb: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <ButtonLink
            to={link}
            variant="outlined"
            aria-label={title}
            sx={{ width: '100%', maxWidth: '345px', mt: 4 }}
            title={'LEARN MORE'}
          />
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          backgroundColor: 'white',
          boxShadow: 0,
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          style={{ width: '100%', height: 'auto' }}
        />

        <CardContent sx={{ py: { xs: 2, md: 4 } }}>
          <Typography variant="h3" pb={1}>
            {title}
          </Typography>
          <Typography variant="body1">{text}</Typography>
        </CardContent>

        <CardActions>
          <ButtonLink
            to={link}
            variant="outlined"
            aria-label={title}
            sx={{
              width: '100%',
              maxWidth: '345px',
              mx: 'auto',
            }}
            title={'LEARN MORE'}
          />
        </CardActions>
      </Card>
    );
  }
}
