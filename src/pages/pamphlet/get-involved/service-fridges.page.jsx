import Head from 'next/head';
import { PageHero, PamphletParagraph, PageFooter } from 'components/atoms';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/service_fridges.webp',
      alt: 'Man inspecting fridge',
    },
  },
  content: [
    {
      variant: 'h1',
      title: 'Taking care of fridges',
      body: [
        'Fridges should be cleaned daily. If you see trash at a fridge location, take the trash with you to dispose of it properly. If the fridge is in need of a repair, you can alert our community on Fridge Finder by submitting a status report for that fridge. Do you have repair skills that can fix broken refrigerators? Can you help build fridge shelters? Contact us.',
      ],
      button: {
        title: 'Service Fridges',
        to: {
          pathname: '/user/contact',
          query: { subject: 'Fridge Service Interest' },
        },
        'aria-label': 'Interested in fixing and maintaining a fridge',
        variant: 'contained',
      },
    },
  ],
};

export default function ServiceFridgesPage() {
  const { pageHero, content } = pageContent;
  return (
    <>
      <Head>
        <title>Fridge Finder: Service fridges</title>
      </Head>

      <PageHero {...pageHero} />

      {content.map((paragraph, index) => (
        <PamphletParagraph
          {...paragraph}
          key={index + '_ServiceFridgesPage'}
          hasDivider={index > 0}
        />
      ))}

      <PageFooter fixedAtBottom={true} />
    </>
  );
}
