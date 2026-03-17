import React from 'react';
import { Box, Typography, Stack, Link, Chip, Paper } from '@mui/material';
import {
  LocationOnOutlined as LocationIcon,
  InfoOutlined as InfoIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import { Fridge } from 'types/domain';
import { SoftWrap } from 'components/ui';
import { designColor } from 'theme/palette';

interface DetailRowProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

function DetailRow({ icon, title, content }: DetailRowProps) {
  if (!content) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'flex-start',
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          color: 'primary.main',
          mt: 0.5,
          p: 1.5,
          backgroundColor: 'secondary.main',
          borderRadius: '50%',
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, pt: 1 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'text.secondary',
            fontWeight: 700,
            mb: 0.5,
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
}

export function FridgeDetailsTab({
  fridge,
}: {
  fridge: Fridge;
}): React.ReactElement {
  const address = `${fridge.location.street}, ${fridge.location.city}, ${fridge.location.state} ${fridge.location.zip}`;

  const renderInstagram = () => {
    if (!fridge.maintainer?.instagram) return null;
    const match =
      /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/([\w.]+)/gim.exec(
        fridge.maintainer.instagram
      );
    const handle = match ? match[1] : fridge.maintainer.instagram;
    return (
      <Link
        href={`https://instagram.com/${handle}`}
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{ color: 'primary.main', fontWeight: 600 }}
      >
        @{handle}
      </Link>
    );
  };

  const renderWebsite = () => {
    if (!fridge.maintainer?.website) return null;
    return (
      <Link
        href={fridge.maintainer.website}
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{ color: 'primary.main', fontWeight: 600, wordBreak: 'break-all' }}
      >
        {fridge.maintainer.website.replace(/^https?:\/\//, '')}
      </Link>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 6,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: designColor.white,
      }}
    >
      {fridge.tags && fridge.tags.length > 0 && (
        <Box
          sx={{
            pb: 3,
            mb: 3,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {fridge.tags.map((tag) => (
            <Chip
              key={tag}
              label={`#${tag}`}
              size="medium"
              sx={{
                fontWeight: 700,
                backgroundColor: 'secondary.main',
                color: 'primary.main',
                borderRadius: 2,
              }}
            />
          ))}
        </Box>
      )}

      <Stack spacing={0}>
        <DetailRow
          icon={<LocationIcon fontSize="medium" />}
          title="Address"
          content={<SoftWrap text={address} />}
        />

        <DetailRow
          icon={<InfoIcon fontSize="medium" />}
          title="About this fridge"
          content={
            <SoftWrap
              text={fridge.notes || 'No additional information provided.'}
            />
          }
        />

        {(fridge.maintainer?.instagram || fridge.maintainer?.website) && (
          <DetailRow
            icon={<InstagramIcon fontSize="medium" />}
            title="Maintainer Links"
            content={
              <Stack spacing={1.5}>
                {renderInstagram()}
                {renderWebsite()}
              </Stack>
            }
          />
        )}
      </Stack>
    </Paper>
  );
}
