import Head from 'next/head';
import { Grid } from '@mui/material';
import {
  PageFooter,
  PageHero,
  PamphletParagraph,
  TitleCard,
} from 'components/atoms';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/get-involved.webp',
      alt: 'Volunteers in front of a community fridge',
    },
  },
  introParagraph: {
    title: 'Get Involved!',
    body: ['There are many ways to support the future of the fridges.'],
    variant: 'h1',
  },
  titleCards: [
    {
      title: 'Start A Fridge',
      link: '/pamphlet/get-involved/start-a-fridge',
      img: {
        src: '/card/title/startFridge.svg',
        alt: 'A smiling fridge',
      },
    },
    {
      title: 'Become A Driver',
      link: '/pamphlet/get-involved/become-a-driver',
      img: {
        src: '/card/title/becomeDriver.svg',
        alt: 'A car with a smiling face',
      },
    },
    {
      title: 'Donate To A Fridge',
      link: '/pamphlet/get-involved/donate-to-a-fridge',
      img: {
        src: '/card/title/donate.svg',
        alt: 'A smiling piggy bank with a coin being inserted',
      },
    },
    {
      title: 'Source Food',
      link: '/pamphlet/get-involved/source-food',
      img: {
        src: '/card/title/sourceFood.svg',
        alt: 'A smiling bell pepper, tomato, and broccoli',
      },
    },
    {
      title: 'Service Fridges',
      link: '/pamphlet/get-involved/service-fridges',
      img: {
        src: '/card/title/serviceFridge.svg',
        alt: 'A smiling wrench and screwdriver',
      },
    },
    {
      title: 'Join A Community Group',
      link: '/pamphlet/get-involved/join-a-community-group',
      img: {
        src: '/card/title/joinCommunity.svg',
        alt: 'Four hands coming together with a smiling heart in the center',
      },
    },
  ],
};

export default function GetInvolvedPage() {
  const { pageHero, introParagraph, titleCards } = pageContent;
  return (
    <>
      <Head>
        <title>Fridge Finder: Get Involved</title>
      </Head>
      <PageHero {...pageHero} />
      <PamphletParagraph sx={{ textAlign: 'center' }} {...introParagraph} />
      <Grid container spacing={{ xs: 2, sm: 4, md: 6 }} my={{ xs: 4, md: 6 }}>
        {titleCards.map((card, index) => (
          <Grid
            key={index}
            item
            container
            justifyContent="center"
            xs={6}
            sm={4}
          >
            <TitleCard key={'TitleCard' + index} {...card} />
          </Grid>
        ))}
      </Grid>
      <PageFooter scrollButton={false} />
    </>
  );
}
