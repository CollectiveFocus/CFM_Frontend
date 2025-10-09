import Head from 'next/head';
import { Grid, Typography } from '@mui/material';
import {
  PamphletParagraph,
  PageFooter,
  PageHero,
  ParagraphCard,
} from 'components/atoms';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/index.webp',
      alt: 'Picture of a New York fridge map',
    },
    button: {
      title: 'Find a Fridge',
      to: '/browse',
      'aria-label': 'Browse the fridge map',
      variant: 'contained',
    },
  },
  introParagraph: {
    variant: 'h1',
    title: 'Take what you need. Leave what you can.',
    body: [
      'Fridge Finder can help you find community fridges containing free food near you. Click the Find A Fridge button for the full map and list of fridges.',
    ],
  },
  paragraphCard: {
    h2: {
      variant: 'h2',
      img: {
        src: '/card/paragraph/pearTomatoAndFridge.svg',
        alt: 'Picture of pear dancing with tomatoes stacked on top of each other',
        width: 125,
        height: 95,
      },
      title: 'About Community Fridges',
      text: 'A community fridge is a decentralized food resource. There are dozens of fridges hosted by volunteers across the New York City area. This website was made to make it easy for people to find fridges and get involved with the community fridge project.',
      link: '/pamphlet/about',
    },
    h3: [
      {
        variant: 'h3',
        img: {
          src: '/card/paragraph/apple.svg',
          alt: 'Picture of smiling apple holding a list',
          width: 125,
          height: 95,
        },
        title: 'Read Best Practices',
        text: 'Please look over the guidelines for food donation best practices to keep our fridges safe and accessible to all.',
        link: '/pamphlet/best-practices',
      },
      {
        variant: 'h3',
        img: {
          src: '/card/paragraph/jumpingBlueberries.svg',
          alt: 'Picture of blueberries jumping and waving',
          width: 125,
          height: 95,
        },
        title: 'Get Involved',
        text: 'There are many ways to get involved with community fridges: from driving; donating food; or starting your own community fridge.',
        link: '/pamphlet/get-involved',
      },
      {
        variant: 'h3',
        img: {
          src: '/card/paragraph/plumAndFridge.svg',
          alt: 'Picture of smiling plum and smiling fridge',
          width: 125,
          height: 95,
        },
        title: 'Start a Fridge',
        text: 'Anyone can start a community fridge. Read our guidelines and discover the valuable lessons we learned from hosting two fridges in central New Jersey.',
        link: '/pamphlet/get-involved/start-a-fridge',
      },
    ],
  },
};

export default function HomePage() {
  const { pageHero, introParagraph, paragraphCard } = pageContent;
  return (
    <>
      <Head>
        <title>Fridge Finder</title>
      </Head>

      <PageHero {...pageHero} />
      <PamphletParagraph sx={{ textAlign: 'center' }} {...introParagraph} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={4}
        mb={4}
        px={4}
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          xs={12}
          sm={10}
          lg={8}
        >
          <ParagraphCard {...paragraphCard.h2} variant="h2" />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: { xs: 1, lg: 3 } }}
          >
            Get involved with community fridges!
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-evenly"
          spacing={4}
        >
          {paragraphCard.h3.map((card, index) => (
            <Grid item key={'Grid' + index} xs={12} sm={8} md={4} lg={3}>
              <ParagraphCard key={'ParagraphCard' + index} {...card} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <PageFooter />
    </>
  );
}
