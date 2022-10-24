import { PanelUploadImage } from 'components/organisms';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { ImageRounded } from '@mui/icons-material';

export default function PhotoUploadPreview() {
  const [state, setState] = useState({
    uploadImage: false,
  });

  const { uploadImage } = state;

  const onToggleUpload = () => {
    setState({
      ...state,
      uploadImage: !state.uploadImage,
    });
  };
  return (
    <Box display="flex" justifyContent={'center'}>
      {uploadImage ? (
        <PanelUploadImage onToggleUpload={onToggleUpload} />
      ) : (
        <Button
          variant="contained"
          onClick={onToggleUpload}
          sx={{ marginTop: 10 }}
        >
          Upload Image
        </Button>
      )}
    </Box>
  );
}
