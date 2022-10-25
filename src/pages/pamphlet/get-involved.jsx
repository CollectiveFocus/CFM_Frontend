import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { Grid, Box } from '@mui/material';
import { DecoratedParagraph, PageFooter, TitleCard } from 'components/atoms';

export async function getStaticProps() {
  return {
    props: {
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
          link: '/',
          img: {
            src: '/card/title/becomeDriver.svg',
            alt: 'A car with a smiling face',
          },
        },
        {
          title: 'Donate To A Fridge',
          link: '/',
          img: {
            src: '/card/title/donate.svg',
            alt: 'A smiling piggy bank with a coin being inserted',
          },
        },
        {
          title: 'Source Food',
          link: '/',
          img: {
            src: '/card/title/sourceFood.svg',
            alt: 'A smiling bell pepper, tomato, and broccoli',
          },
        },
        {
          title: 'Service Fridges',
          link: '/',
          img: {
            src: '/card/title/serviceFridge.svg',
            alt: 'A smiling wrench and screwdriver',
          },
        },
        {
          title: 'Join A Community Group',
          link: '/',
          img: {
            src: '/card/title/joinCommunity.svg',
            alt: 'Four hands coming together with a smiling heart in the center',
          },
        },
      ],
      introParagraph: {
        title: 'Get Involved!',
        body: 'There are many ways to support the future of the fridges. Viverra sed lorem pellentesque etiam bibendum faucibus.',
        variant: 'h1',
      },
    },
  };
}

export default function GetInvolvedPage({ titleCards, introParagraph }) {
  const headerImg = {
    src: '/img/hero.webp',
    alt: 'fill in image',
    width: 360,
    height: 130,
  };
  return (
    <>
      <Head>
        <title>Fridge Finder: Get Involved</title>
      </Head>
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          mx: 'auto',
        }}
      >
        <Image alt="" {...headerImg} layout="responsive" />
      </Box>
      <DecoratedParagraph
        sx={{ mx: { xs: 4, sm: 4, md: 2 } }}
        {...introParagraph}
      />
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
GetInvolvedPage.propTypes = PropTypes.exact({
  props: {
    introParagraph: DecoratedParagraph.propTypes,
    titleCards: PropTypes.arrayOf(TitleCard.propTypes),
  },
}).isRequired;
