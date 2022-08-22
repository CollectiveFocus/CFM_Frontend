import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { ButtonLink } from 'components/molecules';

const displayHeading = {
  EmailSuccess: (
    <>
      Success! <TaskAltRoundedIcon color="success" />
    </>
  ),
  EmailError: (
    <>
      Error! <WarningAmberRoundedIcon />
    </>
  ),
  ReportStatus: <>Success!</>,
  CreateFridge: <>Success!</>,
};

const displayText = {
  EmailSuccess: 'Your email was sent.',
  EmailError: 'Your email was not sent.',
  ReportStatus: 'You have successfully submitted a status report!',
  CreateFridge: 'You have successfully added a community fridge listing!',
};

const displayImg = {
  EmailSuccess: {
    src: '/mascot/fridgeEmailSuccess.svg',
    width: 313,
    height: 280,
    alt: 'Happy fridge image',
  },
  EmailError: {
    src: '/mascot/fridgeEmailError.svg',
    width: 163,
    height: 244,
    alt: 'Sad fridge image',
  },
  ReportStatus: {
    src: '/mascot/happyFridge.svg',
    width: 163,
    height: 245,
    alt: 'Happy fridge image',
  },
  CreateFridge: {
    src: '/mascot/happyFridge.svg',
    width: 163,
    height: 245,
    alt: 'Happy fridge image',
  },
};

const displayButton = {
  EmailSuccess: (
    <ButtonLink
      to="/"
      aria-label="Go to Home page"
      variant="contained"
      sx={{ mb: 2, minWidth: 345 }}
    >
      BACK TO HOME
    </ButtonLink>
  ),
  EmailError: (
    <ButtonLink
      to="/contact"
      aria-label="Resubmit message"
      variant="contained"
      sx={{ mb: 2, minWidth: 345 }}
    >
      TRY AGAIN
    </ButtonLink>
  ),
  ReportStatus: (
    <ButtonLink
      to="#"
      aria-label="View Fridge details"
      variant="contained"
      sx={{ mb: 2, minWidth: 345 }}
    >
      GO TO FRIDGE
    </ButtonLink>
  ),
  CreateFridge: (
    <>
      <ButtonLink
        to="#"
        aria-label="View Fridge details"
        variant="contained"
        sx={{ mb: 2, minWidth: 345 }}
      >
        GO TO FRIDGE
      </ButtonLink>
      <ButtonLink
        to="#"
        aria-label="Edit Fridge details"
        variant="outlined"
        sx={{ mb: 2, mt: 6, minWidth: 345 }}
      >
        EDIT FRIDGE
      </ButtonLink>
    </>
  ),
};

export default function FeedbackMessage({ type }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Typography
          sx={type === 'EmailError' ? { color: 'red' } : {}}
          textAlign="center"
          variant="h2"
        >
          {displayHeading[type]}
        </Typography>
        <Typography textAlign="center" variant="body1" sx={{ mb: 4 }}>
          {displayText[type]}
        </Typography>

        <Box
          sx={{
            mb: 8,
            display: 'flex',
            alignItems: 'flex-end',
            minHeight: 280,
          }}
        >
          <Image
            width={displayImg[type].width}
            height={displayImg[type].height}
            src={displayImg[type].src}
            alt={displayImg[type].alt}
          />
        </Box>
      </Box>
      {displayButton[type]}
    </Box>
  );
}

FeedbackMessage.propTypes = {
  type: PropTypes.oneOf([
    'ReportStatus',
    'CreateFridge',
    'EmailSuccess',
    'EmailError',
  ]),
};
