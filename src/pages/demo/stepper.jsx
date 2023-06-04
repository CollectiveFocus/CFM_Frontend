import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // schema based validator
import { mergeDeep } from 'lib/data';

const steps = ['Name Step', 'Phone Number Step', 'Email Step'];

export default function DemoStepperPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const forms = {
    firstForm: <FormName handleSubmit={handleSubmit} />,
    secondForm: <FormPhoneNumber handleSubmit={handleSubmit} />,
    thirdForm: <FormEmail handleSubmit={handleSubmit} />,
  };

  function handleStepForward() {
    setActiveStep((prevState) => prevState + 1);
  }
  function handleStepBackwards() {
    setActiveStep((prevState) => prevState - 1);
  }

  function handleSubmit(key, value) {
    // e.preventDefault();
    const fieldObject = { [key]: value };
    console.log('fieldObject' + JSON.stringify(fieldObject));
    handleStepForward();
    setFormData((prevState) => mergeDeep(prevState, fieldObject));
    console.log(formData);
    console.log('submit');
  }

  const RenderForm = ({ activeForm }) => {
    if (activeForm === 0) {
      return forms.firstForm;
    }
    if (activeForm === 1) {
      return forms.secondForm;
    }
    if (activeForm === 2) {
      return forms.thirdForm;
    }
    return 'error: form not found';
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <RenderForm activeForm={activeStep} />
      </Box>
    </>
  );
}

const NameSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid English name')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const PhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(7, 'Must have at least 7 digits')
    .max(15, 'Must be 15 digits or less')
    .required('Phone number is required!'),
});

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const FormName = ({ handleSubmit }) => (
  <div>
    <h1>Enter Your Name</h1>
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={NameSchema}
      onSubmit={(values) => handleSubmit('name', values.name)}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" placeholder="enter your name" />
          {/* If this field has been touched, and it contains an error, display it
           */}
          {touched.name && errors.name && <div>{errors.name}</div>}
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  </div>
);

const FormPhoneNumber = ({ handleSubmit }) => (
  <div>
    <h1>Enter Your Phone Number</h1>
    <Formik
      initialValues={{
        phoneNumber: '',
      }}
      validationSchema={PhoneNumberSchema}
      onSubmit={(values) => handleSubmit('phoneNumber', values.phoneNumber)}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="phoneNumber" placeholder="4193404580" />
          {/* If this field has been touched, and it contains an error, display
           it */}
          {touched.phoneNumber && errors.phoneNumber && (
            <div>{errors.phoneNumber}</div>
          )}
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  </div>
);

const FormEmail = ({ handleSubmit }) => (
  <div>
    <h1>Enter Your Email</h1>
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={EmailSchema}
      onSubmit={(values) => handleSubmit('email', values.email)}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email" placeholder="user@example.com" />
          {/* If this field has been touched, and it contains an error, display
           it */}
          {touched.email && errors.email && <div>{errors.email}</div>}
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  </div>
);
