import { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import theme from 'theme';

import { DialogUploadImage } from 'components/molecules';

export default function DialogUpdateFridgeStatus({
  fridgeName = 'Community Fridge Name',
}) {
  //Initialize Formik form and initial form values
  const formik = useFormik({
    initialValues: {
      foodPhotoURL: null,
      foodPercentage: 25,
      operation: 'working',
      notes: '',
    },

    onSubmit: (values) => {
      console.table(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  // Toggle visibility of photo upload component
  const [state, setState] = useState({
    uploadPhoto: false,
  });
  const { uploadPhoto } = state;

  const onAddPhoto = () => {
    setState({ ...state, uploadPhoto: true });
  };

  // Functionality for MUI stepper component
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //Functionality for MUI slider component
  const sliderMarks = [
    {
      value: 25,
      label: 'Empty',
    },
    {
      value: 50,
      label: 'A Few Items',
    },
    {
      value: 75,
      label: 'Many Items',
    },
    {
      value: 100,
      label: 'Full',
    },
  ];

  const fridgeSliderStyles = {
    mx: 'auto',
    width: 7 / 8,
    '.MuiSlider-markLabel': {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
    '.MuiSlider-markLabelActive': {
      fontSize: 12,
      color: theme.palette.text.primary,
    },
  };

  return (
    <Container>
      {uploadPhoto ? (
        <DialogUploadImage />
      ) : (
        <Stack direction="column" spacing={4} mx={4} mb={4}>
          <Box id="update-header">
            <Typography variant="h2">Community Fridge Update:</Typography>
            <Typography variant="h5">{fridgeName}</Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Stepper activeStep={activeStep} orientation={'vertical'}>
              <Step expanded={activeStep == 3}>
                <StepLabel>Upload Photo</StepLabel>
                <StepContent>
                  <Stack
                    direction="column"
                    spacing={3}
                    mt={2}
                    justifyContent="space-between"
                  >
                    <Typography>
                      If you have a photo of the fridge contents, you can upload
                      that here. If you don&#39;t have one, select SKIP PHOTO.
                    </Typography>
                    {activeStep != 3 && (
                      <Button
                        onClick={onAddPhoto}
                        variant="contained"
                        startIcon={<AddAPhotoOutlinedIcon />}
                      >
                        Upload Photo
                      </Button>
                    )}
                    {activeStep != 3 && (
                      <Button onClick={handleNext} variant="outlined">
                        Skip Photo
                      </Button>
                    )}
                  </Stack>
                </StepContent>
              </Step>
              <Step expanded={activeStep == 3}>
                <StepLabel>Status</StepLabel>
                <StepContent>
                  <Stack
                    direction="column"
                    spacing={3}
                    mt={2}
                    justifyContent="space-between"
                  >
                    <FormLabel>How full is the fridge?</FormLabel>
                    <FormGroup>
                      <Slider
                        name="foodPercentage"
                        aria-label="Fridge fullness"
                        value={formik.values.foodPercentage}
                        onChange={formik.handleChange}
                        min={25}
                        max={100}
                        step={25}
                        marks={sliderMarks}
                        sx={fridgeSliderStyles}
                        size="medium"
                      />
                    </FormGroup>
                    <FormControl>
                      <FormLabel>Select if applicable:</FormLabel>
                      <RadioGroup
                        name="operation"
                        value={formik.values.operation}
                        onChange={formik.handleChange}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={<Radio />}
                            value="out of order"
                            label="Fridge needs servicing"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="dirty"
                            label="Fridge needs cleaning"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="not at location"
                            label="Fridge is no longer at location"
                          />
                        </FormGroup>
                      </RadioGroup>
                    </FormControl>
                    {activeStep != 3 && (
                      <Button
                        onClick={handleNext}
                        variant="contained"
                        fullWidth
                      >
                        Continue
                      </Button>
                    )}
                    {activeStep != 3 && (
                      <Button onClick={handleBack} variant="outlined" fullWidth>
                        Back
                      </Button>
                    )}
                  </Stack>
                </StepContent>
              </Step>
              <Step expanded={activeStep == 3}>
                <StepLabel>Notes</StepLabel>
                <StepContent>
                  <Stack
                    spacing={3}
                    mt={2}
                    direction="column"
                    justifyContent="space-between"
                  >
                    <TextField
                      name="notes"
                      value={formik.values.notes}
                      id="notes"
                      placeholder="Got an update or request? Leave your notes here!"
                      onChange={formik.handleChange}
                      multiline
                      rows={5}
                      fullWidth
                    />
                    {activeStep != 3 && (
                      <Button
                        onClick={handleNext}
                        variant="contained"
                        fullWidth
                      >
                        Continue
                      </Button>
                    )}
                    {activeStep != 3 && (
                      <Button onClick={handleBack} variant="outlined" fullWidth>
                        Back
                      </Button>
                    )}
                  </Stack>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Confirm</StepLabel>
                <StepContent>
                  <Stack
                    mt={2}
                    spacing={3}
                    justifyContent="space-between"
                    direction="column"
                  >
                    <Typography>
                      If all the details are correct, please select CONFIRM.
                    </Typography>
                    <Button type="submit" variant="contained" fullWidth>
                      Confirm
                    </Button>
                    <Button onClick={handleBack} variant="outlined" fullWidth>
                      Back
                    </Button>
                  </Stack>
                </StepContent>
              </Step>
            </Stepper>
          </form>
        </Stack>
      )}
    </Container>
  );
}
DialogUpdateFridgeStatus.propTypes = {
  fridgeName: PropTypes.string.isRequired,
};
