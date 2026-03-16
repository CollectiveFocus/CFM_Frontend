'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { NextLink } from 'components/atoms/NextLink/NextLink';
import {
  AboutIcon,
  ContactUsIcon,
  FridgeFindIcon,
  GetInvolvedIcon,
  GuidelineIcon,
  HomeIcon,
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
  { icon: ContactUsIcon, title: 'Contact Us', link: '/user/contact' },
];

const menuDesktopFirstItem = 1;

const sxDesktopIcon = {
  sx: { borderRadius: '50%', width: '48px', height: '48px' },
};

const sxMobileIcon = {
  sx: { borderRadius: '50%', width: '40px', height: '40px' },
};

function MenuDesktop(): React.ReactElement {
  return (
    <>
      {menuItems.slice(menuDesktopFirstItem).map((item) => (
        <Tooltip title={item.title} key={item.title}>
          <IconButton
            aria-label={item.title}
            component={NextLink}
            href={item.link}
            sx={{
              mx: 1,
              backgroundColor: 'primary.contrastText',
              p: 0,
            }}
          >
            {item.icon(sxDesktopIcon)}
          </IconButton>
        </Tooltip>
      ))}
    </>
  );
}

interface MenuMobileProps {
  onItemClick: () => void;
}

function MenuMobile({ onItemClick }: MenuMobileProps): React.ReactElement {
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.title} disablePadding>
          <IconButton
            aria-label={item.title}
            component={NextLink}
            href={item.link}
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
              {item.icon(sxMobileIcon)}
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary' }}>{item.title}</Typography>
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export function ResponsiveAppBar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileItemClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <AppBar
      id="AppBar"
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.05)',
        px: { xs: 2, md: 4 },
      }}
    >
      <Toolbar sx={{ p: 0, justifyContent: 'space-between' }}>
        <IconButton
          disableRipple
          aria-label="Go to Home page"
          component={NextLink}
          href="/"
          sx={{ display: 'block', m: 0, p: 0, width: '98px', height: '48px' }}
        >
          <Image
            alt="Fridge Finder logo"
            src="/brand/logo.svg"
            width={98}
            height={48}
          />
        </IconButton>
        <Box
          id="desktop"
          aria-label="navigation menu"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '100%',
            textAlign: 'right',
          }}
        >
          <MenuDesktop />
        </Box>
        <Box
          id="mobile"
          aria-label="navigation menu"
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100%',
            textAlign: 'right',
          }}
        >
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuToggle}
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            id="mobile-menu"
            variant="temporary"
            anchor="right"
            keepMounted
            open={mobileOpen}
            onClose={handleMobileMenuToggle}
            sx={{
              '& .MuiDrawer-paper': { width: 240 },
            }}
          >
            <MenuMobile onItemClick={handleMobileItemClick} />
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
