import { typesPanel } from './prop-types';
import { dialogReport } from 'model/view/dialog/yup';
import { useFormik } from 'formik';

import {
  Button,
  Stack,
  StepLabel,
  StepContent,
  TextField,
} from '@mui/material';

const dialogNotesValidation = dialogReport.pick(['notes']);

export default function PanelNotes({ handleNext, handleBack, getPanelValues }) {
  const formik = useFormik({
    initialValues: {
      notes: '',
    },
    validationSchema: dialogNotesValidation,
    onSubmit: (values) => {
      getPanelValues(values);
      handleNext();
    },
  });

  return (
    <>
      <StepLabel>Notes</StepLabel>
      <StepContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            spacing={3}
            mt={2}
            justifyContent="space-between"
          >
            <TextField
              id="notes"
              name="notes"
              label="Notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
              placeholder="Got an update or request? Leave your notes here!"
              onBlur={formik.handleBlur}
              multiline
              rows={5}
              fullWidth
            />
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
PanelNotes.propTypes = typesPanel.isRequired;
