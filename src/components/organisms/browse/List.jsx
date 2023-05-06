import PropTypes from 'prop-types';

import Image from 'next/image';
import Link from 'next/link';

import { Button, Chip, List, ListItem, Stack, Typography } from '@mui/material';
import {
  CalendarMonthOutlined as CalendarIcon,
  Instagram as InstagramIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';

import typesView from 'model/view/prop-types';

import {
  MapLegendConditionDirtyIcon,
  MapLegendConditionOutOfOrderIcon,
  MapLegendPinLocationIcon,
  MapLegendPinNotAtLocationIcon,
  MapLegendPinNoReportIcon,
  MapLegendPinGhostIcon,
  svgUrlPinLocation,
  svgDecorationDirty,
} from 'theme/icons';
import { pinColor } from 'theme/palette';

function FridgeStatusChip({ fridgeReport }) {
  const getColor = () => {
    if (fridgeReport.condition === 'ghost') return pinColor.fridgeGhost;
    if (fridgeReport.foodPercentage === 0) return pinColor.itemsEmpty;
    if (fridgeReport.foodPercentage === 1) return pinColor.itemsFew;
    if (fridgeReport.foodPercentage === 2) return pinColor.itemsMany;
    if (fridgeReport.foodPercentage === 3) return pinColor.itemsFull;
  };

  const getFoodPercentage = () => {
    if (fridgeReport.condition === 'ghost') return 'ghost';
    if (fridgeReport.foodPercentage === 0) return 'Empty';
    if (fridgeReport.foodPercentage === 1) return 'Few Items';
    if (fridgeReport.foodPercentage === 2) return 'Many Items';
    if (fridgeReport.foodPercentage === 3) return 'Full';
  };

  const getIcon = () => {
    if (fridgeReport.condition === 'ghost') {
      return <MapLegendPinGhostIcon />;
    }
    if (fridgeReport.condition === 'not at location') {
      return <MapLegendPinNotAtLocationIcon />;
    }
    if (fridgeReport.condition === 'no report') {
      return <MapLegendPinNoReportIcon />;
    }
    return <MapLegendPinLocationIcon />;
  };

  return (
    <Chip
      label={getFoodPercentage() + ' & ' + fridgeReport.condition}
      icon={getIcon()}
      sx={{
        display: 'flex',
        justifyContent: 'start',
        background: 'transparent',
        fontSize: '15px',
        '& .MuiChip-icon': {
          color: getColor(),
          fontSize: '29.5px',
        },
      }}
    />
  );
}

function Location({ location }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <LocationOnOutlinedIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        {`${location.street} ${location.city}, ${location.state} ${location.zip}`}
      </Typography>
    </Stack>
  );
}
Location.propTypes = {
  location: typesView.Location,
};

function Instagram({ instagramUrl }) {
  const instagramRegex =
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
  const handle = instagramRegex.exec(instagramUrl);
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <InstagramIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        @{handle[1]}
      </Typography>
    </Stack>
  );
}
Instagram.propTypes = {
  instagramUrl: PropTypes.string.isRequired,
};

function LastUpdate({ date }) {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <CalendarIcon />
      <Typography sx={{ fontSize: ['0.9375rem'], color: 'text.primary' }}>
        Last Update: {date.toLocaleDateString()}
      </Typography>
    </Stack>
  );
}
LastUpdate.propTypes = {
  date: PropTypes.object.isRequired,
};

export default function FridgeList({ fridges }) {
  return (
    <List>
      {fridges.map((fridge, fridgeIndex) => (
        <ListItem
          key={fridge.id}
          divider={fridgeIndex !== fridges.length - 1}
          sx={{ paddingY: 5.5, paddingX: 0 }}
        >
          <Stack direction="column" spacing={3} width="100%">
            <Stack direction="row" spacing={3}>
              <Stack direction="column" spacing={3} flex={1}>
                <Typography sx={{ fontSize: ['1rem'], fontWeight: 700 }}>
                  {fridge.name}
                </Typography>
                <Location location={fridge.location} />
                {fridge.maintainer?.instagram ? (
                  <Instagram instagramUrl={fridge.maintainer.instagram} />
                ) : null}
                {fridge.report ? (
                  <LastUpdate date={fridge.report.timestamp} />
                ) : null}
                {fridge.report ? (
                  <FridgeStatusChip fridgeReport={fridge.report} />
                ) : null}
              </Stack>
              {fridge.photoUrl ? (
                <Stack flex={1}>
                  <Image
                    src={fridge.photoUrl}
                    alt="Picture of the fridge"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                </Stack>
              ) : null}
            </Stack>
            <Button
              href={`/fridge/${fridge.id}`}
              component="a"
              LinkComponent={Link}
              variant="contained"
              sx={{ fontSize: ['1rem'] }}
            >
              More Info
            </Button>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
FridgeList.propTypes = {
  fridges: PropTypes.arrayOf(typesView.Fridge),
};
