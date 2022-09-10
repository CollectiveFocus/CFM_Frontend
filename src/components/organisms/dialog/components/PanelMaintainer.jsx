import { useFormik } from 'formik';
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  TextField,
} from '@mui/material';
import typesValidation from './prop-types';

export default function PanelMaintainer(props) {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      organization: '',
      phoneNumber: '',
      email: '',
      website: '',
      instagram: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <StepLabel>Maintainer Contact Information</StepLabel>
      <StepContent>
        <Stack direction="column" spacing={3} mx={4} mb={4}>
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          <TextField
            id="organization"
            label="Organization"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.organization}
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            id="website"
            label="Website"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
          <TextField
            id="instagram"
            label="Instagram"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.instagram}
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
              onClick={props.handleNext}
              sx={{ width: { md: '345px', xs: '100%' } }}
            >
              Continue
            </Button>
            <Button
              aria-label="Click to return to the previous panel"
              variant="outlined"
              onClick={props.handleBack}
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
PanelMaintainer.propTypes = typesValidation.Panel;
