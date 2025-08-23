import { useEffect, useState } from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function SearchInfoPopup() {
  const cookieName = 'com.fridgefinder.searchInfoPopup';
  const [popupOpen, setPopupOpen] = useState();

  const handleClick = () => {
    setPopupOpen(false);
    localStorage.setItem(cookieName, 'false');
  };

  useEffect(() => {
    const cookie = localStorage.getItem(cookieName);
    if (!cookie) {
      localStorage.setItem(cookieName, 'true');
      setPopupOpen(true);
    }
    if (cookie === 'false') {
      setPopupOpen(false);
    }
    if (cookie === 'true') {
      setPopupOpen(true);
    }
  }, [cookieName, setPopupOpen]);

  return (
    <Zoom in={popupOpen}>
      <Card
        variant="outlined"
        sx={{
          position: 'fixed',
          top: 157,
          right: 16,
          zIndex: 410,
          width: 200,
          padding: '15px',
          backgroundColor: '#fff',
          border: 'none ',
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            width: 0,
            height: 0,
            p: 0,
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', p: '0' }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: '4px',
                fontSize: '12px',
                lineHeight: '15px',
              }}
            >
              Find Your Fridge
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '11px',
                lineHeight: '15px',
              }}
            >
              Use the filters at the top of the map to find a fridge near you!
            </Typography>
          </CardContent>
          <img height="84px" src="/card/paragraph/searchInfoPopupApple.svg" />
        </div>
      </Card>
    </Zoom>
  );
}
