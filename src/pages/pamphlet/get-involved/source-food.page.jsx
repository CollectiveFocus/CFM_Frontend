import Head from 'next/head';
import { PageHero, PamphletParagraph, PageFooter } from 'components/atoms';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/source_food.webp',
      alt: 'Boxes of food stacked up in front of Community Focus',
    },
  },
  content: [
    {
      variant: 'h1',
      title: 'Source Food',
      body: [
        'Sourcing food donations is possible by building relationships with businesses that have surplus products. Fridge organizers are able to redirect food waste from bakeries, grocery stores, pantries, cafes,restaurants, and more. That way, perfectly good food can provide nutrition to people in need, instead of being thrown away. Businesses have many incentives to partner with community fridges. Excess food causes a negative environmental impact and inefficiencies within our economy, which community fridges can help resolve. The best way to approach a business about donating food would be to present materials about community fridges and create a proposal.',
      ],
      button: {
        title: 'Source Food',
        to: {
          pathname: '/user/contact',
          query: { subject: 'Sourcing Food Inquiry' },
        },
        'aria-label': 'Sourcing Food Inquiry',
        variant: 'contained',
        size: 'wide',
      },
    },
  ],
};

export default function SourceFoodPage() {
  const { pageHero, content } = pageContent;
  return (
    <>
      <Head>
        <title>Fridge Finder: Source Food</title>
      </Head>

      <PageHero {...pageHero} />

      {content.map((paragraph, index) => (
        <PamphletParagraph
          {...paragraph}
          key={index + '_SourceFoodPage'}
          hasDivider={index > 0}
        />
      ))}

      <PageFooter fixedAtBottom={true} />
    </>
  );
}
