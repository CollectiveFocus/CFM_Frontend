import PropTypes from 'prop-types';
import Head from 'next/head';
import NoSsr from '@mui/material/NoSsr';
import dynamic from 'next/dynamic';

const locationBrooklynBridge = {
  geoLat: 40.70580857568261,
  geoLng: -73.99646699561376,
};

export default function BrowseMapPage() {
  const DynamicMap = dynamic(
    () => {
      return import('../components/organisms/browse/Map');
    },
    { ssr: false }
  );
  return (
    <>
      <Head>
        <title>CFM: Geographic Map</title>
      </Head>
      <NoSsr>
        <DynamicMap {...locationBrooklynBridge} />
      </NoSsr>
    </>
  );
}
BrowseMapPage.propTypes = PropTypes.exact({}).isRequired;
