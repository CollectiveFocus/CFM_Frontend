'use client';

import React from 'react';
import Image from 'next/image';
import AnchorLink from 'next/link';
import {
  Button,
  Box,
  CircularProgress,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  CheckCircle as CheckCircleIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  Instagram as InstagramIcon,
  Language as LanguageIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  PlaceOutlined as MapPinIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import { ButtonLink, SoftWrap } from 'components/ui';
import { BackLinkButton } from 'components/shared/BackLinkButton';
import { ShareButton } from './ShareButton';
import { useFridgeNotifications } from 'features/fridge-notifications';
import { useAuthStore } from 'store/useAuthStore';
import { Fridge, FridgeReport, Maintainer } from 'types/domain';
import {
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinGhostIcon,
} from 'theme/icons';
import { pinColor, designColor } from 'theme/palette';

// ---------------------------------------------------------------------------
// Condition map
// ---------------------------------------------------------------------------
const enumCondition: Record<string, { text: string }> = {
  good: { text: 'Fridge is Working Properly' },
  dirty: { text: 'Fridge Needs Cleaning' },
  'out of order': { text: 'Fridge Needs Repairs' },
  'not at location': { text: 'Fridge is No Longer at Location' },
  ghost: { text: 'Fridge is Permanently Unavailable' },
};

// ---------------------------------------------------------------------------
// Condition icons (imported from theme/icons)
// ---------------------------------------------------------------------------

function FoodLevelIcon({
  foodLevel,
  style,
}: {
  foodLevel: string;
  style?: React.CSSProperties;
}): React.ReactElement {
  const levelLower = foodLevel.toLowerCase();

  const getMouthPath = (): string => {
    if (levelLower.includes('full') && !levelLower.includes('half'))
      return 'M8.5 13c2.5 2.5 5 2.5 7 0';
    if (levelLower.includes('many'))
      return 'M9.132 13.372c1.988 1.727 4.032 1.526 5.736 0';
    if (levelLower.includes('half')) return 'M9.5 13.5c1.5 1.2 3 1.2 4.5 0';
    if (levelLower.includes('low') || levelLower.includes('few'))
      return 'M9.5 14c1.5 -0.5 3 -0.5 4.5 0';
    if (levelLower.includes('empty')) return 'M9 14.5c1.5 -1.5 4 -1.5 5.5 0';
    return 'M9.5 13.5c1.5 0 3 0 4.5 0';
  };

  const getBg = (): string => {
    if (levelLower.includes('full') && !levelLower.includes('half'))
      return pinColor.itemsFull;
    if (levelLower.includes('half')) return pinColor.itemsMany;
    if (levelLower.includes('low') || levelLower.includes('few'))
      return pinColor.itemsFew;
    if (levelLower.includes('empty')) return pinColor.itemsEmpty;
    if (levelLower.includes('many')) return pinColor.itemsMany;
    return pinColor.itemsEmpty;
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="5.5 3.5 13 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <rect
        x="6"
        y="4"
        width="12"
        height="16"
        rx="2"
        stroke={designColor.neroGray}
        strokeWidth="1"
        fill={getBg()}
      />
      <path
        stroke={designColor.neroGray}
        strokeWidth="1.5"
        strokeLinecap="round"
        d={getMouthPath()}
      />
      <circle cx="8.5" cy="11.5" r="1.19" fill={designColor.red.danger} />
      <circle cx="15.5" cy="11.5" r="1.19" fill={designColor.red.danger} />
      <circle cx="10" cy="9" r=".555" fill={designColor.neroGray} />
      <circle cx="14" cy="9" r=".555" fill={designColor.neroGray} />
    </svg>
  );
}

function ConditionIcon({
  condition,
}: {
  condition: string;
}): React.ReactElement {
  const c = condition.toLowerCase();
  if (c === 'dirty')
    return (
      <MapLegendConditionDirtyIcon
        sx={{ width: 28, height: 28, color: '#666666', flexShrink: 0 }}
      />
    );
  if (c === 'out of order')
    return (
      <MapLegendConditionOutOfOrderIcon
        sx={{ width: 28, height: 28, color: '#666666', flexShrink: 0 }}
      />
    );
  if (c === 'good')
    return (
      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 28, flexShrink: 0 }} />
    );
  if (c === 'not at location')
    return (
      <MapLegendPinNotAtLocationIcon
        sx={{
          width: 28,
          height: 28,
          color: pinColor.fridgeNotAtLocation,
          flexShrink: 0,
        }}
      />
    );
  if (c === 'ghost')
    return (
      <MapLegendPinGhostIcon
        sx={{
          width: 28,
          height: 28,
          color: pinColor.fridgeGhost,
          flexShrink: 0,
        }}
      />
    );
  // unknown — grey dot
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: '#6B7280',
        flexShrink: 0,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function CaptionLabel({
  caption,
}: {
  caption?: string | null;
}): React.ReactElement | null {
  if (!caption) return null;

  return (
    <Typography
      component="span"
      sx={{ fontWeight: 700, color: designColor.neroGray, mr: 1 }}
    >
      {caption}:
    </Typography>
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
        maxHeight: { xs: 325, md: 350 },
        aspectRatio: '1 / 1.1',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        priority={isAboveFold}
      />
    </Box>
  );
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
  if (!obj) return null;
  if (url === 'instagram' && obj.instagram) {
    const instagramRegex =
      /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am|instagr\.com)\/([\.\w]+)/gim;
    const match = instagramRegex.exec(obj.instagram);
    const handle = match ? match[1] : obj.instagram;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="12px"
        sx={{ minWidth: 0, width: '100%' }}
      >
        <IconComponent
          sx={{ fontSize: '1.83rem', color: '#666', flexShrink: 0 }}
        />
        <Link
          href={obj.instagram}
          variant="body1"
          sx={{
            color: designColor.blue.dark,
            minWidth: 0,
            maxWidth: '100%',
            display: 'block',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
          }}
        >
          {`@${handle}`}
        </Link>
      </Stack>
    );
  }
  if (url === 'website' && obj.website) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="12px"
        sx={{ minWidth: 0, width: '100%' }}
      >
        <IconComponent
          sx={{ fontSize: '1.83rem', color: '#666', flexShrink: 0 }}
        />
        <Link
          href={obj.website}
          variant="body1"
          sx={{
            color: designColor.blue.dark,
            minWidth: 0,
            maxWidth: '100%',
            display: 'block',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
          }}
        >
          {obj.website}
        </Link>
      </Stack>
    );
  }
  return null;
}

// ---------------------------------------------------------------------------
// Info line (icon + bold label + value)
// ---------------------------------------------------------------------------
interface InfoRowProps {
  icon: React.ReactElement;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps): React.ReactElement {
  return (
    <Stack direction="row" alignItems="center" gap="12px">
      <Box
        sx={{
          width: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography variant="body1">
        <CaptionLabel caption={label} />
        <SoftWrap text={value} />
      </Typography>
    </Stack>
  );
}

interface NotesRowProps {
  icon: React.ReactElement;
  label: string;
  text?: string | null;
}

function NotesRow({
  icon,
  label,
  text,
}: NotesRowProps): React.ReactElement | null {
  if (!text) return null;
  return (
    <Stack direction="row" alignItems="flex-start" gap="12px">
      <Box
        sx={{
          width: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: '2px',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          component="span"
          sx={{ fontWeight: 700, color: designColor.neroGray }}
        >
          {label}:
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: designColor.neroGray, mt: 0.5 }}
        >
          {text}
        </Typography>
      </Box>
    </Stack>
  );
}

// ---------------------------------------------------------------------------
// Follow button — checks notification state and routes accordingly
// ---------------------------------------------------------------------------
interface FollowButtonProps {
  fridgeId: string;
  fridgeName: string;
}

function FollowButton({
  fridgeId,
  fridgeName,
}: FollowButtonProps): React.ReactElement {
  const authStatus = useAuthStore((s) => s.status);
  const { isFollowing, isInitializing } = useFridgeNotifications(fridgeId);
  const isLoading = authStatus === 'loading' || isInitializing;
  const notificationsHref = `/fridge/${fridgeId}/notifications?name=${encodeURIComponent(fridgeName)}`;

  return (
    <Button
      component={AnchorLink}
      href={notificationsHref}
      aria-label="Click to manage fridge follow alerts"
      variant="contained"
      sx={{
        flex: 0.84,
        borderRadius: '999px',
        fontWeight: 700,
        fontSize: { xs: '0.75rem', md: '1rem' },
        lineHeight: { xs: '1rem', md: '1.25rem' },
        py: { xs: 1.25, md: 1.125 },
        px: { xs: 0.625, md: 1.125 },
        minHeight: { xs: 40, md: 44 },
        backgroundColor: designColor.blue.dark,
        border: `2px solid ${designColor.blue.dark}`,
        whiteSpace: 'nowrap',
        '&:hover': { opacity: 0.9, backgroundColor: designColor.blue.dark },
        textTransform: 'uppercase',
        display: 'flex',
        minWidth: 0,
        gap: { xs: '6px', md: '8px' },
      }}
    >
      {isLoading ? (
        <CircularProgress size={18} sx={{ color: designColor.white }} />
      ) : (
        <>
          <NotificationsOutlinedIcon
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          />
          {isFollowing ? 'Edit Alerts' : 'Follow'}
        </>
      )}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// FridgeContainer — top section (name, address, image, action buttons)
// ---------------------------------------------------------------------------
interface FridgeContainerProps {
  fridge: Fridge;
}

function FridgeContainer({
  fridge,
}: FridgeContainerProps): React.ReactElement | null {
  if (!fridge) return null;

  const {
    name,
    location,
    maintainer = null,
    photoUrl = '/feedback/happyFridge.svg',
    notes = null,
  } = fridge;
  const address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Back button + name/address — grouped tight */}
      <Box>
        <BackLinkButton label="Back to Map" href="/browse" />
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: designColor.neroGray,
              mt: 0,
              mb: 0.5,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#505050', fontWeight: 500 }}
          >
            {address}
          </Typography>
        </Box>
      </Box>

      {/* Fridge hero image */}
      <ImageContainer src={photoUrl} alt="Picture of the fridge" isAboveFold />

      {/* Action buttons */}
      <Stack direction="row" gap={{ xs: 1.5, md: 2 }}>
        <FollowButton fridgeId={fridge.id} fridgeName={name} />

        <Button
          component="a"
          href={encodeURI(`https://www.google.com/maps/place/${address}`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Click to get directions to the fridge"
          variant="outlined"
          sx={{
            flex: 0.84,
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: { xs: '0.75rem', md: '1rem' },
            lineHeight: { xs: '1rem', md: '1.25rem' },
            py: { xs: 1.25, md: 1.125 },
            px: { xs: 0.625, md: 1.125 },
            minHeight: { xs: 40, md: 44 },
            border: `2px solid ${designColor.blue.dark}`,
            color: designColor.blue.dark,
            whiteSpace: 'nowrap',
            display: 'flex',
            minWidth: 0,
            gap: { xs: '6px', md: '8px' },
            '& .MuiSvgIcon-root': { color: designColor.blue.dark },
            '& .directions-label': { color: designColor.blue.dark },
            '&:hover': {
              backgroundColor: designColor.blue.dark,
              color: designColor.white,
              border: `2px solid ${designColor.blue.dark}`,
              '& .MuiSvgIcon-root': { color: designColor.white },
              '& .directions-label': { color: designColor.white },
            },
            textTransform: 'uppercase',
          }}
        >
          <MapPinIcon
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: designColor.blue.dark,
            }}
          />
          <Box component="span" className="directions-label">
            Directions
          </Box>
        </Button>

        <ShareButton fridgeName={name} />
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// ReportContainer — latest report section
// ---------------------------------------------------------------------------
interface ReportContainerProps {
  report?: FridgeReport | null;
}

function ReportContainer({
  report,
}: ReportContainerProps): React.ReactElement | null {
  if (!report) return null;

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

  const foodLabel = foodAvailable[foodPercentage] ?? 'Unknown';
  const conditionLabel = enumCondition[condition]?.text ?? condition;

  return (
    <>
      <Divider sx={{ width: '100%', opacity: 0.2 }} />

      {/* Report info rows */}
      <InfoRow
        icon={
          <CalendarMonthIcon
            sx={{ fontSize: '1.67rem', color: designColor.neroGray }}
          />
        }
        label="Latest Report"
        value={reportDate}
      />
      <InfoRow
        icon={<ConditionIcon condition={condition} />}
        label="Condition"
        value={conditionLabel}
      />
      <InfoRow
        icon={<FoodLevelIcon foodLevel={foodLabel} />}
        label="Food Level"
        value={foodLabel}
      />
      <NotesRow
        icon={
          <ChatBubbleOutlineOutlinedIcon
            sx={{ fontSize: '1.67rem', color: designColor.neroGray }}
          />
        }
        label="Notes"
        text={notes}
      />

      {/* Report photo last */}
      <ImageContainer
        src={photoUrl}
        alt="Picture of the food within the fridge"
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// FridgeInformation — root export
// ---------------------------------------------------------------------------
export interface FridgeInformationProps {
  fridge: Fridge;
  report?: FridgeReport | null;
}

export function FridgeInformation({
  fridge,
  report,
}: FridgeInformationProps): React.ReactElement {
  return (
    <>
      <Box sx={{ maxWidth: 896, mx: 'auto', width: '100%' }}>
        <Stack
          direction="column"
          spacing={3}
          px={2}
          pt={2}
          mb={{ xs: '72px', md: 4 }}
        >
          <FridgeContainer fridge={fridge} />
          <ReportContainer report={report} />

          <Divider sx={{ opacity: 0.2 }} />

          {/* Details / notes */}
          {fridge.notes && (
            <Stack direction="row" alignItems="flex-start" gap="12px">
              <InfoOutlinedIcon
                sx={{
                  fontSize: '1.83rem',
                  color: '#666',
                  flexShrink: 0,
                  mt: '2px',
                }}
              />
              <Box>
                <Typography
                  component="span"
                  sx={{ fontWeight: 700, color: designColor.neroGray }}
                >
                  Details:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: designColor.neroGray, mt: 0.5 }}
                >
                  {fridge.notes}
                </Typography>
              </Box>
            </Stack>
          )}

          {/* Social links */}
          <LinkLine
            icon={InstagramIcon}
            obj={fridge.maintainer ?? null}
            url="instagram"
          />
          <LinkLine
            icon={LanguageIcon}
            obj={fridge.maintainer ?? null}
            url="website"
          />
        </Stack>

        {/* Desktop inline Update Status button */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, px: 2, mb: 4 }}>
          <ButtonLink
            aria-label="Click to report the status of the fridge"
            variant="contained"
            to={`/fridge/${fridge.id}/report`}
            title="Update Status"
            sx={{
              width: 'calc(100% - 16px)',
              mx: 'auto',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: { xs: '0.75rem', md: '1rem' },
              lineHeight: { xs: '1rem', md: '1.25rem' },
              textTransform: 'uppercase',
              backgroundColor: designColor.blue.dark,
              border: `2px solid ${designColor.blue.dark}`,
              minHeight: { xs: 40, md: 44 },
              '&:hover': {
                opacity: 0.9,
                backgroundColor: designColor.blue.dark,
              },
              display: 'flex',
              gap: { xs: '6px', md: '8px' },
              py: { xs: 1.25, md: 1.125 },
              px: { xs: 0.75, md: 1.25 },
            }}
            startIcon={
              <EditIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
            }
          />
        </Box>
      </Box>

      {/* Mobile sticky Update Status button */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: designColor.white,
          borderTop: '1px solid rgba(0,0,0,0.12)',
          px: 2,
          py: 1.5,
          zIndex: 40,
          boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <ButtonLink
          aria-label="Click to report the status of the fridge"
          variant="contained"
          to={`/fridge/${fridge.id}/report`}
          title="Update Status"
          sx={{
            width: '96%',
            mx: 'auto',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: { xs: '0.75rem', md: '1rem' },
            lineHeight: { xs: '1rem', md: '1.25rem' },
            textTransform: 'uppercase',
            backgroundColor: designColor.blue.dark,
            border: `2px solid ${designColor.blue.dark}`,
            minHeight: { xs: 40, md: 44 },
            '&:hover': { opacity: 0.9, backgroundColor: designColor.blue.dark },
            display: 'flex',
            gap: { xs: '6px', md: '8px' },
            py: { xs: 1.25, md: 1.125 },
            px: { xs: 0.75, md: 1.25 },
          }}
          startIcon={
            <EditIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
          }
        />
      </Box>
    </>
  );
}
