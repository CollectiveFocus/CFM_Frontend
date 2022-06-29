import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Divider, Stack, Typography } from '@mui/material';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import MobileScreenShareOutlinedIcon from '@mui/icons-material/MobileScreenShareOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { StatusIcon } from 'theme/icons';

export default function FridgeDetailed({
  img,
  fridgeName,
  subTitle,
  address,
  instagram,
  website,
  update,
  notes,
  info,
  status,
  altImg,
}) {
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
        <Image {...img} />
      </Stack>

      <Stack direction="column" spacing={1}>
        <Typography variant="h2">{fridgeName}</Typography>
        <Typography variant="h5">{subTitle}</Typography>
      </Stack>

      <Divider />

      {/* Fridge Interactive Buttons  */}
      <Stack direction="row" justifyContent="space-between">
        <Button variant="outlined" sx={{ width: '47%' }}>
          <DirectionsOutlinedIcon sx={{ pr: 1 }} />
          Directions
        </Button>
        <Button variant="outlined" sx={{ width: '47%' }}>
          <MobileScreenShareOutlinedIcon sx={{ pr: 1 }} />
          Share
        </Button>
      </Stack>

      <Stack direction="row" spacing={5} alignItems="center">
        <LocationOnOutlinedIcon />
        <Typography variant="h5" color="text.secondary">
          {address}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center">
        <InstagramIcon />
        <Typography variant="h5" color="text.secondary">
          @{instagram}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center">
        <LanguageIcon />
        <Typography variant="h5" color="text.secondary">
          {website}
        </Typography>
      </Stack>

      <Divider style={{ width: '100%' }} />

      <Button variant="contained" sx={{ py: 3 }}>
        Update Fridge
      </Button>
      <Stack direction="row" spacing={2} alignItems="center">
        <CalendarMonthIcon />
        <Typography variant="h4">Last Update:</Typography>
        <Typography variant="h5" color="text.secondary">
          {update}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ChatBubbleOutlineOutlinedIcon />
        <Stack direction="column">
          <Typography variant="h4">Notes:</Typography>
          <Typography variant="h5" color="text.secondary">
            {notes}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <InfoOutlinedIcon />
        <Stack direction="column">
          <Typography variant="h4">Info:</Typography>
          <Typography variant="h5" color="text.secondary">
            {info}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <StatusIcon />
        <Stack direction="column">
          <Typography variant="h4">Status:</Typography>
          <Typography variant="h5">{status}</Typography>
        </Stack>
      </Stack>

      <Stack>
        <Image {...altImg} />
      </Stack>
    </Stack>
  );
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

FridgeDetailed.propTypes = {
  img: PropTypes.shape(imgShape).isRequired,
  fridgeName: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  update: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  altImg: PropTypes.shape(imgShape).isRequired,
};
