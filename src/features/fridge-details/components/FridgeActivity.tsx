import React from 'react';
import Image from 'next/image';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import {
  ChatBubbleOutline as CommentIcon,
  FavoriteBorder as LikeIcon,
} from '@mui/icons-material';

import { FridgeReport, Fridge } from 'types/domain';
import { ButtonLink } from 'components/ui';
import { pinColor } from 'theme/palette';

function getStatusDetails(condition: string) {
  switch (condition) {
    case 'dirty':
      return { text: 'Needs cleaning', color: pinColor.fridgeOperation };
    case 'out of order':
      return { text: 'Needs repairs', color: pinColor.fridgeOperation };
    case 'not at location':
      return { text: 'Not found', color: pinColor.fridgeNotAtLocation };
    case 'ghost':
      return { text: 'Ghost', color: pinColor.fridgeGhost };
    case 'good':
    default:
      return { text: 'Looks good', color: '#10b981' }; // green
  }
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function ActivityCard({
  report,
  isLast,
}: {
  report: FridgeReport;
  isLast: boolean;
}) {
  const status = getStatusDetails(report.condition);

  const foodLevels = ['Empty', 'Few Items', 'Many Items', 'Full'];
  const foodText = foodLevels[report.foodPercentage] || 'Unknown';

  return (
    <Box sx={{ display: 'flex', gap: 2.5 }}>
      {/* Left Column: Timeline Line & Avatar */}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            color: 'primary.main',
            width: 40,
            height: 40,
            fontWeight: 700,
          }}
        >
          U
        </Avatar>
        {!isLast && (
          <Box
            sx={{
              width: 2,
              flex: 1,
              bgcolor: 'divider',
              mt: 1,
              mb: 1,
              borderRadius: 1,
            }}
          />
        )}
      </Box>

      {/* Right Column: Post Content */}
      <Box sx={{ flex: 1, pb: 6 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.95rem' }}
          >
            Community Member
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            {formatRelativeTime(report.timestamp)}
          </Typography>
        </Box>

        {/* Inline Status Badges - Text Based, Minimal */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
        >
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: status.color,
              }}
            />
            {status.text}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'text.disabled',
              }}
            />
            {foodText}
          </Typography>
        </Stack>

        {/* Notes */}
        {report.notes && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              lineHeight: 1.6,
              color: 'text.primary',
              fontSize: '0.95rem',
            }}
          >
            {report.notes}
          </Typography>
        )}

        {/* Photo Grid style */}
        {report.photoUrl && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 200, sm: 260 },
              borderRadius: 3,
              overflow: 'hidden',
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Image
              src={report.photoUrl}
              alt="Report photo"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}

        {/* Action Row */}
        <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary', mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
              transition: 'color 0.2s',
            }}
          >
            <LikeIcon sx={{ fontSize: 18 }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, fontSize: '0.8rem' }}
            >
              Like
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
              transition: 'color 0.2s',
            }}
          >
            <CommentIcon sx={{ fontSize: 18 }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, fontSize: '0.8rem' }}
            >
              Reply
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function FridgeActivity({
  reports,
  fridge,
}: {
  reports: FridgeReport[];
  fridge: Fridge;
}) {
  const UpdateButton = () => (
    <ButtonLink
      variant="contained"
      to={`/fridge/${fridge.id}/report`}
      title="Add Update"
      aria-label="Add Update"
      sx={{
        boxShadow: 'none',
        borderRadius: 24,
        px: 3,
        py: 1,
        textTransform: 'none',
        fontWeight: 700,
        '&:hover': { boxShadow: '0 4px 12px rgba(21, 67, 212, 0.15)' },
      }}
    />
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Activity Header */}
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
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          Activity
        </Typography>
        <UpdateButton />
      </Box>

      {/* Feed Content */}
      {!reports || reports.length === 0 ? (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            No updates yet. Be the first to post!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {reports.map((report, idx) => (
            <ActivityCard
              key={`${report.timestamp}-${idx}`}
              report={report}
              isLast={idx === reports.length - 1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
