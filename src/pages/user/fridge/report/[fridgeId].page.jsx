import PropTypes from 'prop-types';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { dialogReport } from 'model/view/dialog/yup';
import { typesFormik } from 'model/view/component/prop-types';
import { ButtonLink, FeedbackCard } from 'components/atoms';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Slider,
  Radio,
  Divider,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const enumDisplay = Object.freeze({
  DisplayDialog: 0,
  DisplaySuccess: 1,
  DisplayError: 2,
});

export default function FridgeReportPage() {
  const [displayComponent, setDisplay] = useState(enumDisplay.DisplayDialog);
  const router = useRouter();
  const fridgeId = router.query?.fridgeId;

  const postFridgeStatus =
    process.env.NEXT_PUBLIC_FF_API_URL + `/v1/fridges/${fridgeId}/reports`;

  const onSubmitFn = (values) => {
    fetch(postFridgeStatus, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) =>
        setDisplay(
          response.ok ? enumDisplay.DisplaySuccess : enumDisplay.DisplayError
        )
      )
      .catch(() => setDisplay(enumDisplay.DisplayError));
  };

  const formik = useFormik({
    initialValues: {
      condition: 'good',
      notes: '',
      foodPercentage: 0,
    },
    validationSchema: dialogReport,
    onSubmit: onSubmitFn,
  });

  let panel;
  switch (displayComponent) {
    case enumDisplay.DisplayDialog:
      panel = ReportForm({ formik, fridgeId });
      break;
    case enumDisplay.DisplaySuccess:
      panel = (
        <FeedbackCard form="FridgeStatusSuccess" slug={`/fridge/${fridgeId}`} />
      );
      break;
    case enumDisplay.DisplayError:
      panel = (
        <FeedbackCard
          form="Error"
          slug={() => setDisplay(enumDisplay.DisplayDialog)}
        />
      );
  }
  return (
    <>
      <Head>
        <title>Fridge Finder: Submit a Fridge Report</title>
      </Head>
      {panel}
    </>
  );
}

function ReportForm({ formik, fridgeId }) {
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
  return (
    <Stack direction="column" spacing={1} mx={4}>
      <Typography variant="h1">Fridge Status Report</Typography>
      <Typography variant="h5">{fridgeId}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Divider orientation="horizontal" flexItem />
        <Stack direction="column" spacing={3} mt={2}>
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
                  label="Fridge needs repairs"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="dirty"
                  label="Fridge needs cleaning"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="not at location"
                  label="Fridge is temporarily unavailable"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="ghost"
                  label="Fridge is permanently unavailable"
                />
              </RadioGroup>
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormGroup>
              <FormLabel>How full is the fridge?</FormLabel>
              <Slider
                id="foodPercentage"
                name="foodPercentage"
                aria-label="Amount of food in the fridge"
                value={formik.values.foodPercentage}
                onChange={formik.handleChange}
                min={0}
                max={3}
                step={1}
                marks={sliderMarks}
                sx={fridgeSliderStyles}
              />
            </FormGroup>
          </FormControl>
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
            direction="row"
            justifyContent="space-between"
            spacing={4}
            pt={4}
          >
            <ButtonLink
              aria-label="Return to map page"
              variant="outlined"
              to="/browse"
              title="Cancel"
            />
            <Button
              aria-label="Submit status update"
              variant="contained"
              type="submit"
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
ReportForm.propTypes = {
  formik: typesFormik.isRequired,
  fridgeId: PropTypes.string.isRequired,
};
