import Head from 'next/head';
import { PageHero, PamphletParagraph, PageFooter } from 'components/atoms';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/donate_to_a_fridge.webp',
      alt: 'Volunteer hosting a bake sale to raise money for a community fridge',
    },
  },
  content: [
    {
      variant: 'h1',
      title: 'Donate to a fridge',
      body: ['Give your time, food, or funds to make a big impact!'],
    },
    {
      variant: 'h2',
      title: 'When donating time',
      body: [
        'Most fridges are accessible 24/7, and these locations can use your support. Every community fridge has their own volunteer process, which can be found by contacting that fridge individually. As a general principle, we encourage everyone investing time into this project to treat others with kindness and respect.',
        'To volunteer with our specific group, Collective Focus, contact us.',
      ],
      button: {
        title: 'Volunteer',
        to: {
          pathname: '/user/contact',
          query: { subject: 'Volunteer Interest' },
        },
        'aria-label': 'Volunteer',
        variant: 'contained',
      },
    },
    {
      variant: 'h2',
      title: 'When donating food',
      body: [
        'Food should be great quality, fresh, and sealed in airtight containers. Label donated meals with ingredients and date. Do not leave items outside of the fridges. Before donating, read our best practices.',
      ],
      button: {
        title: 'Best Practices',
        to: '/pamphlet/best-practices',
        'aria-label': 'Best Practices',
        variant: 'contained',
      },
    },
    {
      variant: 'h2',
      title: 'When donating funds',
      body: [
        'Fridges should be cleaned daily. If you see trash at a fridge location, take the trash with you to dispose of it properly. If the fridge is in need of a repair, you can alert our community on Fridge Finder by submitting a status report for that fridge. Do you have repair skills that can fix broken refrigerators? Can you help build fridge shelters? Contact us.',
      ],
      button: {
        title: 'Donate!',
        to: {
          pathname:
            'https://www.gofundme.com/f/collective-focus-holiday-fundraiser-2022',
          query: { subject: 'Donation Inquiry' },
        },
        'aria-label': 'Donate funds to Fridge Finder!',
        variant: 'contained',
      },
    },
  ],
};

export default function DonateToAFridgePage() {
  const { pageHero, content } = pageContent;
  return (
    <>
      <Head>
        <title>Fridge Finder: Donate to a fridge</title>
      </Head>

      <PageHero {...pageHero} />

      {content.map((paragraph, index) => (
        <PamphletParagraph
          {...paragraph}
          key={index + '_DonateToAFridgePage'}
          hasDivider={index > 0}
        />
      ))}

      <PageFooter fixedAtBottom={false} />
    </>
  );
}
