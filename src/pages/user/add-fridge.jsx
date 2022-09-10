import PropTypes from 'prop-types';
import Head from 'next/head';
import CreateFridge from 'components/organisms/dialog/CreateFridge';

export async function getStaticProps() {
  return { props: {} };
}

export default function AddFridgePage() {
  return (
    <>
      <Head>
        <title>CFM: Add a fridge to the database</title>
      </Head>
      <CreateFridge />
    </>
  );
}
AddFridgePage.propTypes = PropTypes.exact({}).isRequired;
