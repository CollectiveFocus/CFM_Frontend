import PropTypes from 'prop-types';
import Head from 'next/head';
import { Grid } from '@mui/material';
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
      introParagraph: {
        title: 'Get Involved!',
        body: 'There are many ways to support the future of the fridges.',
        variant: 'h1',
        img: {
          src: '/hero/get-involved.webp',
          alt: 'Volunteers in front of a community fridge',
          width: 749,
          height: 319,
          layout: 'intrinsic',
        },
      },
    },
  };
}

export default function GetInvolvedPage({ introParagraph, titleCards }) {
  return (
    <>
      <Head>
        <title>Fridge Finder: Get Involved</title>
      </Head>
      <DecoratedParagraph
        sx={{ mx: { xs: 4, sm: 4, md: 2 }, textAlign: 'center' }}
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
GetInvolvedPage.propTypes = {
  introParagraph: PropTypes.exact(DecoratedParagraph.propTypes),
  titleCards: PropTypes.arrayOf(PropTypes.exact(TitleCard.propTypes)),
};
