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
          p: { xs: 3, md: 5 },
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent sx={{ display: { xs: 'block', md: 'none' }, p: 0, pb: 2 }}>
          <Typography variant="h2">{title}</Typography>
        </CardContent>

        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </Box>

        <CardContent
          sx={{
            flex: { md: 1.5 },
            ml: { xs: 0, md: 6 },
            mt: { xs: 3, md: 0 },
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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, md: 4 },
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ flexShrink: 0, textAlign: 'center', mb: 2 }}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            style={{
              width: '100%',
              maxWidth: '200px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        <CardContent sx={{ py: 2, px: 0, flexGrow: 1 }}>
          <Typography variant="h3" pb={2} fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {text}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 0, mt: 2 }}>
          <ButtonLink
            to={link}
            variant="outlined"
            aria-label={title}
            sx={{
              width: '100%',
              mt: 'auto',
            }}
            title={'LEARN MORE'}
          />
        </CardActions>
      </Card>
    );
  }
}
