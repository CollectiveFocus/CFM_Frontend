import PropTypes from 'prop-types';
import Head from 'next/head';

export async function getStaticProps() {
  return { props: {} };
}

export default function AddFridgePage() {
  return (
    <>
      <Head>
        <title>CFM: Add a Fridge to the database</title>
      </Head>
      <p>CFM: Add a Fridge to the database</p>
    </>
  );
}
AddFridgePage.propTypes = PropTypes.exact({}).isRequired;
