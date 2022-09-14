/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Stack, Stepper, Step, Typography } from '@mui/material';

import PanelDetails from './PanelDetails';
import MaintainerDetails from './MaintainerDetails';
import PhotoPanel from './PhotoPanel';
import ConfirmPanel from './ConfirmPanel';

export default function DialogCreateFridge() {
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
          <PhotoPanel handleNext={handleNext} />
        </Step>
        <Step>
          <PanelDetails handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step>
          <MaintainerDetails handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step>
          <ConfirmPanel />
        </Step>
      </Stepper>
    </Stack>
  );
}
