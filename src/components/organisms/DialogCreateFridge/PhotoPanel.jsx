/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  Typography,
} from '@mui/material';

export default function PhotoPanel(props) {
  return (
    <>
      <StepLabel>Upload Photo</StepLabel>
      <StepContent>
        <Stack
          direction="column"
          spacing={3}
          mt={2}
          justifyContent="space-between"
        >
          <Typography variant="h5">
            If you have a photo of the fridge, you can upload it here. If you
            don't have one, select SKIP PHOTO.
          </Typography>
          <Stack direction="column" spacing={4} pt={4}>
            <Button
              aria-label="Click to upload a photo of the fridge"
              variant="contained"
              onClick={props.handleNext}
              sx={{ py: 3, border: '2px solid transparent' }}
            >
              UPLOAD PHOTO
            </Button>
            <Button
              aria-label="Click to skip uploading a photo and continue to the next page"
              onClick={props.handleNext}
              sx={{ py: 3 }}
              variant="outlined"
            >
              SKIP PHOTO
            </Button>
          </Stack>
        </Stack>
      </StepContent>
    </>
  );
}
