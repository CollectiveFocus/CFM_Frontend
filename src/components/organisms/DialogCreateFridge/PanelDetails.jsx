import { useFormik } from 'formik';
import { Stack, StepLabel, TextField } from '@mui/material';

export default function PanelDetails() {
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
      <StepLabel>Fridge Details</StepLabel>
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
      </Stack>
    </>
  );
}
