/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Typography,
} from '@mui/material';

const steps = [
  {
    label: 'Fridge Details',
    values: [
      { formikValue: 'fridgeName', label: 'Fridge Name' },
      { formikValue: 'address', label: 'Address' },
      { formikValue: 'city', label: 'City' },
      { formikValue: 'state', label: 'State' },
      { formikValue: 'zip', label: 'Zip Code' },
      {
        formikValue: 'description',
        label: 'Extra Notes',
      },
    ],
  },
  {
    label: 'Contact Info',
    values: [
      { formikValue: 'fullName', label: 'Full Name' },
      { formikValue: 'organization', label: 'Organization' },
      { formikValue: 'phoneNumber', label: 'Phone Number' },
      { formikValue: 'email', label: 'Email' },
      { formikValue: 'website', label: 'Website' },
      { formikValue: 'instagram', label: 'Instagram' },
    ],
  },
];

export default function CreateFridgeDialog() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      fridgeName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      description: '',
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
    <Stack direction="column" spacing={4} mx={4} mb={4}>
      <Typography variant="h2">Add a New Fridge</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Stack direction="column" spacing={3} mt={2}>
                {step.values.map((form) => (
                  <TextField
                    key={form.formikValue}
                    id={form.formikValue}
                    label={form.label}
                    variant="outlined"
                    multiline={form.formikValue === 'description'}
                    rows={4}
                    onChange={formik.handleChange}
                    value={formik.values[form.formikValue]}
                  />
                ))}
                <Stack direction="column" spacing={4} pt={4}>
                  <Button
                    aria-label="continue"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ py: 3, border: '2px solid transparent' }}
                  >
                    Continue
                  </Button>
                  <Button
                    aria-label="back"
                    disabled={index === 0}
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ py: 3 }}
                  >
                    Back
                  </Button>
                </Stack>
              </Stack>
            </StepContent>
          </Step>
        ))}

        <Step>
          <StepLabel>Upload Photo</StepLabel>
          <StepContent>
            <Stack
              direction="column"
              spacing={3}
              mt={2}
              justifyContent="space-between"
            >
              <Typography variant="h5">
                If you have a photo of the fridge, you can upload it here. If
                you don't have one, select SKIP PHOTO.
              </Typography>
              <Stack direction="column" spacing={4} pt={4}>
                <Button
                  aria-label="upload photo"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ py: 3, border: '2px solid transparent' }}
                >
                  UPLOAD PHOTO
                </Button>
                <Button
                  aria-label="skip photo"
                  onClick={handleNext}
                  sx={{ py: 3 }}
                  variant="outlined"
                >
                  SKIP PHOTO
                </Button>
              </Stack>
            </Stack>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Confirm</StepLabel>
          <StepContent></StepContent>
        </Step>
      </Stepper>
    </Stack>
  );
}
