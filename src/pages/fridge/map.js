import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FindFridge from './find';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { MapOutlined, FormatListBulletedOutlined } from '@mui/icons-material';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

export default function FridgeMap() {
  const importFridgeData = require('../../components/organisms/FridgeMap/FridgeData.json');

  const defaultLocation = [40.70580857568261, -73.99646699561376]; // default location Brooklyn Bridge

  const [state, setState] = useState({
    fridgeData: [],
    fridgeDistanceFromUser: [],
    filteredFridgeData: [],
    searchQuery: '',
    queryMatches: null,
    mapMode: true,
    setBounds: false,
    utilizeUserLocation: false,
    userLocation: null,
    userLocationInBounds: false,
    selectedFridge: null,
    mapCenter: defaultLocation,
  });

  const {
    mapMode,
    fridgeData,
    fridgeDistanceFromUser,
    filteredFridgeData,
    searchQuery,
    queryMatches,
    utilizeUserLocation,
    userLocation,
    mapCenter,
  } = state;

  useEffect(() => {
    setState({
      ...state,
      fridgeData: importFridgeData.fridges,
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

  // Search Functionality
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
        filteredFridgeData: (fridgeDistanceFromUser.length > 1
          ? fridgeDistanceFromUser
          : fridgeData
        ).filter(
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
    } else {
      setState({
        ...state,
        searchQuery: '',
        filteredFridgeData: [],
      });
    }
  };

  const setSelectedFridge = (fridge) => {
    console.table(fridge);
    const { lat, lng } = fridge;
    setState({
      ...state,
      mapCenter: [lat, lng],
      selectedFridge: fridge,
    });
    // setMapCenter([lat,lng])
  };

  // const setMapCenter = (location = defaultLocation) => {
  //   setState({
  //     ...state,
  //     mapCenter: location,
  //   });
  // };

  // User Location Functionality
  const getUserLocation = () => {
    console.log('Getting user location');
    navigator.geolocation.getCurrentPosition(
      getPositionSuccess,
      getPositionFail,
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const setUserLocation = (userLocation) => {
    console.log('Setting user location...');
    let latitude = userLocation[0];
    let longitude = userLocation[1];
    setState({
      ...state,
      utilizeUserLocation: true,
      userLocation: [latitude, longitude],
    });
  };

  const getPositionSuccess = (newUserLocation) => {
    let { latitude, longitude } = newUserLocation.coords;
    setUserLocation([latitude, longitude]);
    // checkUserInBounds([latitude, longitude]);
  };
  const getPositionFail = (error) => {
    console.log(error.message);
  };

  const getFridgeDistance = (fridgeDistances) => {
    const fridgeDistanceFromUser = fridgeData.map((fridge, i) => ({
      ...fridge,
      distance: fridgeDistances[i],
    }));
    fridgeDistanceFromUser.sort((a, b) => a.distance - b.distance);
    setState({
      ...state,
      fridgeDistanceFromUser: fridgeDistanceFromUser,
      fridgeData: fridgeDistanceFromUser,
    });
  };

  const setUserInBounds = (userInBounds) => {
    setState({
      ...state,
      userInBounds: userInBounds,
    });
  };
  const nycBoundBox = [
    [40.515174, -74.164426],
    [40.924218, -73.693387],
  ];

  // @TODO: Cannot instantiate leaflet in this component; need to move to FridgeMapComponent
  // const checkUserInBounds = (newUserLocation) => {
  //   console.log(newUserLocation);
  //   let southWestPoint = nycBoundBox[0];
  //   let northEastPoint = nycBoundBox[1];
  //   let bounds = Leaflet.latLngBounds(southWestPoint, northEastPoint);
  //   let userInBounds = bounds.contains(newUserLocation);
  //   setUserInBounds(userInBounds);
  // };

  return (
    <Container sx={{ margin: 0, padding: 0 }}>
      <SearchBar
        setSearchQuery={setSearchQuery}
        mapMode={mapMode}
        queryMatches={queryMatches}
        searchQuery={searchQuery}
        getUserLocation={getUserLocation}
        filteredFridgeData={filteredFridgeData}
        setSelectedFridge={setSelectedFridge}
        fridgeDistanceFromUser={fridgeDistanceFromUser}
      />
      {mapMode ? (
        <DynamicMap
          fridgeData={searchQuery !== '' ? filteredFridgeData : fridgeData}
          userLocation={userLocation}
          utilizeUserLocation={utilizeUserLocation}
          setUserInBounds={setUserInBounds}
          mapCenter={mapCenter}
          setState={setState}
          state={state}
          getFridgeDistance={getFridgeDistance}
          fridgeDistanceFromUser={fridgeDistanceFromUser}
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
