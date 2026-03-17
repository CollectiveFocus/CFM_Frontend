import React from 'react';
import { Box, Skeleton, Stack, Container } from '@mui/material';

export function FridgeSkeleton() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: 12,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 5 } }}>
        {/* Back Link */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 8 }}
          alignItems="flex-start"
        >
          {/* Left Column Skeleton */}
          <Box sx={{ width: { xs: '100%', md: '45%' } }}>
            {/* Hero Image */}
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{
                aspectRatio: { xs: '16/10', md: '4/3' },
                borderRadius: { xs: 0, md: 4 },
                mx: { xs: -2, sm: -4, md: 0 },
                width: {
                  xs: 'calc(100% + 32px)',
                  sm: 'calc(100% + 64px)',
                  md: '100%',
                },
                mb: { xs: 3, md: 4 },
              }}
            />

            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Skeleton variant="text" width="80%" height={60} />
              <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="text" width={120} height={24} />
              </Box>
            </Box>

            {/* Buttons */}
            <Stack direction="row" spacing={1.5} sx={{ mb: 5 }}>
              <Skeleton
                variant="rounded"
                sx={{ flex: 1, height: 48, borderRadius: 3 }}
              />
              <Skeleton
                variant="rounded"
                sx={{ flex: 1, height: 48, borderRadius: 3 }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: 48, height: 48, borderRadius: 3 }}
              />
            </Stack>

            {/* Details */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
            >
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="90%" height={24} />
            </Box>
          </Box>

          {/* Right Column Skeleton (Feed) */}
          <Box
            sx={{
              width: { xs: '100%', md: '55%' },
              mt: { xs: 8, md: 0 },
              pl: { md: 4 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 4,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Skeleton variant="text" width={120} height={40} />
              <Skeleton
                variant="rounded"
                width={120}
                height={36}
                sx={{ borderRadius: 24 }}
              />
            </Box>

            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton
                    variant="text"
                    width={150}
                    height={24}
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={80}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ borderRadius: 3 }}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
