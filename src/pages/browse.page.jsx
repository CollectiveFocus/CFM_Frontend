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
import BrowseList from 'components/organisms/browse/List';
import { MapToggle } from 'components/atoms/';
import { FilterBar } from 'components/molecules/';

import { getFridgeList } from 'model/view';
import { useFilterStore } from 'model/view/filterStore';

import { useWindowHeight } from 'lib/browser';

const DynamicMap = dynamic(
  () => {
    return import('../components/organisms/browse/Map');
  },
  { ssr: false }
);
const BrowseMap = (props) => {
  console.log('dbg>> browse.page.jsx:28 - props:', props);
  return <DynamicMap {...props} />;
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

export default function BrowsePage() {
  let fridgeList = null;
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [currentView, setCurrentView] = useState(MapToggle.view.map);

  const availableHeight = useWindowHeight();
  const isWindowDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const filters = useFilterStore((state) => state.filters);

  useEffect(() => {
    const fetchData = async () => {
      fridgeList = await getFridgeList();
      setHasDataLoaded(true);
    };
    fetchData().catch(console.error);
  }, [filters]);

  const Map = hasDataLoaded
    ? BrowseMap({
        fridgeList,
      })
    : ProgressIndicator;

  const List = hasDataLoaded ? (
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
            {List}
          </Box>

          <Box sx={{ flex: 2.5 }}>{Map}</Box>
        </>
      );
    } else {
      return (
        <>
          {currentView === MapToggle.view.list ? (
            <Box sx={{ flex: 1, px: 4 }}>{List}</Box>
          ) : (
            <Box sx={{ flex: '1' }}>
              <FilterBar />
              {Map}
            </Box>
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
