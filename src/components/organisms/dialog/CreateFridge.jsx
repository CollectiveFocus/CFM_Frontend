import { useState } from 'react';
import { Stack, Stepper, Step, Typography } from '@mui/material';

import PanelFridge from './components/PanelFridge';
import PanelMaintainer from './components/PanelMaintainer';
import PanelPhoto from './components/PanelPhoto';
import PanelConfirm from './components/PanelConfirm';

export default function CreateFridge() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Stack direction="column" spacing={4} mx={4} mb={4}>
      <Typography variant="h1">Add a fridge to the database</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <PanelPhoto handleNext={handleNext} />
        </Step>
        <Step>
          <PanelFridge handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step>
          <PanelMaintainer handleNext={handleNext} handleBack={handleBack} />
        </Step>
        <Step>
          <PanelConfirm handleBack={handleBack} />
        </Step>
      </Stepper>
    </Stack>
  );
}
