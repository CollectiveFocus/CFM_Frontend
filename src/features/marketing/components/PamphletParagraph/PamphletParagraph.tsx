'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Divider, Typography, SxProps, Theme } from '@mui/material';
import { ButtonLink } from 'components/ui';
import { SoftWrap } from 'components/ui';
import { applyAlpha, designColor } from 'theme/palette';

interface ResponsiveImageProps {
  src: string;
  alt?: string;
  attribution?: string | null;
}

function ResponsiveImage({
  src,
  alt = '',
  attribution = null,
}: ResponsiveImageProps): React.ReactElement | null {
  if (!src) {
    return null;
  }
  return (
    <Box sx={{ mt: 7, mb: 7 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 2',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        />
      </Box>
      {attribution && (
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            textAlign: 'right',
            color: 'text.secondary',
            mt: 1,
            fontSize: '1rem !important',
          }}
        >
          {'Photo: ' + attribution}
        </Typography>
      )}
    </Box>
  );
}

interface PamphletParagraphProps {
  title?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  img?: ResponsiveImageProps;
  body?: string[]; // Kept for backwards compatibility if needed elsewhere
  button?: {
    to: string | object;
    'aria-label': string;
    title: string;
    variant?: 'outlined' | 'contained';
  };
  hasDivider?: boolean;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

const sxParagraphMargin = {
  my: { xs: 6, md: 8 },
  mx: 'auto',
  px: { xs: 2, sm: 4, md: 6 },
  maxWidth: 800,
};

function DividerGrey(): React.ReactElement {
  return (
    <Divider sx={{ borderColor: applyAlpha('22', designColor.neroGray) }} />
  );
}

export function PamphletParagraph({
  title,
  variant = 'h2',
  img,
  body,
  button,
  hasDivider = false,
  sx = {},
  children,
}: PamphletParagraphProps): React.ReactElement {
  return (
    <Box sx={{ ...sxParagraphMargin, ...sx }}>
      {hasDivider && <DividerGrey />}

      {img && <ResponsiveImage {...img} />}

      {title && (
        <Typography
          sx={{ mb: 4, fontWeight: 800, letterSpacing: '-0.02em' }}
          variant={variant}
          color="text.primary"
        >
          <SoftWrap text={title} />
        </Typography>
      )}

      {children}

      {body &&
        body.map((val, index) => (
          <Typography
            variant="body1"
            sx={{ mb: 2, lineHeight: 1.7 }}
            key={`${index}_PamphletParagraph`}
          >
            {val}
          </Typography>
        ))}

      {button && (
        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            variant={button.variant || 'contained'}
            to={button.to}
            aria-label={button['aria-label']}
            title={button.title}
          />
        </Box>
      )}
    </Box>
  );
}
