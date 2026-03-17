'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from '@mui/material';
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
    <Card
      sx={{
        width: { xs: '9em', sm: '10em' },
        height: '10em',
        backgroundColor: 'secondary.main',
      }}
    >
      <CardActionArea
        component={NextLink}
        href={link}
        aria-label={title}
        sx={{
          width: 'inherit',
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          image={img.src}
          alt={img.alt}
          sx={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h5" textAlign="center" pt={2}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
