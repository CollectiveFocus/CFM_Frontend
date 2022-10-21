import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  Typography,
} from '@mui/material';
import typesValidation from './prop-types';

export default function PanelConfirm({
  confirmBtnTxt,
  handleBack,
  handleNext,
}) {
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
            If all the details are correct, please select ADD FRIDGE to confirm.
          </Typography>
          <Stack
            direction={{ md: 'row-reverse', xs: 'column' }}
            justifyContent="space-between"
            spacing={4}
            pt={4}
          >
            <Button
              aria-label="Click to add fridge"
              variant="contained"
              sx={{ width: { md: '345px', xs: '100%' } }}
              onClick={handleConfirm}
            >
              {confirmBtnTxt}
            </Button>
            <Button
              aria-label="Click to cancel adding a new fridge"
              sx={{ width: { md: '345px', xs: '100%' } }}
              variant="outlined"
            >
              CANCEL
            </Button>
          </Stack>
        </Stack>
      </StepContent>
    </>
  );
}
PanelConfirm.propTypes = {
  confirmBtnTxt: PropTypes.oneOf(['ADD FRIDGE', 'SUBMIT REPORT']),
};
PanelConfirm.propTypes = typesValidation.Panel;
