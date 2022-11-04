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

import PropTypes from 'prop-types';
import typesValidation from 'model/data/fridge/prop-types';

const enumCondition = {
  good: {
    text: 'Fridge is working properly',
    color: 'success',
  },
  dirty: {
    text: 'Fridge is dirty',
    color: 'info',
  },
  'out of order': {
    text: 'Fridge is not working properly',
    color: 'error',
  },
  'not at location': {
    text: 'No fridge at this address',
    color: 'warning',
  },
  'ghost': {
    text: 'Fridge is permanently unavailable',
    color: 'error',
  },
  
};

function FridgeStatusIcon({ condition }) {
  const color = enumCondition[condition].color;
  return (
    <StatusIcon
      color={color}
      sx={{ mr: 3, fontSize: '20pt', verticalAlign: 'text-bottom' }}
    />
  );
}
FridgeStatusIcon.propTypes = {
  condition: typesValidation.ReportCondition,
};

function InformationLine({ icon, text, caption = null }) {
  const IconComponent = icon;
  const CaptionComponent = (caption) =>
    caption ? (
      <Box component="span" sx={{ fontWeight: 600, mr: 2 }}>
        {caption}:
      </Box>
    ) : null;
  return (
    <Typography variant="body1">
      <IconComponent
        sx={{ mr: 2, fontSize: '22pt', verticalAlign: 'text-bottom' }}
      />
      {CaptionComponent(caption)}
      {text}
    </Typography>
  );
}
InformationLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

function ImageContainer({ src = null, alt }) {
  if (src) {
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
  return null;
}
ImageContainer.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

function TagsContainer({ tags }) {
  if (tags) {
    return (
      <Stack direction="row" spacing={2}>
        {tags.map((tag) => (
          <Chip label={`#${tag}`} key={tag} />
        ))}
      </Stack>
    );
  } else return null;
}
TagsContainer.propTypes = {
  tags: typesValidation.Tags,
};

function LinkLine({ icon, obj, url }) {
  if (obj) {
    const IconComponent = icon;

    if (url === 'instagram' && obj.instagram) {
      const instagramRegex =
        /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
      const insta = instagramRegex.exec(obj.instagram);
      return (
        <Stack direction="row" spacing={5} alignItems="center">
          <IconComponent />
          <Link href={obj.instagram}>
            <Typography variant="body1">{`@${insta[1]}`}</Typography>
          </Link>
        </Stack>
      );
    }
    if (url === 'website' && obj.website) {
      return (
        <Stack direction="row" spacing={5} alignItems="center">
          <IconComponent />
          <Link href={obj.website}>
            <Typography variant="body1">{obj.website}</Typography>
          </Link>
        </Stack>
      );
    }
  } else return null;
}
LinkLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  obj: typesValidation.Maintainer,
  url: PropTypes.string.isRequired,
};

function NotesLine({ icon, text, link = null }) {
  if (link) {
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
  } else return null;
}
NotesLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

function FridgeContainer({ fridge }) {
  if (fridge) {
    const {
      name,
      location,
      tags = null,
      maintainer = null,
      photoUrl = null,
      notes = null,
    } = fridge;
    // if (fridge['photoUrl'] == null) {
    //   fridge['photoUrl'] = '/hero/logo.png'
    // }

    const shareResponse = () => {
      if (navigator.share) {
        navigator
          .share({
            title: `${name}`,
            url: `${location.href}`,
          })
          .catch(console.error);
      }
    };
    const address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;

    return (
      <>
        {/* Fridge Picture + Name + Location  */}
        <ImageContainer src={photoUrl} alt="Picture of the fridge" />

        <Stack spacing={3}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h2">{name}</Typography>
          </Stack>
          <TagsContainer tags={tags} />
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
        <NotesLine icon={InfoOutlinedIcon} text="Info" link={notes} />
        <LinkLine icon={InstagramIcon} obj={maintainer} url="instagram" />
        <LinkLine icon={LanguageIcon} obj={maintainer} url="website" />
      </>
    );
  } else return null;
}
FridgeContainer.propTypes = {
  fridge: typesValidation.Fridge,
};

function ReportContainer({ report }) {
  if (report) {
    const {
      timestamp,
      condition,
      foodPercentage,
      photoUrl = null,
      notes = null,
    } = report;

    const reportDate = new Date(timestamp).toLocaleDateString();

    const foodAvailable = {
      0: 'Empty',
      33: 'Few items',
      66: 'Many Items',
      100: 'Full',
    }[foodPercentage];

    return (
      <>
        <Divider style={{ width: '100%' }} />

        <ImageContainer
          src={photoUrl}
          alt="Picture of the food within the fridge"
        />

        <InformationLine
          icon={CalendarMonthIcon}
          caption="Reported on"
          text={reportDate}
        />
        <InformationLine
          icon={() => FridgeStatusIcon({ condition })}
          caption="Fridge Status"
          text={enumCondition[condition].text}
        />
        <InformationLine
          icon={KitchenIcon}
          caption="Food Available"
          text={foodAvailable}
        />

        <NotesLine
          icon={ChatBubbleOutlineOutlinedIcon}
          text="Notes"
          link={notes}
        />
      </>
    );
  } else return null;
}
ReportContainer.propTypes = {
  report: typesValidation.Report,
};

export default function FridgeInformation({ fridge, report }) {
  return (
    <Stack direction="column" spacing={7} mx={4} mb={4}>
      {/* Navigation  */}
      <Stack direction="row" justifyContent="space-between">
        {/* <Backtrack /> */}
        {/* <Link href="/demo/CreateFridgeDialog">
          <Stack direction="row" spacing={2}>
            <EditOutlinedIcon />
            <Typography variant="body1">Edit Fridge</Typography>
          </Stack>
        </Link> */}
      </Stack>

      {FridgeContainer({ fridge })}
      {ReportContainer({ report })}

      <Button
        aria-label="Click to report the status of the fridge"
        variant="contained"
        sx={{ py: 3 }}
        href={`/user/fridge/report/${fridge.id}`}
        LinkComponent={Link}
      >
        Report Status
      </Button>
    </Stack>
  );
}
FridgeInformation.propTypes = {
  fridge: typesValidation.Fridge,
  report: typesValidation.Report,
};
