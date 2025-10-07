import PropTypes from 'prop-types';
import Image from 'next/legacy/image';
import { Box, Button, Typography } from '@mui/material';
import {
  WarningAmberRounded as ErrorIcon,
  TaskAltRounded as SuccessIcon,
} from '@mui/icons-material';
import { ButtonLink } from 'components/atoms';

const sxSuccessIcon = { fontSize: '1.1em', verticalAlign: 'top' };
const sxErrorIcon = { fontSize: '1.3em', verticalAlign: 'text-bottom' };

const displayHeading = Object.freeze({
  EmailSuccess: (
    <>
      Success! <SuccessIcon color="success" sx={sxSuccessIcon} />
    </>
  ),
  FridgeStatusSuccess: (
    <>
      Success! <SuccessIcon color="success" sx={sxSuccessIcon} />
    </>
  ),
  Error: (
    <>
      Error! <ErrorIcon color="error" sx={sxErrorIcon} />
    </>
  ),
  CreateFridge: (
    <>
      Success! <SuccessIcon color="success" sx={sxSuccessIcon} />
    </>
  ),
});

const displayText = Object.freeze({
  EmailSuccess: 'Your email was sent.',
  FridgeStatusSuccess: 'You have successfully submitted a status report!',
  Error: 'Action required. Error processing request.',
  CreateFridge: 'You have successfully added a fridge listing!',
});

const displayImg = Object.freeze({
  EmailSuccess: {
    src: '/feedback/emailSuccess.svg',
    width: 313,
    height: 280,
    alt: 'Email success image',
  },
  FridgeStatusSuccess: {
    src: '/feedback/happyFridge.svg',
    width: 163,
    height: 245,
    alt: 'Happy fridge image',
  },
  Error: {
    src: '/feedback/emailError.svg',
    width: 163,
    height: 245,
    alt: 'Email error image',
  },
  CreateFridge: {
    src: '/feedback/happyFridge.svg',
    width: 163,
    height: 245,
    alt: 'Happy fridge image',
  },
});

/**
 * Generates a feedback card based on the specified form.
 *
 * @param {string} props.form - The type of feedback to display (e.g., "FridgeStatusSuccess", "EmailSuccess").
 * @param {any} props.slug - Optional data used by the specified form.
 *
 * @returns {JSX.Element} The rendered FeedbackCard component.
 */
export default function FeedbackCard({ form, slug = null }) {
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
    FridgeStatusSuccess: (
      <ButtonLink
        to={slug}
        aria-label="View Fridge status"
        variant="contained"
        size="wide"
        sx={{ mt: 8, mb: 2 }}
      >
        GO TO FRIDGE
      </ButtonLink>
    ),
    Error: (
      <Button
        onClick={slug}
        aria-label="Return to the form and try again"
        variant="contained"
        size="wide"
        sx={{ mt: 8, mb: 2 }}
      >
        TRY AGAIN
      </Button>
    ),
    CreateFridge: (
      <>
        <ButtonLink
          to="#"
          aria-label="View Fridge status"
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
        {displayHeading[form]}
      </Typography>
      <Typography textAlign="center" variant="body1" sx={{ mb: 4 }}>
        {displayText[form]}
      </Typography>
      <Image alt="" {...displayImg[form]} />
      {displayButton[form]}
    </Box>
  );
}
FeedbackCard.propTypes = {
  form: PropTypes.oneOf([
    'EmailSuccess',
    'FridgeStatusSuccess',
    'Error',
    'CreateFridge',
  ]).isRequired,
  slug: PropTypes.any,
};
