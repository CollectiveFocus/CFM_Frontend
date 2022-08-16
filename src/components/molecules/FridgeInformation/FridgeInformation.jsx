import PropTypes from 'prop-types';
import Image from 'next/image';
import {
  Button,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
  Box,
} from '@mui/material';

// Icons
import {
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

import Backtrack from '../Backtrack';

function FridgeStatusIcon(props) {
  return (
    <StatusIcon
      color="success"
      sx={{ mr: 3, fontSize: '20pt', verticalAlign: 'text-bottom' }}
    />
  );
}

function InformationLine({ icon, text, caption = null, link = null }) {
  const IconComponent = icon;
  const CaptionComponent = ({ str }) =>
    str ? (
      <Box component="span" sx={{ fontWeight: 600, mr: 2 }}>
        {str}:
      </Box>
    ) : null;
  return (
    <Typography variant="body1">
      <IconComponent
        sx={{ mr: 2, fontSize: '22pt', verticalAlign: 'text-bottom' }}
      />
      <CaptionComponent str={caption} />
      {text}
    </Typography>
  );
}

function ImageContainer({ src, alt }) {
  return (
    <Stack>
      <Image
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </Stack>
  );
}

function LinkLine({ icon, link, text = null }) {
  const IconComponent = icon;
  return (
    <Stack direction="row" spacing={5} alignItems="center">
      <IconComponent />
      <Link href={link}>
        <Typography variant="body1">{text ? `@${text}` : link}</Typography>
      </Link>
    </Stack>
  );
}

function NotesLine({ icon, text, link }) {
  const IconComponent = icon;
  return (
    <Stack direction="row">
      <IconComponent
        sx={{ mr: 3, fontSize: '20pt', verticalAlign: 'text-bottom' }}
      />
      <Stack direction="column">
        <Typography variant="body1">
          <Box component="span" sx={{ fontWeight: 600 }}>
            {text}
          </Box>
          :
        </Typography>
        <Typography variant="body1">{link}</Typography>
      </Stack>
    </Stack>
  );
}

export default function FridgeInformation(props) {
  const { fridge, report } = props;
  const address = `${fridge.location.street}, ${fridge.location.city}, ${fridge.location.state} ${fridge.location.zip}`;
  const reportDate = new Date(report.timestamp).toLocaleDateString();

  const instagramRegex =
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;

  const shortenedInstagram = instagramRegex.exec(fridge.maintainer.instagram);

  const fridgeStatus = {
    good: 'Fridge is working properly',
    dirty: 'Fridge is dirty',
    'out of order': 'Fridge is not working properly',
    'not at location': 'No fridge at this address',
  }[report.operation];
  const foodAvailable = {
    0: 'Empty',
    33: 'Few items',
    66: 'Many Items',
    100: 'Full',
  }[report.foodPercentage];

  const shareResponse = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${fridge.name}`,
          url: `${location.href}`,
        })
        .catch(console.error);
    }
  };

  return (
    <Stack direction="column" spacing={7} mx={4} mb={4}>
      {/* Navigation  */}
      <Stack direction="row" justifyContent="space-between">
        {/* <Backtrack /> */}
        <Link href="/demo/CreateFridgeDialog">
          <Stack direction="row" spacing={2}>
            <EditOutlinedIcon />
            <Typography variant="body1">Edit Fridge</Typography>
          </Stack>
        </Link>
      </Stack>

      {/* Fridge Picture + Name + Location  */}
      <ImageContainer src={fridge.photoURL} alt="Picture of the fridge" />

      <Stack spacing={3}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h2">{fridge.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          {fridge.tags.map((tag) => (
            <Chip label={`#${tag}`} key={tag} />
          ))}
        </Stack>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between">
        <Button
          aria-label="Click to get directions to the fridge"
          variant="outlined"
          sx={{ width: '47%' }}
          target="_blank"
          href={encodeURI(`https://www.google.com/maps/place/${address}`)}
        >
          <DirectionsOutlinedIcon sx={{ pr: 1 }} />
          Directions
        </Button>
        <Button
          aria-label="Click to share this page"
          variant="outlined"
          sx={{ width: '47%' }}
          onClick={shareResponse}
        >
          <MobileScreenShareOutlinedIcon sx={{ pr: 1 }} />
          Share
        </Button>
      </Stack>

      <InformationLine icon={LocationOnOutlinedIcon} text={address} />
      <NotesLine icon={InfoOutlinedIcon} text="Info" link={fridge.notes} />
      <LinkLine
        icon={InstagramIcon}
        link={fridge.maintainer.instagram}
        text={shortenedInstagram[1]}
      />
      <LinkLine icon={LanguageIcon} link={fridge.maintainer.website} />

      <Divider style={{ width: '100%' }} />

      <ImageContainer
        src={report.foodPhotoURL}
        alt="Picture of the food within the fridge"
      />

      <InformationLine
        icon={CalendarMonthIcon}
        caption="Reported on"
        text={reportDate}
      />
      <InformationLine
        icon={FridgeStatusIcon}
        caption="Fridge Status"
        text={fridgeStatus}
      />
      <InformationLine
        icon={KitchenIcon}
        caption="Food Available"
        text={foodAvailable}
      />

      <NotesLine
        icon={ChatBubbleOutlineOutlinedIcon}
        text="Notes"
        link={report.notes}
      />

      <Button
        aria-label="Click to report the status of the fridge"
        variant="contained"
        sx={{ py: 3 }}
      >
        Report Status
      </Button>
    </Stack>
  );
}
