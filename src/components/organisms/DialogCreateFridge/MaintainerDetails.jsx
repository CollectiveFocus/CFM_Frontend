import { useFormik } from 'formik';
import { Stack, StepLabel, TextField } from '@mui/material';

export default function MaintainerDetails() {
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
      <StepLabel>Contact Info</StepLabel>
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
          multiline
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.website}
        />
        <TextField
          id="instagram"
          label="Instagram"
          variant="outlined"
          multiline
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.instagram}
        />
      </Stack>
    </>
  );
}
