import PropTypes from 'prop-types';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Grid, Typography } from '@mui/material';
import {
  DecoratedParagraph,
  PageFooter,
  PageHero,
  ParagraphCard,
} from 'components/atoms';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
      pageHero: {
        img: {
          src: '/hero/index.webp',
          alt: 'Picture of a New York fridge map',
        },
        title: 'Find a Fridge',
        link: '/browse',
      },
      decoratedParagraph: {
        variant: 'h1',
        title: 'decoratedParagraphHeading',
        body: 'decoratedParagraphBody',
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
          title: 'h2ParagraphCardHeading',
          text: 'h2ParagraphCardBody',
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
            title: 'h3FirstParagraphCardHeading',
            text: 'h3FirstParagraphCardBody',
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
            title: 'h3ParagraphCardHeadingTwo',
            text: 'h3ParagraphCardBodyTwo',
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
            title: 'h3ParagraphCardHeadingThree',
            text: 'h3ParagraphCardBodyThree',
            link: '/pamphlet/get-involved/host-a-fridge',
          },
        ],
      },
    },
  };
}

export default function HomePage({
  decoratedParagraph,
  pageHero,
  paragraphCard,
}) {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>Fridge Finder</title>
      </Head>

      <PageHero {...pageHero} />
      <DecoratedParagraph
        sx={{ mx: { xs: 4, sm: 4, md: 2 }, mb: 10, textAlign: 'center' }}
        variant={decoratedParagraph.variant}
        title={t(decoratedParagraph.title)}
        body={t(decoratedParagraph.body)}
      />

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
          <ParagraphCard
            variant={paragraphCard.h2.variant}
            img={paragraphCard.h2.img}
            title={t(paragraphCard.h2.title)}
            text={t(paragraphCard.h2.text)}
            link={paragraphCard.h2.link}
            learn_more={t('learn.more')}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: { xs: 1, lg: 3 } }}
          >
            {t('get.involved')}
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
              <ParagraphCard
                key={'ParagraphCard' + index}
                variant={card.variant}
                img={card.img}
                title={t(card.title)}
                text={t(card.text)}
                link={card.link}
                learn_more={t('learn.more')}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <PageFooter />
    </>
  );
}
HomePage.propTypes = {
  pageHero: PropTypes.exact(PageHero.propTypes),
  decoratedParagraph: PropTypes.exact(DecoratedParagraph.propTypes),
  paragraphCard: PropTypes.shape({
    h2: PropTypes.exact(ParagraphCard.propTypes),
    h3: PropTypes.arrayOf(PropTypes.exact(ParagraphCard.propTypes)),
  }),
};
