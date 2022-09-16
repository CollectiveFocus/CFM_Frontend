import PropTypes from 'prop-types';
import Head from 'next/head';
import { PageFooter } from 'components/atoms';

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
      <PageFooter fixedAtBottom={true} />
    </>
  );
}
HostAFridgePage.propTypes = PropTypes.exact({}).isRequired;
