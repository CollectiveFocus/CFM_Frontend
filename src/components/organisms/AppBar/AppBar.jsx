import React from 'react';

import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import { NextLinkAnchor } from 'components/atoms';

import { Menu as MenuIcon } from '@mui/icons-material';

import {
  AboutIcon,
  FridgeAddIcon,
  FridgeFindIcon,
  GuidelineIcon,
  HomeIcon,
  LogoAndTitleSvg,
  VolunteerIcon,
} from 'theme/icons';

const menuItems = [
  { icon: HomeIcon, title: 'Home', link: '/' },
  { icon: FridgeFindIcon, title: 'Find a Fridge', link: '/fridge/find' },
  { icon: FridgeAddIcon, title: 'Add a Fridge', link: '/fridge/add' },
  { icon: AboutIcon, title: 'About', link: '/about' },
  { icon: GuidelineIcon, title: 'Best Practices', link: '/guideline' },
  { icon: VolunteerIcon, title: 'Volunteer', link: '/volunteer' },
];
const menuDesktopFirstItem = 1;

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenMenuMobile = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenuMobile = () => {
    setAnchorElNav(null);
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
          <item.icon
            sx={{
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              color: 'red',
            }}
          />
        </IconButton>
      </Tooltip>
    ));

  const MenuMobile = () => (
    <MenuList>
      {menuItems.map((item) => (
        <MenuItem key={item.title} onClick={handleCloseMenuMobile}>
          <ListItemIcon>
            <item.icon
              sx={{ borderRadius: '50%', width: '40px', height: '40px' }}
            />
          </ListItemIcon>
          <Typography
            aria-label={item.title}
            component={NextLinkAnchor}
            to={item.link}
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            {item.title}
          </Typography>
        </MenuItem>
      ))}
    </MenuList>
  );

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ p: 0 }}>
        <IconButton
          disableRipple
          aria-label="Home"
          component={NextLinkAnchor}
          to="/"
          sx={{ display: 'block', m: 0, p: 0, width: '122px', height: '48px' }}
        >
          <LogoAndTitleSvg sx={{ width: '122px', height: '48px' }} />
        </IconButton>
        <Box
          id="desktop"
          aria-label="navigation menu"
          sx={{
            mx: 0,
            px: 0,
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <MenuDesktop />
        </Box>
        <Box
          id="mobile"
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="menu-mobile"
            aria-haspopup="true"
            onClick={handleOpenMenuMobile}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-mobile"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseMenuMobile}
          >
            <MenuMobile />
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
