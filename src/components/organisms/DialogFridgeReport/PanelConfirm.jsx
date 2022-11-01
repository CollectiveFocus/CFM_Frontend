import React from 'react';

import {
  Button,
  Stack,
  StepLabel,
  StepContent,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import PreviewImage from './PreviewImage';

const PanelConfirm = ({
  photoURL,
  foodPercentage,
  condition,
  notes,
  handleNext,
  handleBack,
}) => {
  return (
    <>
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
          <Typography variant="h6">Photo</Typography>
          {/* <PreviewImage/> */}
          <Typography variant="h6">Status</Typography>
          <Typography variant="body1">
            Fridge Fullness: {foodPercentage}
          </Typography>
          <Typography variant="body1">Fridge Condition: {condition}</Typography>

          <Typography variant="h6">Notes</Typography>
          <Typography variant="body1">Notes: {notes}</Typography>

          <Button type="submit" variant="contained" fullWidth>
            Confirm
          </Button>
          <Button onClick={handleBack} variant="outlined" fullWidth>
            Back
          </Button>
        </Stack>
      </StepContent>
    </>
  );
};

PanelConfirm.propTypes = {
  photoURL: PropTypes.string,
  foodPercentage: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  notes: PropTypes.string,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};

export default PanelConfirm;
