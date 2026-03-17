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

import { NextLink } from 'components/ui';
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
  { icon: ContactUsIcon, title: 'Contact Us', link: '/contact' },
];

const menuDesktopFirstItem = 1;

const sxDesktopIcon = {
  sx: { borderRadius: '50%', width: '40px', height: '40px' }, // Made desktop icons slightly smaller
};

const sxMobileIcon = {
  sx: { borderRadius: '50%', width: '36px', height: '36px' }, // Made mobile icons slightly smaller
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
              mx: 0.5,
              backgroundColor: 'primary.contrastText',
              p: 0,
              width: '40px', // Match the new smaller icon size
              height: '40px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                backgroundColor: 'primary.contrastText',
                transform: 'scale(1.08)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              },
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
    <AppBar id="AppBar" position="sticky" elevation={2}>
      {/* 
        Overriding MUI's default min-height (usually 64px) 
        and applying tighter padding to achieve a thinner bar 
      */}
      <Toolbar
        sx={{
          minHeight: { xs: 52, sm: 56 },
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
          sx={{ display: 'block', m: 0, p: 0, width: '84px', height: '40px' }} // Slightly smaller logo container
        >
          <Image
            alt="Fridge Finder logo"
            src="/brand/logo.svg"
            width={84} // Reduced from 98
            height={40} // Reduced from 48
            style={{ objectFit: 'contain' }}
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
            size="medium" // Changed from large
            aria-label="navigation menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuToggle}
            color="inherit"
            sx={{ mr: -1 }} // Tighter right alignment
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
