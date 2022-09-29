import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import { getFridgeList, getGhostFridgeList } from 'model/view';

const DynamicMap = dynamic(
  () => {
    return import('../components/organisms/browse/Map');
  },
  { ssr: false }
);

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
const BrowseMap = (props) => <DynamicMap {...props} />;

let fridgeList = null;
let ghostList = null;
export default function BrowseMapPage() {
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      fridgeList = await getFridgeList();
      ghostList = await getGhostFridgeList();
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
        ? BrowseMap({
            centerMap: fridgePaperBoyLoveGallery,
            fridgeList,
            ghostList,
          })
        : ProgressIndicator}
    </>
  );
}
BrowseMapPage.propTypes = PropTypes.exact({}).isRequired;
