import { useFormik } from 'formik';
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  TextField,
} from '@mui/material';
import typesValidation from './prop-types';

export default function PanelFridge({ handleBack, handleNext }) {
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
          <Stack
            direction={{ md: 'row-reverse', xs: 'column' }}
            justifyContent="space-between"
            spacing={4}
            pt={4}
          >
            <Button
              aria-label="Click to continue to the next panel"
              variant="contained"
              onClick={handleNext}
              sx={{ width: { md: '345px', xs: '100%' } }}
            >
              Continue
            </Button>
            <Button
              aria-label="Click to return to the previous panel"
              variant="outlined"
              onClick={handleBack}
              sx={{ width: { md: '345px', xs: '100%' } }}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </StepContent>
    </>
  );
}
PanelFridge.propTypes = typesValidation.Panel;
