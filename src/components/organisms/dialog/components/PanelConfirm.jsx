import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  Typography,
} from '@mui/material';
import typesValidation from './prop-types';

export default function PanelConfirm({ buttonTitle, handleBack, handleNext }) {
  buttonTitle = buttonTitle.toLowerCase();
  return (
    <>
      <StepLabel>Confirm</StepLabel>
      <StepContent>
        <Stack
          direction="column"
          spacing={3}
          mt={2}
          justifyContent="space-between"
        >
          <Typography variant="h5">
            Verify the details and click {buttonTitle} to confirm.
          </Typography>
          <Stack
            direction={{ md: 'row-reverse', xs: 'column' }}
            justifyContent="space-between"
            spacing={4}
            pt={4}
          >
            <Button
              aria-label={'Click to ' + buttonTitle}
              variant="contained"
              onClick={handleNext}
              sx={{ width: { md: '345px', xs: '100%' } }}
            >
              {buttonTitle}
            </Button>
            <Button
              aria-label="Click to cancel form submission"
              variant="outlined"
              onClick={handleBack}
              sx={{ width: { md: '345px', xs: '100%' } }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </StepContent>
    </>
  );
}
PanelConfirm.propTypes = typesValidation.PanelConfirm;
