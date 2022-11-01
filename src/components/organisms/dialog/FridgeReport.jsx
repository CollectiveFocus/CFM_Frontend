import { useState } from 'react';
import PropTypes from 'prop-types';
import { mergeDeep } from 'lib/data';

import { Stack, Stepper, Step, Typography } from '@mui/material';

import PanelReport from './components/PanelReport';
import PanelNotes from './components/PanelNotes';
import PanelConfirm from './components/PanelConfirm';

const reportValues = {
  photoUrl: null,
  foodPercentage: null,
  condition: null,
  notes: null,
};

export default function FridgeReport({
  fridgeName = 'Community Fridge Name',
  fridgeId,
  setReportSubmitted,
}) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getPanelValues = (panelValues) => {
    mergeDeep(reportValues, panelValues);
  };

  const fridgeUrl =
    process.env.NEXT_PUBLIC_CFM_API_URL + `/v1/fridges/${fridgeId}/reports`;

  const onSubmitFn = (values) => {
    fetch(fridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((response) => {
      console.log(response);
      setReportSubmitted(true);
    });
  };

  return (
    <Stack direction="column" spacing={4} mx={4}>
      <Typography variant="h1">Fridge Status Report:</Typography>
      <Typography variant="h5">{fridgeName}</Typography>
      <Stepper activeStep={activeStep} orientation={'vertical'}>
        {/* <Step>
          <PanelPhoto
            handleNext={handleNext}
            handleBack={handleBack}
            getPanelValues={getPanelValues}
          />
        </Step> */}
        <Step>
          <PanelReport
            handleNext={handleNext}
            handleBack={handleBack}
            getPanelValues={getPanelValues}
          />
        </Step>
        <Step>
          <PanelNotes
            handleNext={handleNext}
            handleBack={handleBack}
            getPanelValues={getPanelValues}
          />
        </Step>
        <Step>
          <PanelConfirm
            confirmBtnTxt="CONFIRM"
            handleBack={handleBack}
            handleConfirm={() => {
              onSubmitFn(reportValues);
            }}
          />
        </Step>
      </Stepper>
    </Stack>
  );
}
FridgeReport.propTypes = {
  fridgeName: PropTypes.string.isRequired,
  fridgeId: PropTypes.string.isRequired,
  setReportSubmitted: PropTypes.func.isRequired,
};
