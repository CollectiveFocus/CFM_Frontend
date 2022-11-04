import { typesPanel } from './prop-types';
import { dialogReport } from 'model/view/dialog/yup';
import { useFormik } from 'formik';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Slider,
  Radio,
  Stack,
  StepContent,
  StepLabel,
} from '@mui/material';

const panelReportValidation = dialogReport.pick([
  'foodPercentage',
  'condition',
]);

export default function PanelReport({
  handleNext,
  handleBack,
  getPanelValues,
}) {
  //Functionality for MUI slider component
  const sliderMarks = [
    {
      value: 0,
      label: 'Empty',
    },
    {
      value: 1,
      label: 'A Few Items',
    },
    {
      value: 2,
      label: 'Many Items',
    },
    {
      value: 3,
      label: 'Full',
    },
  ];

  const fridgeSliderStyles = {
    mx: 'auto',
    width: 7 / 8,
    '.MuiSlider-markLabel': {
      fontSize: 12,
      // color: theme.palette.text.secondary,
    },
    '.MuiSlider-markLabelActive': {
      fontSize: 12,
      // color: theme.palette.text.primary,
    },
  };

  const formik = useFormik({
    initialValues: {
      foodPercentage: 0,
      condition: 'good',
    },
    // validationSchema: panelReportValidation,
    onSubmit: (values) => {
      getPanelValues(values);
      handleNext();
    },
  });

  return (
    <>
      <StepLabel>Status</StepLabel>
      <StepContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            spacing={3}
            mt={2}
            justifyContent="space-between"
          >
            <FormGroup>
              <FormLabel>How full is the fridge?</FormLabel>
              <Slider
                id="foodPercentage"
                name="foodPercentage"
                aria-label="Fridge fullness"
                value={formik.values.foodPercentage}
                onChange={formik.handleChange}
                min={0}
                max={3}
                step={1}
                marks={sliderMarks}
                sx={fridgeSliderStyles}
              />
            </FormGroup>
            <FormLabel>Select if applicable:</FormLabel>
            <FormControl>
              <FormGroup>
                <RadioGroup
                  name="condition"
                  value={formik.values.condition}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
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
                </RadioGroup>
              </FormGroup>
            </FormControl>
            <Stack
              direction={{ md: 'row-reverse', xs: 'column' }}
              justifyContent="space-between"
              spacing={4}
              pt={4}
            >
              <Button
                aria-label="Click to continue to the next panel"
                type="submit"
                variant="contained"
                sx={{ width: { md: '345px', xs: '100%' } }}
              >
                Continue
              </Button>
              <Button
                aria-label="Click to return to the previous panel"
                onClick={handleBack}
                variant="outlined"
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
PanelReport.propTypes = typesPanel.isRequired;
