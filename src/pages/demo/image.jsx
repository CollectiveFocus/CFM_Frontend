import { Button } from '@mui/material';

export default function Image() {
  const fetchText = (img) => {
    fetch('/api/photo', {
      method: 'POST',
      headers: { 'Content-Type': 'image/webp' },
      body: img,
    })
      .then((res) => res.json())
      .then((readable) => console.log(readable))
      .catch((err) => console.log(err));
  };
  return (
    <label htmlFor="image">
      <input
        style={{ display: 'none' }}
        id="image"
        name="image"
        type="file"
        onChange={(event) => {
          fetchText(event.target.files[0]);
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
  );
}
