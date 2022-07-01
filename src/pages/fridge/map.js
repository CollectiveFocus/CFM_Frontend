import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FindFridge from './find';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

export default function FridgeMap() {
  const importFridgeData = require('../../components/organisms/FridgeMap/FridgeData.json');

  const [state, setState] = useState({
    fridgeData: [],
    filteredFridgeData: [null],
    searchQuery: '',
    queryMatches: null,
    mapMode: true,
    setBounds: false,
  });

  const { mapMode, fridgeData, filteredFridgeData, searchQuery, queryMatches } =
    state;

  useEffect(() => {
    setState({
      ...state,
      fridgeData: importFridgeData.fridges,
    });
  }, []);

  const DynamicMap = dynamic(
    () => {
      return import('../../components/organisms/FridgeMap/FridgeMapComponent');
    },
    { ssr: false }
  );

  //  const setBounds = setState({
  //   ...state,
  //   setBounds: true
  //  });

  const MapListToggleButton = () => {
    return (
      <Button
        onClick={onMapListToggle}
        fullWidth
        startIcon={
          mapMode ? <FormatListBulletedOutlinedIcon /> : <MapOutlinedIcon />
        }
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

  const setSearchQuery = (query) => {
    setState({
      ...state,
      searchQuery: query,
    });
    filterData(query);
  };

  const filterData = (query) => {
    if (query !== '') {
      setState({
        ...state,
        searchQuery: query,
        filteredFridgeData: fridgeData.filter(
          (data) =>
            (data.name &&
              data.name
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase())) ||
            (data.borough &&
              data.borough
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase()))
        ),
      });
    }
  };

  return (
    <Container sx={{ margin: 0, padding: 0 }}>
      <SearchBar
        setSearchQuery={setSearchQuery}
        mapMode={mapMode}
        queryMatches={queryMatches}
        // setBounds={setBounds}
      />
      {mapMode ? (
        <DynamicMap
          fridgeData={searchQuery == '' ? fridgeData : filteredFridgeData}
          // setBounds={state.setBounds}
          sx={{ width: '100%' }}
        />
      ) : (
        <FindFridge
          fullWidth
          fridgeData={searchQuery == '' ? fridgeData : filteredFridgeData}
        />
      )}
      {<MapListToggleButton />}
    </Container>
  );
}
