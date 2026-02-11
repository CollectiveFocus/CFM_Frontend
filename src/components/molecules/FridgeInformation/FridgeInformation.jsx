import Image from 'next/legacy/image';
import AnchorLink from 'next/link';
import {
  Button,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { ButtonLink, SoftWrap } from 'components/atoms';

import { applyAlpha, designColor } from 'theme/palette';

// Icons
import {
  ArrowBack as ArrowBackIcon,
  CalendarMonth as CalendarMonthIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  DirectionsOutlined as DirectionsOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  Instagram as InstagramIcon,
  KitchenOutlined as KitchenIcon,
  Language as LanguageIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  MobileScreenShareOutlined as MobileScreenShareOutlinedIcon,
} from '@mui/icons-material';
import { StatusIcon } from 'theme/icons';

import PropTypes from 'prop-types';
import typesView from 'model/view/prop-types';

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
    text: 'Fridge needs repairs',
    color: 'error',
  },
  'not at location': {
    text: 'Fridge is no longer at location',
    color: 'warning',
  },
  ghost: {
    text: 'Fridge is permanently unavailable',
    color: 'error',
  },
};

function BackToMapHeader() {
  return (
    <Box sx={{ width: '100%', position: 'relative', pt: 4 }}>
      <AnchorLink
        href="/browse"
        aria-label="Clicking returns to map view"
        style={{
          display: 'flex',
          alignItems: 'center', // ensures vertical centering
          textDecoration: 'none',
          color: applyAlpha('cc', designColor.neroGray),
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        <Typography sx={{ fontWeight: 500 }}>Back to map</Typography>
      </AnchorLink>
    </Box>
  );
}

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
  condition: typesView.fields.report.condition,
};

function CaptionComponent({ caption }) {
  return caption ? (
    <Typography
      variant="body1"
      component="span"
      sx={{ display: 'inline-block', fontWeight: 600, mr: 2 }}
    >
      {caption}:
    </Typography>
  ) : null;
}
CaptionComponent.propTypes = {
  caption: PropTypes.string,
};

function InformationLine({ icon, text, caption = null }) {
  const IconComponent = icon;

  return (
    <Stack direction="row" alignItems="center">
      <IconComponent
        sx={{
          mr: 2,
          fontSize: '22pt',
          verticalAlign: 'text-bottom',
        }}
      />
      <Typography variant="body1">
        <CaptionComponent caption={caption} />
        <SoftWrap text={text} />
      </Typography>
    </Stack>
  );
}
InformationLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

function ImageContainer({ src = null, alt, isAboveFold = false }) {
  if (src) {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxHeight: { xs: 300, md: 345 },
          aspectRatio: '1 / 1.15',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          priority={isAboveFold}
        />
      </Box>
    );
  } else return null;
}
ImageContainer.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  isAboveFold: PropTypes.bool,
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
  tags: typesView.fields.fridge.tags,
};

function LinkLine({ icon, obj, url }) {
  if (obj) {
    const IconComponent = icon;

    if (url === 'instagram' && obj.instagram) {
      const instagramRegex =
        /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
      const insta = instagramRegex.exec(obj.instagram);
      return (
        <Stack direction="row" alignItems="center">
          <IconComponent sx={{ fontSize: '22pt', mr: 2 }} />
          <Link href={obj.instagram} variant="body1">
            {`@${insta[1]}`}
          </Link>
        </Stack>
      );
    }
    if (url === 'website' && obj.website) {
      return (
        <Stack direction="row" alignItems="center">
          <IconComponent sx={{ fontSize: '22pt', mr: 2 }} />
          <Link href={obj.website} variant="body1">
            {obj.website}
          </Link>
        </Stack>
      );
    }
  } else return null;
}
LinkLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  obj: typesView.fields.fridge.maintainer,
  url: PropTypes.string.isRequired,
};

function NotesLine({ icon, caption, text = null }) {
  if (text) {
    const IconComponent = icon;
    return (
      <Stack direction="row">
        <IconComponent sx={{ fontSize: '22pt', mr: 2 }} />
        <Stack direction="column">
          <CaptionComponent caption={caption} />
          <Typography variant="body1" component="p" sx={{ display: 'block' }}>
            {text}
          </Typography>
        </Stack>
      </Stack>
    );
  } else return null;
}
NotesLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  caption: PropTypes.string.isRequired,
  text: PropTypes.string,
};

function FridgeContainer({ fridge }) {
  if (fridge) {
    const {
      name,
      location,
      tags = null,
      maintainer = null,
      photoUrl = '/feedback/happyFridge.svg',
      notes = null,
    } = fridge;

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
        <BackToMapHeader />

        {/* Fridge Picture + Name + Location  */}
        <ImageContainer
          src={photoUrl}
          alt="Picture of the fridge"
          isAboveFold={true}
        />

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
        <NotesLine icon={InfoOutlinedIcon} caption="Info" text={notes} />
        <LinkLine icon={InstagramIcon} obj={maintainer} url="instagram" />
        <LinkLine icon={LanguageIcon} obj={maintainer} url="website" />
      </>
    );
  } else return null;
}
FridgeContainer.propTypes = {
  fridge: typesView.Fridge,
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

    const reportDate = new Date(timestamp).toLocaleTimeString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const foodAvailable = {
      0: 'Empty',
      1: 'Few items',
      2: 'Many Items',
      3: 'Full',
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
          caption="Notes"
          text={notes}
        />
      </>
    );
  } else return null;
}
ReportContainer.propTypes = {
  report: typesView.Report,
};

export default function FridgeInformation({ fridge, report }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { md: 900 },
        mx: 'auto',
        px: { xs: 4, sm: 6 },
        mb: 4,
      }}
    >
      <Stack direction="column" spacing={5}>
        {FridgeContainer({ fridge })}
        {ReportContainer({ report })}

        <ButtonLink
          aria-label="Click to report the status of the fridge"
          variant="contained"
          to={`/user/fridge/report/${fridge.id}`}
          title="Update Status"
        />
      </Stack>
    </Box>
  );
}
FridgeInformation.propTypes = {
  fridge: typesView.Fridge,
  report: typesView.Report,
};
