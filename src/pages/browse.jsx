import { useEffect, useState } from 'react';

import Head from 'next/head';
import dynamic from 'next/dynamic';

import {
  CircularProgress,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from '@mui/material';

import { getFridgeList } from 'model/view';
import { geolocation, useWindowHeight } from 'lib/navigator';

import { MapToggle } from 'components/atoms/';

import BrowseList from 'components/organisms/browse/List';
const DynamicMap = dynamic(
  () => {
    return import('../components/organisms/browse/Map');
  },
  { ssr: false }
);
const BrowseMap = (props) => <DynamicMap {...props} />;

const ProgressIndicator = (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
    }}
  >
    <CircularProgress color="secondary" />
  </div>
);

const fridgePaperBoyLoveGallery = { geoLat: 40.697759, geoLng: -73.927282 };
const mapCenterDefault = fridgePaperBoyLoveGallery;

let fridgeList = null;
let mapCenter = mapCenterDefault;
let userPosition = null;

export default function BrowsePage() {
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [currentView, setCurrentView] = useState(MapToggle.view.map);

  const availableHeight = useWindowHeight();
  const isWindowDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    getFridgeList()
      .then((data) => {
        fridgeList = data;
        setHasDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });

    geolocation()
      .then((coords) => (userPosition = mapCenter = coords))
      .catch((err) => {
        console.error(err);
      });
  }, [hasDataLoaded]);

  const ViewMap = hasDataLoaded
    ? BrowseMap({
        fridgeList,
        mapCenter,
        userPosition,
      })
    : ProgressIndicator;

  const ViewList = hasDataLoaded ? (
    <BrowseList fridges={fridgeList} />
  ) : (
    ProgressIndicator
  );
  function determineView() {
    if (isWindowDesktop) {
      return (
        <>
          <Box sx={{ flex: 1, overflow: 'scroll', px: 4 }}>
            <Typography variant="h4" sx={{ padding: '1em .5em .5em 0' }}>
              FRIDGES WITHIN THIS AREA
            </Typography>
            <Divider />
            {ViewList}
          </Box>

          <Box sx={{ flex: 2.5 }}>{ViewMap}</Box>
        </>
      );
    } else {
      return (
        <>
          {currentView === MapToggle.view.list ? (
            <Box sx={{ flex: 1, px: 4 }}>{ViewList}</Box>
          ) : (
            <Box sx={{ flex: 1 }}>{ViewMap}</Box>
          )}

          <MapToggle currentView={currentView} setView={setCurrentView} />
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Fridge Finder: Geographic Map</title>
      </Head>

      <Box sx={{ display: 'flex', height: availableHeight }}>
        {determineView()}
      </Box>
    </>
  );
}
