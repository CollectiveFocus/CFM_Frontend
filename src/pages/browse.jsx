import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import { fetchFridgesAndReports } from 'model/data';

const DynamicMap = dynamic(
  () => {
    return import('../components/organisms/browse/Map');
  },
  { ssr: false }
);

const defaultLocationBrooklynBridge = {
  geoLat: 40.70580857568261,
  geoLng: -73.99646699561376,
};
let pageData = null;

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
const BrowseMap = (props) => <DynamicMap {...props} />;

export default function BrowseMapPage() {
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      pageData = await fetchFridgesAndReports();
      setHasDataLoaded(true);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>CFM: Geographic Map</title>
      </Head>
      {hasDataLoaded
        ? BrowseMap({ ...defaultLocationBrooklynBridge, ...pageData })
        : ProgressIndicator}
    </>
  );
}
BrowseMapPage.propTypes = PropTypes.exact({}).isRequired;
