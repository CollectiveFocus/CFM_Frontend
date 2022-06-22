import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import theme from 'theme';

DialogUpdateFridgeStatus.propTypes = {
  fridgeName: PropTypes.string.isRequired,
};

export default function DialogUpdateFridgeStatus({ fridgeName }) {
  const [formValues, setFormValues] = React.useState({
    fridgeUpdateImage: null,
    fridgeUpdateNotes: null,
    fridgeContentScale: 0,
    fridgeServiceRequest: false,
    fridgeCleaningRequest: false,
    fridgeLocationChange: false,
  });

  const {
    fridgeServiceRequest,
    fridgeCleaningRequest,
    fridgeLocationChange,
    fridgeContentScale,
  } = formValues;

  const onAddPhoto = () => {
    //TODO (cfm_50) need to figure out how to integrate with add photo component
  };

  const onUpdateNote = (event) => {
    setFormValues({
      ...formValues,
      fridgeUpdateNotes: event.target.value,
    });
  };

  const onSlide = (_, newValue) => {
    console.log(newValue);
    setFormValues({
      ...formValues,
      fridgeContentScale: newValue,
    });
  };
  const onCheck = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.table(formValues);
    // TODO - Need to integrate with backend
  };

  const FridgeSlider = styled(Slider)(() => ({
    '.MuiSlider-markLabel': {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
    '.MuiSlider-markLabelActive': {
      fontSize: 12,
      color: theme.palette.text.primary,
    },
  }));

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

  return (
    <Container sx={{ padding: 5 }}>
      <Box id="update-header">
        <Typography variant="h2">Community Fridge Update:</Typography>
        <Typography variant="h5">{fridgeName}</Typography>
      </Box>
      <Box id="update-form" mt={10}>
        <form onSubmit={onSubmit}>
          <Stack spacing={5}>
            <Box>
              <FormLabel>
                Upload a photo of the inside of the fridge to let others know
                what&quot;`s there!
              </FormLabel>
              <FormGroup>
                <Button
                  onClick={onAddPhoto}
                  variant="contained"
                  sx={{
                    marginTop: 5,
                    minWidth: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    ':hover': { cursor: 'pointer' },
                  }}
                  startIcon={<AddAPhotoOutlinedIcon />}
                >
                  Upload Photo
                </Button>
              </FormGroup>
            </Box>
            <Box width={1}>
              <FormGroup>
                <TextField
                  fullWidth
                  id="update-notes"
                  // label="Notes"
                  placeholder="Got an update or request? Leave your notes here!"
                  multiline
                  rows={5}
                  onChange={onUpdateNote}
                />
              </FormGroup>
            </Box>
            <Box fullWidth>
              <FormLabel>How full is the fridge?</FormLabel>
              <FormGroup>
                <FridgeSlider
                  aria-label="Fridge fullness"
                  min={0}
                  value={fridgeContentScale}
                  max={3}
                  step={1}
                  marks={sliderMarks}
                  size="medium"
                  sx={{ mx: 'auto', width: 7 / 8 }}
                  onChangeCommitted={onSlide}
                />
              </FormGroup>
            </Box>
            <Box>
              <FormLabel>Check box if applicable:</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fridgeCleaningRequest}
                      onChange={onCheck}
                      name="fridgeCleaningRequest"
                    />
                  }
                  label="Fridge needs cleaning"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fridgeServiceRequest}
                      onChange={onCheck}
                      name="fridgeServiceRequest"
                    />
                  }
                  label="Fridge needs servicing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fridgeLocationChange}
                      onChange={onCheck}
                      name="fridgeLocationChange"
                    />
                  }
                  label="Fridge is no longer at this location"
                />
              </FormGroup>
            </Box>
            <Box>
              <Button // TODO - cfm_37
                type="submit"
                variant="contained"
                sx={{
                  minWidth: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#fff',
                  ':hover': { cursor: 'pointer' },
                }}
              >
                Submit Update
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
