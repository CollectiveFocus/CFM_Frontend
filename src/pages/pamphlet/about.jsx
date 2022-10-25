import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@mui/material';
import { ButtonLink, DecoratedParagraph, PageFooter } from 'components/atoms';

export async function getStaticProps() {
  return {
    props: {
      content: [
        {
          title: 'How it Started',
          variant: 'h1',
          body: 'Community fridges became popular in 2020 as a way to directly provide free food to people in need and combat food waste. During the pandemic, outdoor refrigerators served as emergency access points for life-sustaining nutrition in dozens of cities around the world. The food found inside fridges come from diverse sources, mostly individual donors or surplus food that is “rescued” from the supply chain.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: 'Independence for Each Fridge',
          variant: 'h2',
          body: 'Community fridges are independently operated by local businesses, activists, neighbors, or faith-based organizations. Cumulatively, fridge hosts and organizers do not identify with a singular monolithic identity or ethos. Instead, fridges are as unique as the neighborhoods that have them. Community fridges are used by all different types of people everyday, oftentimes working class families, immigrants, and homeless populations in need of an extra food source. A common value is respect for the autonomy of each refrigerator.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: 'A Public Art Installation on Our Sidewalks',
          variant: 'h2',
          body: 'Artists popularized the community fridges by painting colorful designs on the doors and sides to attract interest and curiosity. This creative element effectively transforms an everyday object into a cultural artifact that carries a powerful message about circular economics and mutual aid. As public art installations, the fridges receive widespread support from the press and social media, giving visibility to this project’s social impact.',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: 'Technology Empowers Us',
          variant: 'h2',
          body: 'Taking our mission a step further, a small team of artists and engineers united to build this fridge app. We are Collective Focus, an organization that provides resources and creative opportunities. The goal of our app is to support a larger consortium of people working together to maintain fridges in New York City. By using technology for good, we are building greater capacity for this project to prosper long term. With this app, people are empowered to check on fridges with more organizational capacity, volunteer drivers are mobilized to transport rescued food to fridges, and the incredible everyday contributions to this work are archived for future inspiration',
        },
        {
          img: {
            src: '/img/hero.webp',
            alt: 'stand in img',
            width: 348,
            height: 244,
          },
          title: 'Collective Focus',
          variant: 'h2',
          body: 'Collective Focus is an artist community that builds prosperity through resource distribution and creative opportunities. Our team has launched, maintained, and operated community fridges for over 2 years, making an impact on 50 fridges worldwide. We currently host four fridges at our physical location in Brooklyn and we provide support to grassroots organizers within our network.',
        },
        {
          title: 'Help out the fridges',
          variant: 'h2',
          body: 'The growth and success of the project depends on community support. There are many ways to help out the community fridge movement in New York and beyond.',
        },
      ],
    },
  };
}

export default function AboutPage({ content }) {
  const headerImg = {
    src: '/img/hero.webp',
    alt: 'fill in image',
    width: 360,
    height: 130,
  };
  return (
    <>
      <Head>
        <title>Fridge Finder: About Us</title>
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

      <Box mx={3}>
        {content.map((para, index) => (
          <DecoratedParagraph
            {...para}
            key={para.title}
            hasDivider={index > 0}
          />
        ))}
      </Box>

      <Box textAlign="center">
        <ButtonLink
          variant="contained"
          sx={{ my: 7, minWidth: 345 }}
          to="/pamphlet/get-involved"
          aria-label="Get involved with the community fridge movement"
        >
          GET INVOLVED
        </ButtonLink>
      </Box>
      <PageFooter />
    </>
  );
}
AboutPage.propTypes = PropTypes.exact({
  props: {
    content: PropTypes.arrayOf(DecoratedParagraph.propTypes),
  },
}).isRequired;
