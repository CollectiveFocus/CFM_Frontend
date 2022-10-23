import { typesValidation } from './prop-types';
import { useFormik } from 'formik';

import {
  Button,
  Stack,
  StepContent,
  StepLabel,
  Typography,
} from '@mui/material';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';

export default function PanelPhoto({ handleNext, handleBack, getPanelValues }) {
  const formik = useFormik({
    initialValues: { image: null },
    onSubmit: (values) => {
      // confirmPhotoUpload();
      getPanelValues(values);
      handleNext();
    },
  });

  const onAddImage = async (event) => {
    const imageUpload = event.target.files[0];
    const uploadType = imageUpload.type;
    const supportedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!supportedImageTypes.includes(uploadType)) {
      console.log(`Sorry, ${uploadType} files are not supported.`);
    } else {
      const imageOut = await convertImage(imageUpload);
      formik.setFieldValue('image', imageOut);
      formik.setTouched({ image: true });
      // console.log(imageOut); //@TODO - Make Post Request
    }
  };

  const convertImage = (image) => {
    return new Promise((resolve) => {
      let src = URL.createObjectURL(image);
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let userImage = new Image();
      userImage.src = src;
      let webpImage = '';
      userImage.onload = () => {
        canvas.width = userImage.width;
        canvas.height = userImage.height;
        context.drawImage(userImage, 0, 0);
        webpImage = canvas.toDataURL('image/webp');
        return resolve(webpImage);
      };
    });
  };

  const confirmPhotoUpload = () => {
    const photoSubmitUrl = 'https://api-dev.communityfridgefinder.com/v1/photo';
    const response = fetch(photoSubmitUrl, {
      method: 'POST',
      body: JSON.stringify(formik.values.image),
      headers: {
        'Content-Type': 'image/webp',
        accept: 'application/json',
      },
    });
    console.table(response);
  };

  let userImageProvided = formik.values.image != null;

  return (
    <>
      <StepLabel>Upload Photo</StepLabel>
      <StepContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            spacing={3}
            mt={2}
            justifyContent="space-between"
          >
            <Typography variant="h5">
              If you have a photo of the fridge, you can upload it here. If you
              don&#39;t have one, select SKIP PHOTO.
            </Typography>

            {userImageProvided && (
              <>
                <img
                  src={formik.values.image}
                  width={300}
                  height={350}
                  alt="Fridge contents preview"
                />
                <Button
                  aria-label="Click to confirm photo of the fridge"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  CONFIRM PHOTO
                </Button>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              name="imageUpload"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={(event) => onAddImage(event)}
            />
            <Stack
              direction={{ md: 'row-reverse', xs: 'column' }}
              justifyContent="space-between"
              spacing={4}
              pt={4}
            >
              <label htmlFor="image-upload">
                <Button
                  aria-label="Click to upload a photo of the fridge"
                  variant="contained"
                  component="span"
                  startIcon={<AddAPhotoRoundedIcon />}
                  sx={{ width: { md: '345px', xs: '100%' } }}
                >
                  UPLOAD PHOTO
                </Button>
              </label>
              <Button
                aria-label="Click to skip uploading a photo and continue to the next page"
                onClick={handleNext}
                variant="outlined"
                sx={{ width: { md: '345px', xs: '100%' } }}
              >
                SKIP PHOTO
              </Button>
            </Stack>
          </Stack>
        </form>
      </StepContent>
    </>
  );
}
PanelPhoto.propTypes = typesValidation.Panel;
