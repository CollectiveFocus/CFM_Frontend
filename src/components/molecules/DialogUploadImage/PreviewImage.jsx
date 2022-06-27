import { Card } from '@mui/material';
import { useState } from 'react';

const PreviewImage = ({ file, width, height }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <img src={preview} alt="Preview" width={width} height={height} />
    </Card>
  );
};

export default PreviewImage;
