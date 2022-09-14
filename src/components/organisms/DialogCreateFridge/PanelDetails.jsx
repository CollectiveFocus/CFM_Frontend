import { useFormik } from 'formik';
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  TextField,
} from '@mui/material';

export default function PanelDetails(props) {
  const formik = useFormik({
    initialValues: {
      fridgeName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      description: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <StepLabel>Fridge Location Information</StepLabel>
      <StepContent>
        <Stack direction="column" spacing={3} mx={4} mb={4}>
          <TextField
            id="fridgeName"
            label="Name of Fridge"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.fridgeName}
          />
          <TextField
            id="address"
            label="Street Address"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <TextField
            id="city"
            label="City"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <TextField
            id="zip"
            label="Zip Code"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.zip}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <Stack direction="column" spacing={4} pt={4}>
            <Button
              aria-label="Click to continue to the next panel"
              variant="contained"
              onClick={props.handleNext}
              sx={{ py: 3, border: '2px solid transparent' }}
            >
              Next
            </Button>
            <Button
              aria-label="Click to return to the preview panel"
              variant="outlined"
              onClick={props.handleBack}
              sx={{ py: 3 }}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </StepContent>
    </>
  );
}
