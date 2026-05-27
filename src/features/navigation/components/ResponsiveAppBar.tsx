'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  SvgIconProps,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

import { NextLink } from 'components/ui';
import { useAuthStore } from 'store/useAuthStore';
import {
  AboutIcon,
  ContactUsIcon,
  FridgeFindIcon,
  GetInvolvedIcon,
  GuidelineIcon,
  HomeIcon,
  MyFridgesIcon,
} from 'theme/icons';

const menuItems = [
  { icon: HomeIcon, title: 'Home', link: '/' },
  { icon: FridgeFindIcon, title: 'Find a Fridge', link: '/browse' },
  { icon: AboutIcon, title: 'About', link: '/pamphlet/about' },
  {
    icon: GuidelineIcon,
    title: 'Best Practices',
    link: '/pamphlet/best-practices',
  },
  {
    icon: GetInvolvedIcon,
    title: 'Get Involved',
    link: '/pamphlet/get-involved',
  },
  { icon: ContactUsIcon, title: 'Contact Us', link: '/contact' },
];

const menuDesktopFirstItem = 1;

const signInButtonSx = {
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: 800,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': { boxShadow: 'none' },
} as const;

const iconCircleBaseSx = {
  backgroundColor: 'primary.contrastText',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

const navLabelSx = {
  color: 'text.primary',
  fontWeight: 550,
  fontSize: '0.6875rem',
  lineHeight: 1.2,
  textAlign: 'center',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
} as const;

function PlumAvatar({ size = 40 }: { size?: number }): React.ReactElement {
  return (
    <Box
      sx={{
        ...iconCircleBaseSx,
        width: `${size}px`,
        height: `${size}px`,
        p: '3px',
      }}
    >
      <Image
        src="/card/paragraph/plum.svg"
        alt="Profile"
        width={size}
        height={size}
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
      />
    </Box>
  );
}

interface ProfileButtonProps {
  size?: number;
}

function ProfileButton({ size = 40 }: ProfileButtonProps): React.ReactElement {
  return (
    <Tooltip title="Profile">
      <IconButton
        aria-label="Go to Profile page"
        component={NextLink}
        href="/profile"
        sx={{
          p: 0,
          borderRadius: '50%',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'scale(1.08)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          },
        }}
      >
        <PlumAvatar size={size} />
      </IconButton>
    </Tooltip>
  );
}

const sxDesktopIcon: { sx: SvgIconProps['sx'] } = {
  sx: { width: '40px', height: '40px' },
};
const sxMobileIcon: { sx: SvgIconProps['sx'] } = {
  sx: { width: '36px', height: '36px' },
};

interface NavDesktopItemProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  link: string;
}

function NavDesktopItem({
  icon: Icon,
  title,
  link,
}: NavDesktopItemProps): React.ReactElement {
  return (
    <IconButton
      aria-label={title}
      component={NextLink}
      href={link}
      disableRipple
      sx={{
        mx: 1.5,
        backgroundColor: 'transparent',
        p: 0,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        borderRadius: '8px',
        width: '78px',
        height: 'auto',
        transition: 'transform 0.2s ease',
        '&:hover': {
          backgroundColor: 'transparent',
          transform: 'scale(1.08)',
        },
      }}
    >
      <Box sx={{ ...iconCircleBaseSx, width: '42px', height: '42px' }}>
        <Icon {...sxDesktopIcon} />
      </Box>
      <Typography variant="caption" sx={navLabelSx}>
        {title}
      </Typography>
    </IconButton>
  );
}

interface MenuDesktopProps {
  isAuthenticated: boolean;
}

function MenuDesktop({
  isAuthenticated,
}: MenuDesktopProps): React.ReactElement {
  return (
    <>
      {menuItems.slice(menuDesktopFirstItem).map((item) => (
        <NavDesktopItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          link={item.link}
        />
      ))}
      {isAuthenticated ? (
        <>
          <NavDesktopItem
            icon={MyFridgesIcon}
            title="My Fridges"
            link="/my-fridges"
          />
          <Box
            sx={{
              ml: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <ProfileButton size={42} />
            <Typography variant="caption" sx={navLabelSx}>
              Profile
            </Typography>
          </Box>
        </>
      ) : (
        <Button
          component={NextLink}
          href="/auth/signin"
          variant="contained"
          disableElevation
          sx={{ ml: 1.5, px: 6, ...signInButtonSx, fontSize: '0.75rem' }}
        >
          Sign In
        </Button>
      )}
    </>
  );
}

interface MenuMobileProps {
  onItemClick: () => void;
  isAuthenticated: boolean;
}

function MenuMobile({
  onItemClick,
  isAuthenticated,
}: MenuMobileProps): React.ReactElement {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pt: 1.5 }}>
        <IconButton
          aria-label="Close menu"
          onClick={onItemClick}
          sx={{ color: 'text.primary' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List disablePadding>
        {menuItems.map(({ icon: Icon, title, link }) => (
          <ListItem key={title} disablePadding>
            <IconButton
              aria-label={title}
              component={NextLink}
              href={link}
              onClick={onItemClick}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                borderRadius: 0,
                px: 4,
                py: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 56 }}>
                <Box
                  sx={{ ...iconCircleBaseSx, width: '40px', height: '40px' }}
                >
                  <Icon {...sxMobileIcon} />
                </Box>
              </ListItemIcon>
              <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                {title}
              </Typography>
            </IconButton>
          </ListItem>
        ))}
      </List>

      {isAuthenticated ? (
        <Box sx={{ mt: 2 }}>
          <Divider
            sx={{ mx: 0, mb: 1.5, borderColor: 'text.primary', opacity: 0.3 }}
          />
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 500,
              color: 'text.primary',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              px: 4,
              mb: 0.5,
            }}
          >
            My Account
          </Typography>
          <ListItem disablePadding>
            <IconButton
              aria-label="My Fridges"
              component={NextLink}
              href="/my-fridges"
              onClick={onItemClick}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                borderRadius: 0,
                px: 4,
                py: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 56 }}>
                <Box
                  sx={{ ...iconCircleBaseSx, width: '40px', height: '40px' }}
                >
                  <MyFridgesIcon sx={{ width: '36px', height: '36px' }} />
                </Box>
              </ListItemIcon>
              <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                My Fridges
              </Typography>
            </IconButton>
          </ListItem>
          <ListItem disablePadding>
            <IconButton
              aria-label="Profile"
              component={NextLink}
              href="/profile"
              onClick={onItemClick}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                borderRadius: 0,
                px: 4,
                py: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 56 }}>
                <PlumAvatar size={40} />
              </ListItemIcon>
              <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                Profile
              </Typography>
            </IconButton>
          </ListItem>
        </Box>
      ) : (
        <Box sx={{ mt: 'auto', px: 8, mb: 8 }}>
          <Button
            component={NextLink}
            href="/auth/signin"
            variant="contained"
            fullWidth
            onClick={onItemClick}
            disableElevation
            sx={{ py: 2, ...signInButtonSx }}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Box>
  );
}

export function ResponsiveAppBar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status } = useAuthStore();
  const isAuthenticated = status === 'authenticated';

  const handleMobileMenuToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileItemClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <AppBar id="AppBar" position="sticky" elevation={2}>
      {/* 
        Overriding MUI's default min-height (usually 64px) 
        and applying tighter padding to achieve a thinner bar 
      */}
      <Toolbar
        sx={{
          minHeight: { xs: 60, sm: 64, md: 72 },
          px: { xs: 2, sm: 4, md: 6 },
          py: 0.5,
        }}
        disableGutters
      >
        <IconButton
          disableRipple
          aria-label="Go to Home page"
          component={NextLink}
          href="/"
          sx={{
            display: 'block',
            m: 0,
            p: 0,
            width: { xs: '84px', md: '90px' },
            height: { xs: '40px', md: '44px' },
          }}
        >
          <Image
            alt="Fridge Finder logo"
            src="/brand/logo.svg"
            width={90}
            height={44}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </IconButton>

        <Box
          id="desktop"
          aria-label="navigation menu"
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <MenuDesktop isAuthenticated={isAuthenticated} />
        </Box>

        <Box
          id="mobile"
          aria-label="navigation menu"
          sx={{
            display: { xs: 'flex', md: 'none' },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          {isAuthenticated ? (
            <ProfileButton size={40} />
          ) : (
            <Button
              component={NextLink}
              href="/auth/signin"
              variant="contained"
              disableElevation
              sx={{ px: 4, py: 1.5, ...signInButtonSx }}
            >
              Sign In
            </Button>
          )}
          <IconButton
            size="medium"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuToggle}
            color="inherit"
            sx={{ mr: -1 }}
          >
            <MenuIcon sx={{ fontSize: '1.75rem' }} />
          </IconButton>

          <Drawer
            id="mobile-menu"
            variant="temporary"
            anchor="right"
            keepMounted
            open={mobileOpen}
            onClose={handleMobileMenuToggle}
            sx={{
              '& .MuiDrawer-paper': {
                width: 240,
                backgroundColor: 'secondary.main',
              },
            }}
          >
            <MenuMobile
              onItemClick={handleMobileItemClick}
              isAuthenticated={isAuthenticated}
            />
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
