import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FindFridge from './find';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { MapOutlined, FormatListBulletedOutlined } from '@mui/icons-material';

export default function FridgeMap() {
  const importFridgeData = require('../../components/organisms/FridgeMap/FridgeData.json');

  const [state, setState] = useState({
    fridgeData: [],
    mapMode: true,
  });

  const { mapMode, fridgeData } = state;

  useEffect(() => {
    setState({
      ...state,
      fridgeData: importFridgeData,
    });
  }, []);

  const DynamicMap = dynamic(
    () => {
      return import('../../components/organisms/FridgeMap');
    },
    { ssr: false }
  );

  const MapListToggleButton = () => {
    return (
      <Button
        onClick={onMapListToggle}
        fullWidth
        startIcon={mapMode ? <FormatListBulletedOutlined /> : <MapOutlined />}
        sx={{
          position: 'fixed',
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
          ':hover': { backgroundColor: '#fff' },
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
      {mapMode ? (
        <DynamicMap fridgeData={fridgeData} sx={{ width: '100%' }} />
      ) : (
        <FindFridge fullWidth />
      )}
      {<MapListToggleButton />}
    </Container>
  );
}
