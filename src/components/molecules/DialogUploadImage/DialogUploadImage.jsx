import { Button, Card } from '@mui/material';
import { Form, Formik } from 'formik';
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
                    <Button
                      aria-label="Click here to choose an image to upload."
                      variant="contained"
                      component="span"
                    >
                      UPLOAD PHOTO
                    </Button>
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
                    <Button
                      aria-label="Click here to submit the chosen image."
                      variant="contained"
                      type="submit"
                      name="button"
                    >
                      Submit
                    </Button>
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
