import React from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import theme from 'theme';
import { NextLinkAnchor } from 'components/atoms';

import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';

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
  { icon: FridgeFindIcon, title: 'Find a Fridge', link: '/browse' },
  { icon: FridgeAddIcon, title: 'Add a Fridge', link: '/user/fridge/add' },
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

const sxSearch = {
  position: 'relative',
  borderRadius: 45,
  backgroundColor: 'white',
  marginRight: theme.spacing(2),
  marginLeft: {
    xs: theme.spacing(6),
    sm: theme.spacing(6),
  },
  width: { xs: '100%', sm: 'auto' },
};

const sxSearchIconWrapper = {
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const sxInputBase = {
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    width: { md: '17ch', xs: '100%' },
  },
};

function SearchBox({ currentPath }) {
  return currentPath === '/browse' ? (
    <Box sx={sxSearch}>
      <Box sx={sxSearchIconWrapper}>
        <SearchIcon />
      </Box>
      <InputBase
        sx={sxInputBase}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Box>
  ) : null;
}

export default function ResponsiveAppBar() {
  const router = useRouter();
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
          sx={{
            display: 'block',
            m: 0,
            p: 0,
            width: '122px',
            height: '48px',
          }}
        >
          <LogoAndTitleSvg sx={{ width: '122px', height: '48px' }} />
        </IconButton>
        <SearchBox currentPath={router.pathname} />
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
            width: '50%',
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
