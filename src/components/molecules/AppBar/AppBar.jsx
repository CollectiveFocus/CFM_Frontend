import React from 'react';

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

import { NextLinkAnchor } from 'components/atoms';

import { Menu as MenuIcon } from '@mui/icons-material';

import {
  AboutIcon,
  ContactUsIcon,
  FridgeAddIcon,
  FridgeFindIcon,
  GetInvolvedIcon,
  GuidelineIcon,
  HomeIcon,
  LogoAndTitleSvg,
} from 'theme/icons';

const menuItems = [
  { icon: HomeIcon, title: 'Home', link: '/' },
  { icon: FridgeFindIcon, title: 'Find a Fridge', link: '/fridge/find' },
  { icon: FridgeAddIcon, title: 'Add a Fridge', link: '/fridge/add' },
  { icon: AboutIcon, title: 'About', link: '/about' },
  { icon: GuidelineIcon, title: 'Best Practices', link: '/guideline' },
  { icon: GetInvolvedIcon, title: 'Get Involved', link: '/volunteer' },
  { icon: ContactUsIcon, title: 'Contact Us', link: '/contact' },
];
const menuDesktopFirstItem = 1;
const sxDesktopIcon = {
  sx: { borderRadius: '50%', width: '48px', height: '48px' },
};
const sxMobileIcon = {
  sx: { borderRadius: '50%', width: '40px', height: '40px' },
};

export default function ResponsiveAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MenuDesktop = () =>
    menuItems.slice(menuDesktopFirstItem).map((item) => (
      <Tooltip title={item.title} key={item.title}>
        <IconButton
          aria-label={item.title}
          component={NextLinkAnchor}
          to={item.link}
          sx={{
            mx: 1,
            backgroundColor: 'primary.contrastText',
            p: 0,
          }}
        >
          {item.icon(sxDesktopIcon)}
        </IconButton>
      </Tooltip>
    ));

  const MenuMobile = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.title}>
          <ListItemIcon>{item.icon(sxMobileIcon)}</ListItemIcon>
          <Typography
            aria-label={item.title}
            component={NextLinkAnchor}
            to={item.link}
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            {item.title}
          </Typography>
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ p: 0 }}>
        <IconButton
          disableRipple
          aria-label="Go to Home page"
          component={NextLinkAnchor}
          to="/"
          sx={{ display: 'block', m: 0, p: 0, width: '122px', height: '48px' }}
        >
          <LogoAndTitleSvg sx={{ width: '122px', height: '48px' }} />
        </IconButton>
        <Box
          id="desktop"
          aria-label="navigation menu"
          textAlign="right"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '100%',
          }}
        >
          <MenuDesktop />
        </Box>
        <Box
          id="mobile"
          textAlign="right"
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100%',
          }}
        >
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuToggle}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            id="mobile-menu"
            variant="temporary"
            anchor="right"
            keepMounted
            open={mobileOpen}
            onClick={handleMobileMenuToggle}
            sx={{
              maxWidth: '100vw',
            }}
          >
            <MenuMobile />
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}