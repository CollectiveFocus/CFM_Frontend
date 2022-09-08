import PropTypes from 'prop-types';
import Head from 'next/head';

export async function getStaticProps() {
  return { props: {} };
}

export default function HostAFridgePage() {
  return (
    <>
      <Head>
        <title>CFM: Host a Fridge</title>
      </Head>
      <p>CFM: Host a Fridge</p>
    </>
  );
}
HostAFridgePage.propTypes = PropTypes.exact({}).isRequired;
