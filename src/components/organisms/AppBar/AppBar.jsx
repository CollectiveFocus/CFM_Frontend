import React from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ListItemIcon as ListIconItem,
  Menu,
  MenuItem,
  MenuList,
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
  LogoText,
  VolunteerIcon,
} from 'theme/icons';

const menu = [
  { icon: HomeIcon, title: 'Home', link: '/' },
  { icon: FridgeFindIcon, title: 'Find a Fridge', link: '/fridge/find' },
  { icon: FridgeAddIcon, title: 'Add a Fridge', link: '/fridge/add' },
  { icon: AboutIcon, title: 'About', link: '/about' },
  { icon: GuidelineIcon, title: 'Best Practices', link: '/guideline' },
  { icon: VolunteerIcon, title: 'Volunteer', link: '/volunteer' },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenMenuMobile = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenuMobile = () => {
    setAnchorElNav(null);
  };

  const MenuDesktop = () =>
    menu.slice(1).map((item) => (
      <Tooltip title={item.title} key={item.title}>
        <IconButton
          aria-label={item.title}
          component={NextLinkAnchor}
          to={item.link}
        >
          <item.icon sx={{ borderRadius: '50%' }} />
        </IconButton>
      </Tooltip>
    ));

  const MenuMobile = () => (
    <MenuList>
      {menu.map((item) => (
        <MenuItem key={item.title} onClick={handleCloseMenuMobile}>
          <ListIconItem>
            <item.icon sx={{ borderRadius: '50%' }} />
          </ListIconItem>
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
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            disableRipple
            aria-label="Home"
            component={NextLinkAnchor}
            to="/"
            sx={{ display: 'block', mx: 0, px: 0 }}
          >
            <LogoText />
          </IconButton>
          <Box
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
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenuMobile}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
      </Container>
    </AppBar>
  );
}
