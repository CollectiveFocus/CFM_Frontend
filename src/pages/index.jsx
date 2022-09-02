import PropTypes from 'prop-types';
import Head from 'next/head';
import { Grid, Typography } from '@mui/material';
import { MascotCard, PageFooter, PageHero } from 'components/atoms';

export async function getStaticProps() {
  return {
    props: {
      mascotCard: {
        h2: {
          img: {
            src: '/mascot/pearTomatoAndFridge.svg',
            alt: 'Picture of pear dancing with tomatoes stacked on top of each other',
            width: 300,
            height: 190,
          },
          title: 'About NYC Community Fridges',
          text: 'A community fridge is a decentralized food resource. There are dozens of fridges hosted by volunteers across the New York City area. This website was made to make it easy for people to find fridges and get involved with the community fridge project.',
          link: '/about',
        },
        h3: [
          {
            img: {
              src: '/mascot/apple.svg',
              alt: 'Picture of smiling apple holding a list',
              width: 300,
              height: 185,
            },
            title: 'Read Best Practices',
            text: 'Please look over the guidelines for food donation best practices to keep our fridges safe and accessible to all.',
            link: '/guideline',
          },
          {
            img: {
              src: '/mascot/jumpingBlueberries.svg',
              alt: 'Picture of blueberries jumping and waving',
              width: 300,
              height: 185,
            },
            title: 'Volunteer',
            text: 'There are many ways to volunteer to help out the fridges, from driving, bringing food to fridges, or hosting a fridge.',
            link: '/volunteer',
          },
          {
            img: {
              src: '/mascot/plumAndFridge.svg',
              alt: 'Picture of smiling plum and smiling fridge',
              width: 300,
              height: 185,
            },
            title: 'Host A Fridge',
            text: 'Please look over the guidelines for food donation best practices to keep our fridges safe and accessible to all.',
            link: '/host',
          },
        ],
      },
    },
  };
}

export default function HomePage({ mascotCard }) {
  return (
    <>
      <Head>
        <title>Community Fridge Map</title>
      </Head>

      <PageHero />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
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
          md={12}
          lg={12}
        >
          <MascotCard {...mascotCard.h2} variant="h2" />
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
          {mascotCard.h3.map((card, index) => (
            <Grid item key={index} xs={12} sm={8} md={4} lg={3}>
              <MascotCard key={'MascotCard' + index} {...card} variant="h3" />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <PageFooter />
    </>
  );
}
HomePage.propTypes = PropTypes.exact({
  props: {
    MascotCard: {
      h2: MascotCard.propTypes,
      h3: PropTypes.arrayOf(MascotCard.propTypes),
    },
  },
}).isRequired;
