import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  Typography,
} from '@mui/material';
import typesValidation from './prop-types';

export default function PanelConfirm(props) {
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
          <Stack direction="column" spacing={4} pt={4}>
            <Button
              aria-label="Click to add fridge"
              variant="contained"
              sx={{ py: 3 }}
            >
              ADD FRIDGE
            </Button>
            <Button
              aria-label="Click to cancel adding a new fridge"
              sx={{ py: 3 }}
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
PanelConfirm.propTypes = typesValidation.Panel;
