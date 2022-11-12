import Head from 'next/head';
import { PageFooter } from 'components/atoms';

export default function HostAFridgePage() {
  return (
    <>
      <Head>
        <title>Fridge Finder: Host a Fridge</title>
      </Head>
      <p>Host a Fridge</p>
      <PageFooter fixedAtBottom={true} />
    </>
  );
}
