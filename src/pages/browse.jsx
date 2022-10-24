import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SearchMap from 'components/organisms/browse/components/SearchMap';
import MapToggle from 'components/organisms/browse/components/MapToggle';

import {
  CircularProgress,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from '@mui/material';
import BrowseList from 'components/organisms/browse/List';

import { getFridgeList, getGhostFridgeList } from 'model/view';
import { useWindowHeight } from 'lib/browser';

const DynamicMap = dynamic(
  () => {
    return import('../components/organisms/browse/Map');
  },
  { ssr: false }
);
const BrowseMap = (props) => <DynamicMap {...props} />;

const fridgePaperBoyLoveGallery = {
  geoLat: 40.697759,
  geoLng: -73.927282,
};

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

let fridgeList = null;
let ghostList = null;
export default function BrowsePage() {
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [currentView, setCurrentView] = useState(MapToggle.view.map);

  const availableHeight = useWindowHeight();
  const isWindowDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchData = async () => {
      fridgeList = await getFridgeList();
      ghostList = await getGhostFridgeList();
      setHasDataLoaded(true);
    };
    fetchData().catch(console.error);
  }, []);

  const Map = hasDataLoaded
    ? BrowseMap({
        centerMap: fridgePaperBoyLoveGallery,
        fridgeList,
        ghostList,
      })
    : ProgressIndicator;

  const List = hasDataLoaded ? (
    <BrowseList fridges={fridgeList} />
  ) : (
    ProgressIndicator
  );

  const SearchMapBar = (
    <SearchMap currentView={currentView} setView={setCurrentView} />
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
            {List}
          </Box>

          <Box sx={{ flex: 2.5 }}>
            {SearchMapBar}
            {Map}
          </Box>
        </>
      );
    } else {
      return (
        <>
          {currentView === MapToggle.view.list ? (
            <Box sx={{ flex: 1 }}>
              {SearchMapBar}
              <Box px={4}>{List}</Box>
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              {SearchMapBar}
              {Map}
            </Box>
          )}
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>CFM: Geographic Map</title>
      </Head>

      <Box sx={{ display: 'flex', height: availableHeight }}>
        {determineView()}
      </Box>
    </>
  );
}
BrowsePage.propTypes = PropTypes.exact({}).isRequired;
