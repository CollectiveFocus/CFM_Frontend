import PropTypes from 'prop-types';
import typesValidation from 'schema/api/fridge/prop-types';
import {
  uiAttributeCondition,
  uiAttributeFoodPercentage,
} from 'schema/api/fridge';

import { mergeDeep } from 'lib/dataStructure';

import Image from 'next/image';
import {
  Box,
  Button,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';

// Icons
import {
  CalendarMonth as ReportDateIcon,
  ChatBubbleOutlineOutlined as ReportNotesIcon,
  DirectionsOutlined as DirectionsIcon,
  InfoOutlined as FridgeNotesIcon,
  Instagram as InstagramIcon,
  Kitchen as FoodAvailableIcon,
  Language as WebsiteIcon,
  LocationOnOutlined as AddressIcon,
  MobileScreenShareOutlined as SharePageIcon,
} from '@mui/icons-material';
import { StatusIcon } from 'theme/icons';

function StatusIconDecorator({ condition }) {
  const color = uiAttributeCondition[condition].color;

  return (props) => {
    return <StatusIcon {...mergeDeep({}, props, { sx: { color } })} />;
  };
}
StatusIconDecorator.propTypes = {
  condition: typesValidation.ReportCondition.isRequired,
};

function CaptionText({ caption }) {
  return caption ? (
    <Box component="span" sx={{ fontWeight: 600, mr: 2 }}>
      {caption}:
    </Box>
  ) : null;
}
CaptionText.propTypes = {
  caption: PropTypes.string,
};

function IconStyled({ icon }) {
  const IconComponent = icon;
  return (
    <IconComponent
      sx={{
        m: 0,
        p: 0,
        mr: 2,
        fontSize: '1.8em',
        verticalAlign: 'middle',
      }}
    />
  );
}
IconStyled.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

// --- lines
function InformationLine({ icon, caption, text }) {
  return text ? (
    <Typography variant="body1">
      {IconStyled({ icon })}
      {CaptionText({ caption })}
      {text}
    </Typography>
  ) : null;
}
InformationLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  caption: PropTypes.string,
  text: PropTypes.string.isRequired,
};

function NotesLine({ icon, caption, notes }) {
  return notes ? (
    <Typography variant="body1">
      {IconStyled({ icon })}
      {CaptionText({ caption })}
      <Box
        component="p"
        sx={{
          m: 0,
          ml: 2,
          p: 0,
          pl: '1.8em',
        }}
      >
        {notes}
      </Box>
    </Typography>
  ) : null;
}
NotesLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  caption: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};

function LinkLine({ icon, instagram = null, website = null }) {
  let link, text;
  if (instagram) {
    link = instagram;
    // assume valid url: https: / /instagram.com /theneighborhoodfridge
    //                   0      ,1,2             ,3
    text = instagram.split('/')[3];
    text = text ? '@' + text : 'http://instagram.com/';
  } else if (website) {
    link = website;
    text = website;
  } else {
    return null;
  }
  return (
    <Typography variant="body1">
      {IconStyled({ icon })}
      <Link href={link}>{text}</Link>
    </Typography>
  );
}
LinkLine.propTypes = {
  icon: PropTypes.elementType.isRequired,
  instagram: PropTypes.string,
  website: PropTypes.string,
};
// ---

function ImageContainer({ photoUrl, alt }) {
  return photoUrl ? (
    <Stack>
      <Image
        src={photoUrl}
        alt={alt}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </Stack>
  ) : null;
}
ImageContainer.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function TagsContainer({ tags }) {
  return tags ? (
    <Stack direction="row" spacing={2}>
      {tags.map((tag) => (
        <Chip label={'#' + tag} key={tag} />
      ))}
    </Stack>
  ) : null;
}
TagsContainer.propTypes = {
  tags: typesValidation.Tags,
};

function FridgeContainer({ fridge }) {
  if (!fridge) return null;

  const {
    name,
    location,
    tags = null,
    maintainer = {},
    photoUrl = null,
    notes = null,
  } = fridge;
  const { instagram = null, website = null } = maintainer;
  const address = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;
  const urlGoogleMapAddress =
    'https://www.google.com/maps/place/' + encodeURI(address);
  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        url: 'this page',
      });
    }
  };

  return (
    <>
      {ImageContainer({ photoUrl, alt: 'Photo of ' + name })}

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
          href={urlGoogleMapAddress}
        >
          <DirectionsIcon sx={{ pr: 1 }} />
          Directions
        </Button>
        <Button
          aria-label="Click to share this page"
          variant="outlined"
          sx={{ width: '47%' }}
          onClick={sharePage}
        >
          <SharePageIcon sx={{ pr: 1 }} />
          Share
        </Button>
      </Stack>

      {InformationLine({ icon: AddressIcon, caption: null, text: address })}
      {NotesLine({
        icon: FridgeNotesIcon,
        caption: 'Location Information',
        notes,
      })}
      {LinkLine({ icon: InstagramIcon, instagram })}
      {LinkLine({ icon: WebsiteIcon, website })}
    </>
  );
}
PropTypes.FridgeContainer = typesValidation.Fridge;

function ReportContainer({ report }) {
  if (!report) return null;
  const {
    timestamp,
    condition,
    foodPercentage,
    photoUrl = null,
    notes = null,
  } = report;
  const reportDate = new Date(timestamp).toLocaleDateString();

  return (
    <>
      {ImageContainer({ photoUrl, alt: 'Photo of fridge contents' })}

      {InformationLine({
        icon: ReportDateIcon,
        caption: 'Status Date',
        text: reportDate,
      })}
      {InformationLine({
        icon: StatusIconDecorator({ condition }),
        caption: 'Status',
        text: uiAttributeCondition[condition].text,
      })}
      {InformationLine({
        icon: FoodAvailableIcon,
        caption: 'Contents',
        text: uiAttributeFoodPercentage[foodPercentage].text,
      })}
      {NotesLine({ icon: ReportNotesIcon, caption: 'Notes', notes })}
    </>
  );
}
PropTypes.ReportContainer = typesValidation.Report;

export default function FridgeInformation({ fridge, report }) {
  return (
    <Stack direction="column" spacing={7} mx={4} mb={4}>
      {FridgeContainer({ fridge })}
      {fridge && report ? <Divider sx={{ width: '100%' }} /> : null}
      {ReportContainer({ report })}
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
FridgeInformation.propTypes = {
  fridge: typesValidation.Fridge,
  report: typesValidation.Report,
};
