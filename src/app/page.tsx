import React from 'react';
import NextLink from 'next/link';
import { Grid, Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph, ParagraphCard } from 'features/marketing';
import { designColor } from 'theme/palette';

const darkButtonSx = {
  '&.MuiButton-outlined': {
    backgroundColor: designColor.blue.dark,
    border: 'none',
    color: 'white',
  },
};
const lightButtonSx = {
  '&.MuiButton-outlined': {
    backgroundColor: designColor.blue.pale,
    border: 'none',
    color: designColor.blue.navy,
  },
};

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
      variant: 'contained' as const,
    },
  },
  introParagraph: {
    variant: 'h1' as const,
    title: 'Take what you need. Leave what you can.',
  },
  paragraphCard: {
    h2: {
      variant: 'h2' as const,
      img: {
        src: '/card/paragraph/pearTomatoAndFridge.svg',
        alt: 'Picture of pear dancing with tomatoes stacked on top of each other',
        width: 125,
        height: 95,
      },
      title: 'About Community Fridges',
      text: 'A community fridge is a decentralized food resource. There are dozens of fridges hosted by volunteers across the New York City area. Fridge Finder makes it easy for people to find fridges and get involved with the community fridge project.',
      link: '/pamphlet/about',
      buttonSx: darkButtonSx,
    },
    h3: [
      {
        variant: 'h3' as const,
        img: {
          src: '/card/paragraph/apple.svg',
          alt: 'Picture of smiling apple holding a list',
          width: 125,
          height: 95,
        },
        title: 'Read Best Practices',
        text: 'Please look over the guidelines for food donation best practices to keep our fridges safe and accessible to all.',
        link: '/pamphlet/best-practices',
        imgMaxWidth: 200,
        buttonTitle: 'Read Guide',
        buttonSx: lightButtonSx,
      },
      {
        variant: 'h3' as const,
        img: {
          src: '/card/paragraph/jumpingBlueberries.svg',
          alt: 'Picture of blueberries jumping and waving',
          width: 125,
          height: 95,
        },
        title: 'Get Involved',
        text: 'There are many ways to get involved with community fridges: from driving, donating food, or starting your own community fridge.',
        link: '/pamphlet/get-involved',
        imgMaxWidth: 200,
        buttonTitle: 'Volunteer',
        buttonSx: darkButtonSx,
      },
      {
        variant: 'h3' as const,
        img: {
          src: '/card/paragraph/plumAndFridge.svg',
          alt: 'Picture of smiling plum and smiling fridge',
          width: 125,
          height: 95,
        },
        title: 'Start a Fridge',
        text: 'Anyone can start a community fridge. Read our guidelines and discover the valuable lessons we learned from hosting two fridges in central New Jersey.',
        link: '/pamphlet/get-involved/start-a-fridge',
        imgMaxWidth: 200,
        buttonTitle: 'Host a Fridge',
        buttonSx: lightButtonSx,
      },
    ],
  },
};

export default function HomePage(): React.ReactElement {
  const { pageHero, introParagraph, paragraphCard } = pageContent;
  return (
    <>
      <PageHero {...pageHero} overlay />
      <PamphletParagraph sx={{ textAlign: 'center' }} {...introParagraph}>
        <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
          Fridge Finder helps you find community fridges with free food near
          you. Click <strong>Find A Fridge</strong> to explore the full map and
          list of fridges. New here? Read our{' '}
          <NextLink
            href="/pamphlet/best-practices"
            style={{ color: designColor.blue.interactive }}
          >
            <strong>Best Practices</strong>
          </NextLink>
        </Typography>
      </PamphletParagraph>

      <Box sx={{ px: { xs: 2, sm: 4 }, mb: 8, mx: 'auto', maxWidth: 1200 }}>
        <Grid container direction="row" justifyContent="center" spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 10,
              lg: 10,
            }}
          >
            <ParagraphCard {...paragraphCard.h2} variant="h2" />
          </Grid>

          <Grid size={12}>
            <Typography
              variant="h2"
              textAlign="center"
              sx={{ mt: 6, mb: { xs: 2, lg: 4 } }}
            >
              Get involved with community fridges!
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={4}
            size={12}
          >
            {paragraphCard.h3.map((card, index) => (
              <Grid
                key={card.title}
                size={{
                  xs: 12,
                  sm: 8,
                  md: 4,
                }}
              >
                <ParagraphCard key={'ParagraphCard' + index} {...card} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
