import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import {
  WarningAmberRounded as ErrorIcon,
  TaskAltRounded as SuccessIcon,
} from '@mui/icons-material';
import { ButtonLink } from 'components/atoms';

const sxSuccessIcon = { fontSize: '1.1em', verticalAlign: 'top' };
const sxErrorIcon = { fontSize: '1.3em', verticalAlign: 'text-bottom' };
const displayHeading = {
  EmailSuccess: (
    <>
      Success! <SuccessIcon color="success" sx={sxSuccessIcon} />
    </>
  ),
  EmailError: (
    <>
      Error! <ErrorIcon color="error" sx={sxErrorIcon} />
    </>
  ),
  ReportStatus: (
    <>
      Success! <SuccessIcon color="success" sx={sxSuccessIcon} />
    </>
  ),
  CreateFridge: (
    <>
      Success! <SuccessIcon color="success" sx={sxSuccessIcon} />
    </>
  ),
};

const displayText = {
  EmailSuccess: 'Your email was sent.',
  EmailError: 'Your email was not sent.',
  ReportStatus: 'You have successfully submitted a status report!',
  CreateFridge: 'You have successfully added a fridge listing!',
};

const displayImg = {
  EmailSuccess: {
    src: '/feedback/emailSuccess.svg',
    width: 313,
    height: 280,
    alt: 'Email success image',
  },
  EmailError: {
    src: '/feedback/emailError.svg',
    width: 163,
    height: 245,
    alt: 'Email error image',
  },
  ReportStatus: {
    src: '/feedback/happyFridge.svg',
    width: 163,
    height: 245,
    alt: 'Happy fridge image',
  },
  CreateFridge: {
    src: '/feedback/happyFridge.svg',
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
      size="wide"
      sx={{ mt: 8, mb: 2 }}
    >
      BACK TO HOME
    </ButtonLink>
  ),
  EmailError: null,
  ReportStatus: (
    <ButtonLink
      to="#"
      aria-label="View Fridge details"
      variant="contained"
      size="wide"
      sx={{ mt: 8, mb: 2 }}
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
        size="wide"
        sx={{ mt: 8, mb: 2 }}
      >
        GO TO FRIDGE
      </ButtonLink>
      <ButtonLink
        to="#"
        aria-label="Edit Fridge details"
        variant="outlined"
        size="wide"
        sx={{ mb: 2, mt: 6 }}
      >
        EDIT FRIDGE
      </ButtonLink>
    </>
  ),
};

export default function FeedbackCard({ type, action = null }) {
  /**
   * TODO This is a temporary bypass until I figure out how the other dialogs handle failure. There is no point in implementing a Button factory until then -- Bernard
   */
  if (type === 'EmailError') {
    if (action) {
      displayButton[type] = (
        <Button
          onClick={action}
          aria-label="Click to resend message"
          variant="contained"
          size="wide"
          sx={{ mt: 8, mb: 2 }}
        >
          TRY AGAIN
        </Button>
      );
    } else {
      throw 'Missing EmailError callback function';
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography textAlign="center" variant="h1" sx={{ marginTop: 4 }}>
        {displayHeading[type]}
      </Typography>
      <Typography textAlign="center" variant="body1" sx={{ mb: 4 }}>
        {displayText[type]}
      </Typography>
      <Image alt="" {...displayImg[type]} />
      {displayButton[type]}
    </Box>
  );
}
FeedbackCard.propTypes = {
  type: PropTypes.oneOf([
    'ReportStatus',
    'CreateFridge',
    'EmailSuccess',
    'EmailError',
  ]),
  action: PropTypes.func,
};
