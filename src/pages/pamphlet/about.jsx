import Head from 'next/head';
import { PageHero, PamphletParagraph, PageFooter } from 'components/atoms';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/about.webp',
      alt: 'The group at Community Focus',
    },
  },
  content: [
    {
      variant: 'h1',
      title: 'How it Started',
      body: [
        'Community fridges became popular in 2020 as a way to directly provide free food to people in need and combat food waste. During the pandemic, outdoor refrigerators served as emergency access points for life-sustaining nutrition in dozens of cities around the world. The food found inside fridges come from diverse sources, mostly individual donors or surplus food that is “rescued” from the supply chain.',
      ],
    },
    {
      img: {
        src: '/paragraph/pamphlet/about/independence_for_each_fridge.webp',
        alt: 'People making their own choices',
        width: 414,
        height: 276,
      },
      variant: 'h2',
      title: 'Independence for Each Fridge',
      body: [
        'Community fridges are independently operated by local businesses, activists, neighbors, or faith-based organizations. Cumulatively, fridge hosts and organizers do not identify with a singular monolithic identity or ethos. Instead, fridges are as unique as the neighborhoods that have them. Community fridges are used by all different types of people everyday, oftentimes working class families, immigrants, and homeless populations in need of an extra food source. A common value is respect for the autonomy of each refrigerator.',
      ],
    },
    {
      img: {
        src: '/paragraph/pamphlet/about/public_art_installation_on_our_sidewalks.webp',
        alt: 'Artists painting',
        width: 414,
        height: 276,
      },
      variant: 'h2',
      title: 'A Public Art Installation on Our Sidewalks',
      body: [
        'Artists popularized the community fridges by painting colorful designs on the doors and sides to attract interest and curiosity. This creative element effectively transforms an everyday object into a cultural artifact that carries a powerful message about circular economics and mutual aid. As public art installations, the fridges receive widespread support from the press and social media, giving visibility to this project’s social impact.',
      ],
    },
    {
      img: {
        src: '/paragraph/pamphlet/about/technology_empowers_us.webp',
        alt: 'Technology resources',
        width: 414,
        height: 276,
      },
      variant: 'h2',
      title: 'Technology Empowers Us',
      body: [
        'Taking our mission a step further, a small team of artists and engineers united to build this fridge app. We are Collective Focus, an organization that provides resources and creative opportunities. The goal of our app is to support a larger consortium of people working together to maintain fridges in New York City. By using technology for good, we are building greater capacity for this project to prosper long term. With this app, people are empowered to check on fridges with more organizational capacity, volunteer drivers are mobilized to transport rescued food to fridges, and the incredible everyday contributions to this work are archived for future inspiration',
      ],
    },
    {
      img: {
        src: '/paragraph/pamphlet/about/collective_focus.webp',
        alt: 'Volunteers standing in front of the Collective Focus building',
        width: 414,
        height: 276,
      },
      variant: 'h2',
      title: 'Collective Focus',
      body: [
        'Collective Focus is an artist community that builds prosperity through resource distribution and creative opportunities. Our team has launched, maintained, and operated community fridges for over 2 years, making an impact on 50 fridges worldwide. We currently host four fridges at our physical location in Brooklyn and we provide support to grassroots organizers within our network.',
      ],
    },
    {
      variant: 'h2',
      title: 'Help out the fridges',
      body: [
        'The growth and success of the project depends on community support. There are many ways to help out the community fridge movement in New York and beyond.',
      ],
      button: {
        title: 'Get Involved',
        to: '/pamphlet/get-involved',
        'aria-label': 'Get involved with the community fridge movement',
        variant: 'contained',
        size: 'wide',
      },
    },
  ],
};

export default function AboutPage() {
  const { pageHero, content } = pageContent;
  return (
    <>
      <Head>
        <title>Fridge Finder: About Us</title>
      </Head>
      <PageHero {...pageHero} />

      {content.map((paragraph, index) => (
        <PamphletParagraph
          {...paragraph}
          key={index + '_AboutPage'}
          hasDivider={index > 0}
        />
      ))}

      <PageFooter />
    </>
  );
}
