import Head from 'next/head';

import { useState } from 'react';
import { useFormik } from 'formik';

import { Button, Stack, TextField, Typography } from '@mui/material';
import { ButtonLink } from 'components/molecules';
import { FeedbackCard } from 'components/atoms';

import { typesFormik } from 'schema/component/prop-types';
import { dialogContact } from 'schema/dialog/yup';

const fridgeUrl = process.env.NEXT_PUBLIC_CFM_API_URL + '/v1/contact/';
const enumDisplay = Object.freeze({
  EmailDialog: 0,
  EmailSuccess: 1,
  EmailError: 2,
});

export default function ContactPage() {
  const [displayComponent, setDisplay] = useState(enumDisplay.EmailDialog);
  const onSubmitFn = (values) => {
    fetch(fridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) =>
        setDisplay(
          response.ok ? enumDisplay.EmailSuccess : enumDisplay.EmailError
        )
      )
      .catch(() => setDisplay(enumDisplay.EmailError));
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: dialogContact,
    onSubmit: onSubmitFn,
  });

  let panel;
  switch (displayComponent) {
    case enumDisplay.EmailDialog:
      panel = ContactForm({ formik });
      break;
    case enumDisplay.EmailSuccess:
      panel = <FeedbackCard type="EmailSuccess" />;
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
        <title>CFM: Contact Us!</title>
      </Head>
      {panel}
    </>
  );
}

function ContactForm({ formik }) {
  return (
    <Stack spacing={4} mx={4} mt={15} mb={4}>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        Contact Us!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={5} mx={4} mb={4}>
          <TextField
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
          />
          <TextField
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
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            pt={4}
          >
            <ButtonLink
              aria-label="Click to return to home page"
              variant="outlined"
              to="/"
            >
              Cancel
            </ButtonLink>
            <Button
              aria-label="Click to send an email to the site maintainers"
              variant="contained"
              type="submit"
            >
              Send Email
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
ContactForm.propTypes = {
  formik: typesFormik.isRequired,
};
