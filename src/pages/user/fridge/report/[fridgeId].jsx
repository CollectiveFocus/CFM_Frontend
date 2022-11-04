import { useState } from 'react';

import { FeedbackCard } from 'components/atoms';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { dialogContact, dialogReport } from 'model/view/dialog/yup';
import { typesFormik } from 'model/view/component/prop-types';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { ButtonLink } from 'components/atoms';

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Slider,
  Radio,
  StepContent,
  StepLabel,
  Divider,
} from '@mui/material';

// const fridgeUrl = "https://api-prod.communityfridgefinder.com/v1/fridges" + '/v1/contact/';
const enumDisplay = Object.freeze({
  EmailDialog: 0,
  EmailSuccess: 1,
  EmailError: 2,
});

export default function FridgeReportPage() {
  const router = useRouter();
  const pid = router.query;
  const fridgeId = pid['fridgeId'];
  const fridgeUrl =
    process.env.NEXT_PUBLIC_CFM_API_URL + `/v1/fridges/${fridgeId}/reports`;
  // const [reportSubmitted, setReportSubmitted] = useState(false);
  const [displayComponent, setDisplay] = useState(enumDisplay.EmailDialog);
  // const { query } = useRouter();

  const onSubmitFn = (values) => {
    console.log(values);
    fetch(fridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => {
        setDisplay(
          response.ok ? enumDisplay.EmailSuccess : enumDisplay.EmailError
        );
        console.log(response);
      })
      .catch(() => setDisplay(enumDisplay.EmailError));
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
    case enumDisplay.EmailDialog:
      panel = ReportForm({ formik, fridgeId });
      break;
    case enumDisplay.EmailSuccess:
      panel = <FeedbackCard type="ReportStatus" />;
      break;
    case enumDisplay.EmailError:
      panel = (
        <FeedbackCard
          type="EmailError"
          action={() => setDisplay(enumDisplay.EmailDialog)}
        />
      );
      break;
  }
  return (
    <>
      <Head>
        <title>Fridge Finder: Add a Fridge Report</title>
      </Head>
      {panel}
      {/* <FeedbackCard type={'ReportStatus'} /> */}
      {/* <FridgeReport2 /> */}
      {/* <FridgeReport
           fridgeName="Cooper Park Community Fridge"
           fridgeId="lescommunityfridge"
          //  setReportSubmitted={setReportSubmitted}
    /> */}
    </>
    // <div>
    //   {reportSubmitted ? (
    //     <FeedbackCard type={'ReportStatus'} />
    //   ) : (
    //     <FridgeReport
    //       fridgeName="Cooper Park Community Fridge"
    //       fridgeId="lescommunityfridge"
    //       setReportSubmitted={setReportSubmitted}
    //     />
    //   )}
    // </div>
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
      <Typography variant="h1">Fridge Status Report:</Typography>
      <Typography variant="h5">{fridgeId}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Divider orientation="horizontal" flexItem />
        <Stack direction="column" spacing={3} mt={2}>
          {/* <TextField
              id="name"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
            /> */}
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
                  label="Fridge needs servicing"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="dirty"
                  label="Fridge needs cleaning"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="not at location"
                  label="Fridge is no longer at location"
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
                aria-label="Fridge fullness"
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
          {/* <TextField
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />
            <TextField
              id="subject"
              name="subject"
              label="Subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
              variant="outlined"
            />
            <TextField
              id="message"
              name="message"
              label="Message"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              multiline
              rows={4}
              variant="outlined"
            /> */}
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            pt={4}
          >
            <ButtonLink
              aria-label="Click to return to home page"
              variant="outlined"
              to="/browse"
            >
              Cancel
            </ButtonLink>
            <Button
              aria-label="Click to send submite status update"
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
  // fridgeId: PropTypes.string.isRequired,
};
