'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { signOut } from 'firebase/auth';
import { auth } from 'config/firebase';
import { useRouter } from 'next/navigation';
import { useAuthStore } from 'store/useAuthStore';
import { useFollowingStore } from 'store/useFollowingStore';
import { designColor } from 'theme/palette';

const USER_STATS_BASE_URL = `${process.env.NEXT_PUBLIC_USER_REWARDS_API_URL}/v1/user-action-stats`;

interface UserActionStats {
  totalPoints: string;
  fridgeReportCount: string;
  cleanedCount: string;
  filledCount: string;
}

// In-memory cache — cleared on page reload, shared across re-renders
const statsCache = new Map<string, UserActionStats>();

// ─── Theme constants for the fridge card ─────────────────────────
const FRIDGE_COLORS = ['#c8e6d8', '#a8d5c0', '#95c9b2'] as const;
const LABEL_COLOR = '#1a5c42';
const AVATAR_BG = '#2a7a5e';
const MAGNET_COLOR = '#d45d5d';

const GLASS_SURFACE = 'rgba(255,255,255,0.9)';
const GLASS_SURFACE_MUTED = 'rgba(255,255,255,0.6)'; //REMOVE when ACTIVITY and BAGES sections are implemented
const GLASS_BORDER = 'rgba(255,255,255,0.5)';

const PROFILE_TEXT_SECONDARY = '#555';
const SURFACE_SHADOW = '0 2px 6px rgba(0,0,0,0.1)';

const fridgeGradient = `linear-gradient(175deg, ${FRIDGE_COLORS[0]} 0%, ${FRIDGE_COLORS[1]} 50%, ${FRIDGE_COLORS[2]} 100%)`;
const pageGradient = `linear-gradient(170deg, ${FRIDGE_COLORS[0]}66 0%, ${FRIDGE_COLORS[1]}44 50%, ${FRIDGE_COLORS[2]}55 100%)`;
const handleGradient =
  'linear-gradient(180deg, #d4d4d4ee 0%, #d4d4d4 40%, #d4d4d4cc 100%)';
const handleShadow =
  '2px 3px 8px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.1), -1px 0 2px rgba(0,0,0,0.1)';
const lightControlSx = {
  bgcolor: GLASS_SURFACE,
  border: `1px solid ${GLASS_BORDER}`,
  boxShadow: SURFACE_SHADOW,
  color: designColor.neroGray,
  '&:hover': { bgcolor: designColor.white },
} as const;

// ════════════════════════════════════════════════════════════════
export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const userProfile = useAuthStore((s) => s.userProfile);
  const followingCount = useFollowingStore((s) => s.notifications.length);
  const fetchFollowing = useFollowingStore((s) => s.fetch);
  const actionStats = useActionStats(user?.uid);

  const profileUsername = userProfile?.username ?? '...';
  const profileUserType = userProfile?.userType ?? '...';

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing, user?.uid]);

  const onSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: pageGradient,
        pt: { xs: 0, md: 6 },
        pb: 8,
      }}
    >
      <Box
        sx={{ width: '100%', maxWidth: 512, mx: 'auto', px: { xs: 0, md: 4 } }}
      >
        {/* ── THE FRIDGE ────────────────────────────────────────── */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: 0, md: 4 },
            border: { md: `1px solid ${designColor.lightSilver}` },
            boxShadow: { md: '0 10px 30px rgba(0,0,0,0.15)' },
            background: fridgeGradient,
            minHeight: 760,
          }}
        >
          {/* Subtle horizontal texture */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.04,
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${GLASS_BORDER} 1px, ${GLASS_BORDER} 2px)`,
              pointerEvents: 'none',
            }}
          />
          <FridgeHandle top="12%" height={56} />
          <FridgeHandle top="55%" height={80} />
          {/* Inset border */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              boxShadow: 'inset 0 0 0 3px rgba(0,0,0,0.06)',
              pointerEvents: 'none',
            }}
          />

          {/* ── FREEZER SECTION ─────────────────────────────────── */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              pl: 5,
              pr: 7,
              pt: 5,
              pb: 4,
            }}
          >
            <IconButton
              component={NextLink}
              href="/settings"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                ...lightControlSx,
              }}
            >
              <SettingsIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {/* Identity row */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="flex-start"
              sx={{ mb: 3, pr: { xs: 8, sm: 10 } }}
            >
              <PolaroidAvatar />
              <IdentityCard
                username={profileUsername}
                userType={profileUserType}
                followingCount={followingCount}
              />
            </Stack>

            {/* Stats 2x2 grid */}
            <StatsGrid actionStats={actionStats} />

            {/* Action buttons */}
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                component={NextLink}
                href="/profile/edit"
                startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
                sx={{
                  ...lightControlSx,
                  borderRadius: 999,
                  px: 3,
                  height: 32,
                  minHeight: 32,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textTransform: 'none',
                }}
              >
                Edit Profile
              </Button>
            </Stack>
          </Box>

          {/* ── Divider (freezer / fridge) ──────────────────────── */}
          <Box sx={{ position: 'relative', zIndex: 1, mx: 2 }}>
            <Box
              sx={{
                height: 3,
                borderRadius: 999,
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0.06))',
              }}
            />
            <Box
              sx={{
                height: '1px',
                mt: '1px',
                borderRadius: 999,
                background: `linear-gradient(to right, transparent, ${GLASS_BORDER} 20%, ${GLASS_BORDER} 80%, transparent)`,
              }}
            />
          </Box>

          {/* ── FRIDGE SECTION ─────────────────────────────────── */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              pl: 5,
              pr: 7,
              pt: 4,
              pb: 8,
            }}
          >
            {/* Activity */}
            <Box sx={{ mb: 2 }}>
              <SectionLabel>Activity</SectionLabel>
              <ComingSoonPlaceholder height={275} />
            </Box>

            {/* Badges */}
            <Box sx={{ mt: 5 }}>
              <SectionLabel>Badges</SectionLabel>
              <ComingSoonPlaceholder height={96} />
            </Box>
          </Box>
        </Box>

        {/* Sign out (kept available; placement TBD) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="text"
            color="error"
            onClick={onSignOut}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Sign out
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

function StatsGrid({ actionStats }: { actionStats: UserActionStats | null }) {
  const stats = [
    {
      key: 'points',
      value: actionStats ? Number(actionStats.totalPoints) : '0',
      label: 'Points',
      Icon: PointsIcon,
    },
    {
      key: 'reported',
      value: actionStats ? Number(actionStats.fridgeReportCount) : '0',
      label: 'Reported',
      Icon: ReportedIcon,
    },
    {
      key: 'cleaned',
      value: actionStats ? Number(actionStats.cleanedCount) : '0',
      label: 'Cleaned',
      Icon: CleanedIcon,
    },
    {
      key: 'filled',
      value: actionStats ? Number(actionStats.filledCount) : '0',
      label: 'Filled',
      Icon: FilledIcon,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        mt: 4,
        maxWidth: 340,
      }}
    >
      {stats.map(({ key, value, label, Icon }) => (
        <Stack
          key={key}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            bgcolor: GLASS_SURFACE,
            borderRadius: 999,
            px: 3,
            height: 38,
            border: `1px solid ${GLASS_BORDER}`,
            boxShadow: SURFACE_SHADOW,
          }}
        >
          <Icon size={22} />
          <Typography
            variant="inherit"
            sx={{
              fontSize: '0.9rem',
              fontWeight: 550,
              color: designColor.neroGray,
              px: 0.5,
              letterSpacing: '0.05em',
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: designColor.mutedText,
              letterSpacing: '0.04em',
            }}
          >
            {label}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}

function IdentityCard({
  username,
  userType,
  followingCount,
}: {
  username: string;
  userType: string;
  followingCount: number;
}) {
  return (
    <Box
      sx={{
        bgcolor: GLASS_SURFACE,
        borderRadius: 4,
        px: 4,
        py: 3,
        border: `1px solid ${GLASS_SURFACE_MUTED}`,
        boxShadow: SURFACE_SHADOW,
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        variant="inherit"
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.35rem' },
          fontWeight: 500,
          lineHeight: 1.15,
          maxWidth: { xs: 180, sm: 220, md: 240 },
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {username}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography
          variant="inherit"
          sx={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: PROFILE_TEXT_SECONDARY,
          }}
        >
          {userType}
        </Typography>
        <Typography
          variant="inherit"
          sx={{
            color: designColor.lightSilver,
            fontSize: '0.8rem',
            fontWeight: 800,
          }}
        >
          ·
        </Typography>
        <Box
          component={NextLink}
          href="/my-fridges"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.25,
            textDecoration: 'none',
            color: PROFILE_TEXT_SECONDARY,
            '&:hover': { color: designColor.blue.dark },
          }}
        >
          <Typography
            variant="inherit"
            sx={{ fontSize: '0.8rem', fontWeight: 500, color: 'inherit' }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              {followingCount}
            </Box>{' '}
            Following
          </Typography>
          <ChevronRightIcon
            sx={{ fontSize: '0.8rem', color: designColor.mutedText }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5 }}>
      <Typography
        variant="inherit"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: LABEL_COLOR,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {children}
      </Typography>
      <ChevronRightIcon
        sx={{ fontSize: 18, color: LABEL_COLOR, opacity: 0.6 }}
      />
    </Stack>
  );
}

function ComingSoonPlaceholder({ height }: { height: number }) {
  return (
    <Box
      sx={{
        height,
        width: '100%',
        bgcolor: GLASS_SURFACE_MUTED,
        borderRadius: 3,
        border: `1px solid ${GLASS_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="inherit"
        sx={{
          fontSize: '0.6875rem',
          fontWeight: 500,
          color: designColor.mutedText,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        Coming Soon
      </Typography>
    </Box>
  );
}

function FridgeHandle({ top, height }: { top: string; height: number }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top,
        right: 10,
        width: 8,
        height,
        borderRadius: 1,
        background: handleGradient,
        boxShadow: handleShadow,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '4px 1px',
          borderRadius: '3px',
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.1) 70%, transparent)',
        }}
      />
    </Box>
  );
}

function PolaroidAvatar() {
  return (
    <Box
      sx={{ position: 'relative', flexShrink: 0, transform: 'rotate(-4deg)' }}
    >
      <Box
        sx={{
          bgcolor: designColor.white,
          p: '6px',
          pb: '20px',
          border: `1px solid ${designColor.lightSilver}`,
          boxShadow: SURFACE_SHADOW,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            bgcolor: AVATAR_BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: '5px',
          }}
        >
          <Image
            src="/card/paragraph/plum.svg"
            alt="Profile"
            width={50}
            height={50}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${MAGNET_COLOR}ee, ${MAGNET_COLOR})`,
          boxShadow:
            '0 1px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)',
          zIndex: 1,
        }}
      />
    </Box>
  );
}

// ─── Illustration placeholders ───────────────────────────────────

function useActionStats(uid: string | undefined): UserActionStats | null {
  const [actionStats, setActionStats] = useState<UserActionStats | null>(null);

  useEffect(() => {
    if (!uid) return;

    // Show cached value immediately if available
    const cached = statsCache.get(uid);
    if (cached) setActionStats(cached);

    // Always revalidate in background
    fetch(`${USER_STATS_BASE_URL}/${uid}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: UserActionStats | null) => {
        if (!data) return;
        // Only update state if something actually changed
        const current = statsCache.get(uid);
        if (JSON.stringify(current) !== JSON.stringify(data)) {
          statsCache.set(uid, data);
          setActionStats(data);
        }
      })
      .catch(() => {});
  }, [uid]);

  return actionStats;
}

function PointsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <path
        d="M50 86 C24 68 14 50 14 36 C14 24 22 16 32 16 C40 16 46 20 50 28 C54 20 60 16 68 16 C78 16 86 24 86 36 C86 50 76 68 50 86 Z"
        fill="#FB7185"
        stroke="#7F1D1D"
        strokeWidth="5.5"
        strokeLinejoin="round"
      />
      <path
        d="M30 36 Q34 28 42 30"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ReportedIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect
        x="10"
        y="25"
        width="80"
        height="50"
        rx="25"
        fill="#A7F3D0"
        stroke="#065F46"
        strokeWidth="5.5"
      />
      <circle
        cx="35"
        cy="50"
        r="12"
        fill="#10B981"
        stroke="#065F46"
        strokeWidth="4.5"
      />
      <path
        d="M29 50 L33 54 L42 45"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="56"
        y1="42"
        x2="76"
        y2="42"
        stroke="#065F46"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="56"
        y1="58"
        x2="70"
        y2="58"
        stroke="#065F46"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CleanedIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle
        cx="50"
        cy="58"
        r="26"
        fill="#BAE6FD"
        stroke="#0369A1"
        strokeWidth="5.5"
      />
      <circle
        cx="32"
        cy="40"
        r="12"
        fill="#E0F2FE"
        stroke="#0369A1"
        strokeWidth="4.5"
      />
      <circle
        cx="70"
        cy="32"
        r="9"
        fill="#E0F2FE"
        stroke="#0369A1"
        strokeWidth="4.5"
      />
      <circle
        cx="78"
        cy="56"
        r="7"
        fill="#E0F2FE"
        stroke="#0369A1"
        strokeWidth="4"
      />
      <path
        d="M38 50 Q42 44 50 46"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="42" cy="40" r="2.5" fill="#FFFFFF" />
      <circle cx="68" cy="28" r="2" fill="#FFFFFF" />
    </svg>
  );
}

function FilledIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <path
        d="M40 50 C40 30 60 30 60 50 C70 60 68 80 50 80 C32 80 30 60 40 50 Z"
        fill="#A3E635"
        stroke="#4D7C0F"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M50 30 Q54 20 60 22"
        stroke="#78350F"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="68"
        cy="65"
        r="20"
        fill="#F97316"
        stroke="#9A3412"
        strokeWidth="4.5"
      />
      <circle cx="62" cy="58" r="2" fill="#FED7AA" />
      <path
        d="M32 48 C22 42 12 50 12 65 C12 80 22 90 32 90 C42 90 52 80 52 65 C52 50 42 42 32 48 Z"
        fill="#EF4444"
        stroke="#7F1D1D"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 48 C32 40 38 34 44 36"
        stroke="#78350F"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 40 Q46 38 48 44 Q40 46 38 40 Z"
        fill="#10B981"
        stroke="#065F46"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
