import PropTypes from 'prop-types';
import Image from 'next/image';
import { Button, Chip, Divider, Link, Stack, Typography } from '@mui/material';

import { useState, useEffect } from 'react';

// Icons
import {
  ArrowBack as ArrowBackIcon,
  CalendarMonth as CalendarMonthIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  DirectionsOutlined as DirectionsOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  Instagram as InstagramIcon,
  Kitchen as KitchenIcon,
  Language as LanguageIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  MobileScreenShareOutlined as MobileScreenShareOutlinedIcon,
} from '@mui/icons-material';
import { StatusIcon } from 'theme/icons';

export default function FridgeDetailed(props) {
  const [date, setDate] = useState('');
  useEffect(() => {
    const convertedDate = new Date(props.report.timestamp);

    const day = convertedDate.getDate();
    const month = convertedDate.getMonth();
    const year = convertedDate.getFullYear().toString().substr(-2);
    setDate(`${month}/${day}/${year}`);
  }, []);

  return (
    <Stack direction="column" spacing={7} mx={4} mb={4}>
      {/* Navigation  */}
      <Stack direction="row" justifyContent="space-between">
        <Link href="/">
          <Stack direction="row" spacing={2}>
            <ArrowBackIcon />
            <Typography variant="h5">Back to Map</Typography>
          </Stack>
        </Link>
        <Link href="/">
          <Stack direction="row" spacing={2}>
            <EditOutlinedIcon />
            <Typography variant="h5">Edit Fridge</Typography>
          </Stack>
        </Link>
      </Stack>

      {/* Fridge Picture + Name + Location  */}
      <Stack>
        <Image
          src={props.fridge.photoURL}
          alt="Picture of the fridge"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </Stack>

      <Stack spacing={3}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h2">{props.fridge.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          {props.fridge.tags.map((tag) => (
            <Chip label={`#${tag}`} key={tag} />
          ))}
        </Stack>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between">
        <Button
          aria-label="directions"
          variant="outlined"
          sx={{ width: '47%' }}
        >
          <DirectionsOutlinedIcon sx={{ pr: 1 }} />
          Directions
        </Button>
        <Button aria-label="share" variant="outlined" sx={{ width: '47%' }}>
          <MobileScreenShareOutlinedIcon sx={{ pr: 1 }} />
          Share
        </Button>
      </Stack>

      <Stack direction="row" spacing={5} alignItems="center">
        <LocationOnOutlinedIcon />
        <Typography variant="h5" color="text.secondary">
          {props.fridge.location.street}, {props.fridge.location.city},{' '}
          {props.fridge.location.state} {props.fridge.location.zip}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={5}>
        <InfoOutlinedIcon />
        <Stack direction="column">
          <Typography variant="h4">Info:</Typography>
          <Typography variant="h5" color="text.secondary">
            {props.fridge.notes}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center">
        <InstagramIcon />
        <Link
          href={`https://www.instagram.com/${props.fridge.maintainer.instagram}/`}
        >
          <Typography variant="h5" color="text.secondary">
            @{props.fridge.maintainer.instagram}
          </Typography>
        </Link>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center">
        <LanguageIcon />
        <Link href={props.fridge.maintainer.website}>
          <Typography variant="h5" color="text.secondary">
            {props.fridge.maintainer.website}
          </Typography>
        </Link>
      </Stack>

      <Divider style={{ width: '100%' }} />

      <Stack>
        <Image
          src={props.report.foodPhotoURL}
          alt="Picture of the food within the fridge"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </Stack>

      <Stack direction="row" spacing={5} alignItems="center">
        <CalendarMonthIcon />
        <Stack direction="row" spacing={2}>
          <Typography variant="h4">Last Update:</Typography>
          <Typography variant="h5" color="text.secondary">
            {date}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={5}>
        <StatusIcon />
        <Stack direction="row" spacing={2}>
          <Typography variant="h4">Status:</Typography>
          <Typography variant="h5">{props.report.operation}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={5}>
        <KitchenIcon />
        <Stack direction="column">
          <Typography variant="h4">Food Available:</Typography>
          <Typography variant="h5">
            {props.report.foodPercentage === 0
              ? 'Empty'
              : props.report.foodPercentage > 0 &&
                props.report.foodPercentage <= 25
              ? 'Few items'
              : props.report.foodPercentage > 25 &&
                props.report.foodPercentage < 100
              ? 'Many Items'
              : 'Full'}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={5}>
        <ChatBubbleOutlineOutlinedIcon />
        <Stack direction="column" spacing={1}>
          <Typography variant="h4">Notes:</Typography>
          <Typography variant="h5" color="text.secondary">
            {props.report.notes}
          </Typography>
        </Stack>
      </Stack>

      <Button aria-label="update fridge" variant="contained" sx={{ py: 3 }}>
        Update Fridge
      </Button>
    </Stack>
  );
}

FridgeDetailed.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  foodPhoto: PropTypes.string.isRequired,
  fridgePolicy: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  foodAvailable: PropTypes.number.isRequired,
};
