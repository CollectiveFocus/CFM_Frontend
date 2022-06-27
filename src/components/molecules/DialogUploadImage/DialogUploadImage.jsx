import { Card } from '@mui/material';
import { ButtonLink } from 'components/molecules';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from './PreviewImage';

const initialValues = {
  image: null,
};

const DialogUploadImage = () => {
  return (
    <>
      <Formik initialValues={initialValues}>
        {(formikProps) => (
          <Form>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <div>
                <Card
                  sx={{
                    display: 'flex',
                    gap: '40px',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                >
                  <label htmlFor="image">
                    <input
                      style={{ display: 'none' }}
                      id="image"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        formikProps.setTouched({
                          ...formikProps.touched,
                          image: true,
                        });
                        formikProps.setFieldValue(
                          'image',
                          event.target.files[0]
                        );
                      }}
                    ></input>
                    <ButtonLink
                      to=""
                      aria-label="Click here to choose an image to upload."
                      variant="contained"
                      disableElevation
                      component="span"
                    >
                      UPLOAD PHOTO
                    </ButtonLink>
                  </label>
                </Card>
                {formikProps.touched.image && formikProps.errors.image ? (
                  <small>{formikProps.errors.image}</small>
                ) : null}
              </div>
              {formikProps.values.image ? (
                <>
                  <PreviewImage
                    width={'300px'}
                    height={'auto'}
                    file={formikProps.values.image}
                  />
                  <div>
                    <ButtonLink
                      to=""
                      aria-label="Click here to submit the chosen image."
                      variant="contained"
                      disableElevation
                      type="submit"
                      name="button"
                    >
                      Submit
                    </ButtonLink>
                  </div>
                </>
              ) : null}
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DialogUploadImage;
