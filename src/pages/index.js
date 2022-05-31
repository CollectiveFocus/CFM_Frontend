import Head from 'next/head';
//import Image from 'next/image'
import About from 'components/LandingPage/About';
import FindAFridge from 'components/LandingPage/FindAFridge';
import GetInvolved from 'components/GetInvolvedFeature';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Community Fridge map</title>
      </Head>
      <FindAFridge />
      <About />
      <GetInvolved />
    </div>
  );
}
