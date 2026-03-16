'use client';

import React from 'react';
import Image from 'next/image';
import AnchorLink from 'next/link';
import {
  Button,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CalendarMonth as CalendarMonthIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  DirectionsOutlined as DirectionsOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  Instagram as InstagramIcon,
  KitchenOutlined as KitchenIcon,
  Language as LanguageIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  MobileScreenShareOutlined as MobileScreenShareOutlinedIcon,
} from '@mui/icons-material';

import { ButtonLink, SoftWrap } from 'components/atoms';
import { applyAlpha, designColor } from 'theme/palette';
import { StatusIcon } from 'theme/icons';
import { Fridge, FridgeReport, Maintainer } from 'types/domain';

const enumCondition: Record<
  string,
  { text: string; color: 'success' | 'info' | 'error' | 'warning' }
> = {
  good: {
    text: 'Fridge is working properly',
    color: 'success',
  },
  dirty: {
    text: 'Fridge is dirty',
    color: 'info',
  },
  'out of order': {
    text: 'Fridge needs repairs',
    color: 'error',
  },
  'not at location': {
    text: 'Fridge is no longer at location',
    color: 'warning',
  },
  ghost: {
    text: 'Fridge is permanently unavailable',
    color: 'error',
  },
};

function BackToMapHeader(): React.ReactElement {
  return (
    <Box sx={{ width: '100%', position: 'relative', pt: 4 }}>
      <AnchorLink
        href="/browse"
        aria-label="Clicking returns to map view"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: applyAlpha('cc', designColor.neroGray),
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        <Typography sx={{ fontWeight: 500 }}>Back to map</Typography>
      </AnchorLink>
    </Box>
  );
}

function FridgeStatusIcon({
  condition,
}: {
  condition: string;
}): React.ReactElement {
  const cond = enumCondition[condition] || enumCondition.good;
  return (
    <StatusIcon
      color={cond.color}
      sx={{ mr: 3, fontSize: '20pt', verticalAlign: 'text-bottom' }}
    />
  );
}

function CaptionComponent({
  caption,
}: {
  caption?: string | null;
}): React.ReactElement | null {
  return caption ? (
    <Typography
      variant="body1"
      component="span"
      sx={{ display: 'inline-block', fontWeight: 600, mr: 2 }}
    >
      {caption}:
    </Typography>
  ) : null;
}

interface InformationLineProps {
  icon: React.ElementType;
  text: string;
  caption?: string | null;
}

function InformationLine({
  icon: IconComponent,
  text,
  caption = null,
}: InformationLineProps): React.ReactElement {
  return (
    <Stack direction="row" alignItems="center">
      <IconComponent
        sx={{
          mr: 2,
          fontSize: '22pt',
          verticalAlign: 'text-bottom',
        }}
      />
      <Typography variant="body1">
        <CaptionComponent caption={caption} />
        <SoftWrap text={text} />
      </Typography>
    </Stack>
  );
}

interface ImageContainerProps {
  src?: string | null;
  alt: string;
  isAboveFold?: boolean;
}

function ImageContainer({
  src = null,
  alt,
  isAboveFold = false,
}: ImageContainerProps): React.ReactElement | null {
  if (!src) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        aspectRatio: '4 / 3',
        mx: 'auto',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 400px) 100vw, 400px"
        style={{ objectFit: 'contain' }}
        priority={isAboveFold}
      />
    </Box>
  );
}

function TagsContainer({
  tags,
}: {
  tags?: string[] | null;
}): React.ReactElement | null {
  if (tags && tags.length > 0) {
    return (
      <Stack direction="row" spacing={2}>
        {tags.map((tag) => (
          <Chip label={`#${tag}`} key={tag} />
        ))}
      </Stack>
    );
  } else return null;
}

interface LinkLineProps {
  icon: React.ElementType;
  obj?: Maintainer | null;
  url: 'instagram' | 'website';
}

function LinkLine({
  icon: IconComponent,
  obj,
  url,
}: LinkLineProps): React.ReactElement | null {
  if (obj) {
    if (url === 'instagram' && obj.instagram) {
      const instagramRegex =
        /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/([\w.]+)/gim;
      const match = instagramRegex.exec(obj.instagram);
      const handle = match ? match[1] : obj.instagram;
      return (
        <Stack direction="row" alignItems="center">
          <IconComponent sx={{ fontSize: '22pt', mr: 2 }} />
          <Link href={obj.instagram} variant="body1">
            {`@${handle}`}
          </Link>
        </Stack>
      );
    }
    if (url === 'website' && obj.website) {
      return (
        <Stack direction="row" alignItems="center">
          <IconComponent sx={{ fontSize: '22pt', mr: 2 }} />
          <Link href={obj.website} variant="body1">
            {obj.website}
          </Link>
        </Stack>
      );
    }
  }
  return null;
}

interface NotesLineProps {
  icon: React.ElementType;
  caption: string;
  text?: string | null;
}

function NotesLine({
  icon: IconComponent,
  caption,
  text = null,
}: NotesLineProps): React.ReactElement | null {
  if (text) {
    return (
      <Stack direction="row">
        <IconComponent sx={{ fontSize: '22pt', mr: 2 }} />
        <Stack direction="column">
          <CaptionComponent caption={caption} />
          <Typography variant="body1" component="p" sx={{ display: 'block' }}>
            {text}
          </Typography>
        </Stack>
      </Stack>
    );
  } else return null;
}

interface FridgeContainerProps {
  fridge: Fridge;
}

function FridgeContainer({
  fridge,
}: FridgeContainerProps): React.ReactElement | null {
  if (fridge) {
    const {
      name,
      location,
      maintainer = null,
      photoUrl = '/feedback/happyFridge.svg',
      notes = null,
    } = fridge;

    const shareResponse = () => {
      if (typeof window !== 'undefined' && navigator.share) {
        navigator
          .share({
            title: `${name}`,
            url: window.location.href,
          })
          .catch(console.error);
      }
    };
    const address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;

    return (
      <>
        <BackToMapHeader />

        <ImageContainer
          src={photoUrl}
          alt="Picture of the fridge"
          isAboveFold={true}
        />

        <Stack spacing={3}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h2">{name}</Typography>
          </Stack>
          {/* Tags are not in domain model yet, adding as placeholder */}
          <TagsContainer tags={fridge.tags} />
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Button
            aria-label="Click to get directions to the fridge"
            variant="outlined"
            sx={{ width: '47%' }}
            target="_blank"
            href={encodeURI(`https://www.google.com/maps/place/${address}`)}
          >
            <DirectionsOutlinedIcon sx={{ pr: 1 }} />
            Directions
          </Button>
          <Button
            aria-label="Click to share this page"
            variant="outlined"
            sx={{ width: '47%' }}
            onClick={shareResponse}
          >
            <MobileScreenShareOutlinedIcon sx={{ pr: 1 }} />
            Share
          </Button>
        </Stack>

        <InformationLine icon={LocationOnOutlinedIcon} text={address} />
        <NotesLine icon={InfoOutlinedIcon} caption="Info" text={notes} />
        <LinkLine icon={InstagramIcon} obj={maintainer} url="instagram" />
        <LinkLine icon={LanguageIcon} obj={maintainer} url="website" />
      </>
    );
  } else return null;
}

interface ReportContainerProps {
  report?: FridgeReport | null;
}

function ReportContainer({
  report,
}: ReportContainerProps): React.ReactElement | null {
  if (report) {
    const {
      timestamp,
      condition,
      foodPercentage,
      photoUrl = null,
      notes = null,
    } = report;

    const reportDate = new Date(timestamp).toLocaleTimeString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const foodAvailable: Record<number, string> = {
      0: 'Empty',
      1: 'Few items',
      2: 'Many Items',
      3: 'Full',
    };

    return (
      <>
        <Divider style={{ width: '100%' }} />

        <ImageContainer
          src={photoUrl}
          alt="Picture of the food within the fridge"
        />

        <InformationLine
          icon={CalendarMonthIcon}
          caption="Reported on"
          text={reportDate}
        />
        <InformationLine
          icon={() => <FridgeStatusIcon condition={condition} />}
          caption="Fridge Status"
          text={enumCondition[condition]?.text || condition}
        />
        <InformationLine
          icon={KitchenIcon}
          caption="Food Available"
          text={foodAvailable[foodPercentage] || 'Unknown'}
        />

        <NotesLine
          icon={ChatBubbleOutlineOutlinedIcon}
          caption="Notes"
          text={notes}
        />
      </>
    );
  } else return null;
}

export interface FridgeInformationProps {
  fridge: Fridge;
  report?: FridgeReport | null;
}

export function FridgeInformation({
  fridge,
  report,
}: FridgeInformationProps): React.ReactElement {
  return (
    <Stack
      direction="column"
      spacing={5}
      mx={{ xs: 2, sm: 4, md: 'auto' }}
      maxWidth={800}
      mt={4}
      mb={4}
    >
      <FridgeContainer fridge={fridge} />
      <ReportContainer report={report} />

      <ButtonLink
        aria-label="Click to report the status of the fridge"
        variant="contained"
        to={`/user/fridge/report/${fridge.id}`}
        title="Update Status"
      />
    </Stack>
  );
}
