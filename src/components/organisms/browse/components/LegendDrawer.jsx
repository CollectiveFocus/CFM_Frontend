import { useState } from 'react';
import {
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material/';
import {
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinGhostIcon,
  MapLegendPinLocationIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinNoReportIcon,
} from 'theme/icons';
import { applyAlpha, designColor, pinColor } from 'theme/palette';

const size = (color) => ({ color, width: '48px', height: '48px' });
const location = (color) => <MapLegendPinLocationIcon sx={size(color)} />;
const unavailable = (color) => (
  <MapLegendPinNotAtLocationIcon sx={size(color)} />
);
const ghost = (color) => <MapLegendPinGhostIcon sx={size(color)} />;
const dirty = (color) => <MapLegendConditionDirtyIcon sx={size(color)} />;
const outOfOrder = (color) => (
  <MapLegendConditionOutOfOrderIcon sx={size(color)} />
);
const noReport = (color) => <MapLegendPinNoReportIcon sx={size(color)} />;

const legendItems = [
  { icon: location(pinColor.itemsFull), title: 'Full' },
  { icon: location(pinColor.itemsMany), title: 'Many Items' },
  { icon: location(pinColor.itemsFew), title: 'Few Items' },
  { icon: location(pinColor.itemsEmpty), title: 'Empty' },
  { icon: noReport(pinColor.reportUnavailable), title: 'No status' },
  { icon: unavailable(pinColor.fridgeNotAtLocation), title: 'Not at location' },
  { icon: dirty(pinColor.fridgeOperation), title: 'Needs cleaning' },
  { icon: outOfOrder(pinColor.fridgeOperation), title: 'Needs servicing' },
  { icon: ghost(pinColor.fridgeGhost), title: 'Ghost Fridge' },
];

const aboveFoldLegendItems = 6;

const drawerBleeding = 22.5;

const DrawerHandle = (
  <Box
    sx={{
      backgroundColor: applyAlpha('66', designColor.blue.dark),
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      pointerEvents: 'all',
      visibility: 'visible',
      position: 'absolute',
      height: 100,
      top: 'calc(50% - 50px)',
      width: drawerBleeding,
      left: -drawerBleeding,
    }}
  >
    <Box
      sx={{
        backgroundColor: designColor.blue.darkShade[0],
        position: 'absolute',
        width: 5,
        height: 50,
        top: 'calc(50% - 25px)',
        left: 5,
        borderRadius: 5,
      }}
    />
  </Box>
);

export default function LegendDrawer() {
  const [open, setOpen] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClick={toggleDrawer(!open)}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          overflow: 'visible',
          width: { xs: 140, sm: 160 },
          height: 'fit-content',
          top: `13vh`,
        },
      }}
      SwipeAreaProps={{
        sx: {
          height: 100,
          top: `40%`,
        },
      }}
      hideBackdrop
      disableScrollLock
    >
      {DrawerHandle}
      <List
        sx={{
          p: 1,
          backgroundColor: 'background.paper',
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <ListItem sx={{ p: 0 }}>
          <ListItemText
            primary="Map Key"
            primaryTypographyProps={{
              sx: {
                fontSize: { xs: '.85em', md: '.95em' },
                fontWeight: 'bold',
                ml: 3,
              },
            }}
          />
        </ListItem>
        {legendItems
          .slice(0, seeMore ? legendItems.length : aboveFoldLegendItems)
          .map((item) => (
            <ListItem key={item.title} sx={{ p: 0 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  sx: { fontSize: { xs: '.85em', md: '.95em' } },
                }}
              />
            </ListItem>
          ))}
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            onClick={(e) => {
              setSeeMore(!seeMore);
              e.stopPropagation();
            }}
            sx={{ p: 0, textDecoration: 'underline !important' }}
          >
            <ListItemText
              primary={`See ${seeMore ? 'Less' : 'More'}`}
              primaryTypographyProps={{
                fontSize: { xs: '.85em', md: '.95em' },
                textTransform: 'none',
                color: 'text.secondary',
                fontWeight: '600',
                ml: 3,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
