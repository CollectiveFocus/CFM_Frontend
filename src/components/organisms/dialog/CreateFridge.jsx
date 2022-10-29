import { useState } from 'react';
import { Stack, Stepper, Step, Typography } from '@mui/material';

import PanelFridge from './components/PanelFridge';
import PanelMaintainer from './components/PanelMaintainer';
import PanelConfirm from './components/PanelConfirm';

export default function CreateFridge() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Stack direction="column" spacing={4} mx={4} mb={4}>
      <Typography variant="h1">Add a fridge to the database</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key="stepFridge">
          <PanelFridge handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step key="stepMaintainer">
          <PanelMaintainer handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step key="stepConfirm">
          <PanelConfirm buttonTitle="ADD FRIDGE" handleNext={handleNext} handleBack={handleBack} />
        </Step>
      </Stepper>
    </Stack>
  );
}
