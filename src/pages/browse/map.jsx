import PropTypes from 'prop-types';
import Head from 'next/head';

export async function getStaticProps() {
  return { props: {} };
}

export default function BrowseMapPage() {
  return (
    <>
      <Head>
        <title>CFM: Geographic Map</title>
      </Head>
      <p>CFM: Geographic Map</p>
    </>
  );
}
BrowseMapPage.propTypes = PropTypes.exact({}).isRequired;
