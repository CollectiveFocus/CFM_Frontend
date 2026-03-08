'use client';

import React from 'react';
import { Button } from '@mui/material';
import { MobileScreenShareOutlined as MobileScreenShareOutlinedIcon } from '@mui/icons-material';

interface ShareButtonProps {
  fridgeName: string;
}

export function ShareButton({
  fridgeName,
}: ShareButtonProps): React.ReactElement {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: fridgeName,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  return (
    <Button
      aria-label="Click to share this page"
      variant="outlined"
      sx={{ width: '47%' }}
      onClick={handleShare}
    >
      <MobileScreenShareOutlinedIcon sx={{ pr: 1 }} />
      Share
    </Button>
  );
}
