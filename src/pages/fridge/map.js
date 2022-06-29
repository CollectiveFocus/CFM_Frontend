import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import FindFridge from './find';
import { Box, Container } from '@mui/system';
import { Button } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

export default function FridgeMap() {
  const [state, setState] = useState({
    mapMode: true,
  });

  const { mapMode } = state;

  const DynamicMap = dynamic(
    () => {
      return import('../../components/organisms/FridgeMap/FridgeMapComponent');
    },
    { ssr: false }
  );

  const MapListToggleButton = () => {
    return (
      <Button
        onClick={onMapListToggle}
        fullWidth
        startIcon={
          mapMode ? <FormatListBulletedOutlinedIcon /> : <MapOutlinedIcon />
        }
        sx={{
          position: 'absolute',
          bottom: 0,
          zIndex: 999,
          height: 60,
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: '-2px 0px 4px rgb(0 0 0 / 20%)',
          justifyContent: 'left',
          padding: 5,
          fontWeight: 500,
          textTransform: 'none',
        }}
      >
        {mapMode ? 'View list' : 'View map'}
      </Button>
    );
  };

  const onMapListToggle = (e) => {
    e.preventDefault();
    setState({
      ...state,
      mapMode: !state.mapMode,
    });
  };

  return (
    <Container sx={{ margin: 0, padding: 0 }}>
      {mapMode ? <DynamicMap /> : <FindFridge />}
      {<MapListToggleButton />}
    </Container>
  );
}
