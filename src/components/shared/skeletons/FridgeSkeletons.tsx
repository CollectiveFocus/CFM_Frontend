import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

export function FridgeCardSkeleton(): React.ReactElement {
  return (
    <Card sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
}

interface FridgeListSkeletonProps {
  count?: number;
}

export function FridgeListSkeleton({
  count = 3,
}: FridgeListSkeletonProps): React.ReactElement {
  return (
    <Box>
      {Array.from({ length: count }).map((_, i) => (
        <FridgeCardSkeleton key={i} />
      ))}
    </Box>
  );
}
