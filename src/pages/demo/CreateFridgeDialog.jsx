/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@mui/material';

import PanelDetails from 'components/organisms/DialogCreateFridge/PanelDetails';
import MaintainerDetails from 'components/organisms/DialogCreateFridge/MaintainerDetails';

export default function CreateFridgeDialog() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack direction="column" spacing={4} mx={4} mb={4}>
      <Typography variant="h2">Add a New Fridge</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <PanelDetails handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step>
          <MaintainerDetails handleNext={handleNext} handleBack={handleBack} />
        </Step>
      </Stepper>
    </Stack>
  );
}
