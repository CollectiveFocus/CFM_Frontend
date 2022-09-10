import typesValidation from 'schema/api/fridge/prop-types';
import {
  Button,
  Divider,
  Stack,
} from '@mui/material';
import {
  FridgeContainer,
  ReportContainer,
} from './components';

export default function FridgeComplete({ fridge, report }) {
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
FridgeComplete.propTypes = {
  fridge: typesValidation.Fridge,
  report: typesValidation.Report,
};
