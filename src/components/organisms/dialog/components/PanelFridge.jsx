import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  TextField,
} from '@mui/material';
import typesValidation from './prop-types';
import dialogValidation from 'model/view/dialog/yup';

const panelFridgeValidation = dialogValidation.Fridge.pick(['name', 'notes']).concat(
  dialogValidation.Location.pick(['street', 'city', 'state', 'zip'])
);

const fridgeUrl = process.env.NEXT_PUBLIC_CFM_API_URL + '/v1/contact/';

export default function PanelFridge({ handleBack, handleNext }) {
  const onSubmitFn = (values) => {
    console.error({ values })
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      notes: 'hello',
    },
    validationSchema: panelFridgeValidation,
    onSubmit: (values) => {
      console.error({ values })
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <StepLabel>Fridge Location Information</StepLabel>
      <StepContent>
        <form id="panelFridge" onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={3} mx={4} mb={4}>
            <TextField
              id="name"
              label="Name of Fridge"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="street"
              label="Street"
              variant="outlined"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
            <TextField
              id="city"
              label="City"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              id="zip"
              label="Zip Code"
              variant="outlined"
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
            <TextField
              id="notes"
              label="Fridge Notes"
              variant="outlined"
              multiline
              rows={4}
              value={formik.values.notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
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
                type="submit"
                value="submit"
                form ="panelFridge"
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
        </form>
      </StepContent>
    </>
  );
}
PanelFridge.propTypes = typesValidation.Panel
