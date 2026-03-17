import React from 'react';
import Image from 'next/image';
import { Box, Typography, Avatar, Stack, Paper } from '@mui/material';
import {
  ChatBubbleOutline as CommentIcon,
  FavoriteBorder as LikeIcon,
  MoreHoriz as MoreIcon,
} from '@mui/icons-material';

import { FridgeReport, Fridge } from 'types/domain';
import { ButtonLink } from 'components/ui';
import { pinColor, applyAlpha, designColor } from 'theme/palette';
import {
  MapLegendPinLocationIcon,
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinGhostIcon,
} from 'theme/icons';

// Map status to app's icon and color system
function getStatusDetails(condition: string) {
  switch (condition) {
    case 'dirty':
      return {
        text: 'Needs cleaning',
        color: pinColor.fridgeOperation,
        Icon: MapLegendConditionDirtyIcon,
      };
    case 'out of order':
      return {
        text: 'Needs repairs',
        color: pinColor.fridgeOperation,
        Icon: MapLegendConditionOutOfOrderIcon,
      };
    case 'not at location':
      return {
        text: 'Not found',
        color: pinColor.fridgeNotAtLocation,
        Icon: MapLegendPinNotAtLocationIcon,
      };
    case 'ghost':
      return {
        text: 'Ghost Fridge',
        color: pinColor.fridgeGhost,
        Icon: MapLegendPinGhostIcon,
      };
    case 'good':
    default:
      return {
        text: 'Looks good',
        color: designColor.blue.dark,
        Icon: MapLegendPinLocationIcon,
      };
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

function ActivityCard({ report }: { report: FridgeReport }) {
  const status = getStatusDetails(report.condition);

  const foodLevels = ['Empty', 'Few Items', 'Many Items', 'Full'];
  const foodColors = [
    pinColor.itemsEmpty,
    pinColor.itemsFew,
    pinColor.itemsMany,
    pinColor.itemsFull,
  ];

  const foodText = foodLevels[report.foodPercentage] || 'Unknown';
  const foodColor = foodColors[report.foodPercentage] || foodColors[0];

  // Create a slight border for empty/white so it doesn't vanish
  const foodBorder =
    report.foodPercentage === 0
      ? '1px solid rgba(0,0,0,0.1)'
      : `1px solid ${applyAlpha('20', foodColor)}`;

  return (
    <Paper
      elevation={0}
      sx={{
        py: 4,
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        backgroundColor: 'transparent',
      }}
    >
      {/* User Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            color: 'primary.main',
            mr: 2,
            width: 44,
            height: 44,
            fontWeight: 700,
          }}
        >
          U
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}
            >
              Community Member
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              {formatRelativeTime(report.timestamp)}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Updated fridge status
          </Typography>
        </Box>
      </Box>

      {/* App-Themed Report Badges */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ mb: 3, flexWrap: 'wrap', gap: 1.5 }}
      >
        {/* Status Badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.75,
            borderRadius: 16,
            backgroundColor: applyAlpha('10', status.color),
            border: `1px solid ${applyAlpha('20', status.color)}`,
          }}
        >
          <status.Icon sx={{ fontSize: 18, color: status.color }} />
          <Typography
            variant="caption"
            sx={{
              color: status.color,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {status.text}
          </Typography>
        </Box>

        {/* Food Badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.75,
            borderRadius: 16,
            backgroundColor: applyAlpha('10', foodColor),
            border: foodBorder,
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: foodColor,
              boxShadow:
                report.foodPercentage === 0
                  ? 'inset 0 0 0 1px rgba(0,0,0,0.2)'
                  : 'none',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'text.primary',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {foodText}
          </Typography>
        </Box>
      </Stack>

      {/* Report Notes */}
      {report.notes && (
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            color: 'text.primary',
            fontSize: '1.05rem',
          }}
        >
          {report.notes}
        </Typography>
      )}

      {/* App-Themed Image Container */}
      {report.photoUrl && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 240, sm: 300, md: 360 },
            borderRadius: 4,
            overflow: 'hidden',
            mb: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Image
            src={report.photoUrl}
            alt="Report attachment"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )}

      {/* Post Actions */}
      <Box sx={{ display: 'flex', gap: 4, color: 'text.secondary', mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s',
          }}
        >
          <LikeIcon fontSize="small" />
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, fontSize: '0.85rem' }}
          >
            Like
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s',
          }}
        >
          <CommentIcon fontSize="small" />
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, fontSize: '0.85rem' }}
          >
            Comment
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <MoreIcon
          sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
        />
      </Box>
    </Paper>
  );
}

export function FridgeActivityTab({
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
        boxShadow: '0 4px 14px rgba(21, 67, 212, 0.25)',
        '&:hover': { boxShadow: '0 6px 20px rgba(21, 67, 212, 0.35)' },
      }}
    />
  );

  if (!reports || reports.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          px: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'text.primary',
            mb: 1,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          No updates yet
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4, maxWidth: 300, mx: 'auto' }}
        >
          Be the first to share the status of this fridge with the community!
        </Typography>
        <UpdateButton />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <UpdateButton />
      </Box>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        {reports.map((report, idx) => (
          <ActivityCard key={`${report.timestamp}-${idx}`} report={report} />
        ))}
      </Box>
    </Box>
  );
}
