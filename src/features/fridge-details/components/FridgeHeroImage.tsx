import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

interface FridgeHeroImageProps {
  src?: string | null;
  alt: string;
}

export function FridgeHeroImage({
  src,
  alt,
}: FridgeHeroImageProps): React.ReactElement {
  return (
    <Box
      sx={{
        position: 'relative',
        // On mobile, wide banner. On desktop, a beautiful 4:3 rounded rectangle matching the column width.
        aspectRatio: { xs: '16/10', md: '4/3' },
        borderRadius: { xs: 0, md: 4 },
        overflow: 'hidden',
        backgroundColor: '#f3f4f6', // Very soft tailwind gray-100
        mx: { xs: -2, sm: -4, md: 0 }, // Pull out to screen edges on mobile
        // Apply responsive width using responsive syntax without duplicate keys
        width: { xs: 'calc(100% + 32px)', sm: 'calc(100% + 64px)', md: '100%' },
        mb: { xs: 3, md: 4 },
      }}
    >
      {!src ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{ position: 'relative', width: 48, height: 48, opacity: 0.1 }}
          >
            <Image
              src="/feedback/happyFridge.svg"
              alt="placeholder"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      )}
    </Box>
  );
}
