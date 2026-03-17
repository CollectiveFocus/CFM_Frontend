import React from 'react';
import { Metadata } from 'next';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/become_a_driver.webp',
      alt: 'Food carrier picking up lunch bags',
    },
  },
  content: [
    {
      title: 'Become a Driver',
      variant: 'h1' as const,
      body: [
        'Volunteer drivers have the capacity to support many fridges at once by transporting food to multiple locations. These driving routes are often coordinated between fridge organizers, food donors, and drivers. If you have access to a bike or vehicle, you can rescue food and feed people in need. The impact is immediate! Anyone is welcome to coordinate these efforts on their own, but if you would like to request our driver support, contact Fridge Finder.',
      ],
      button: {
        title: 'Become a Driver',
        to: '/contact?subject=Transport%20Food',
        'aria-label': 'Become a Driver',
        variant: 'contained' as const,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Fridge Finder: Become a Driver',
};

export default function BecomeADriverPage(): React.ReactElement {
  const { pageHero, content } = pageContent;
  return (
    <>
      <PageHero {...pageHero} />

      {content.map((paragraph, index) => (
        <PamphletParagraph
          {...paragraph}
          key={index + '_BecomeADriverPage'}
          hasDivider={index > 0}
        />
      ))}

      
    </>
  );
}
