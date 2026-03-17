import React from 'react';
import { Metadata } from 'next';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';

const pageContent = {
  pageHero: {
    img: {
      src: '/hero/service_fridges.webp',
      alt: 'Man inspecting fridge',
    },
  },
  content: [
    {
      variant: 'h1' as const,
      title: 'Taking care of fridges',
      body: [
        'Fridges should be cleaned daily. If you see trash at a fridge location, take the trash with you to dispose of it properly. If the fridge is in need of a repair, you can alert our community on Fridge Finder by submitting a status report for that fridge. Do you have repair skills that can fix broken refrigerators? Can you help build fridge shelters? Contact us.',
      ],
      button: {
        title: 'Service Fridges',
        to: '/contact?subject=Fridge%20Service%20Interest',
        'aria-label': 'Interested in fixing and maintaining a fridge',
        variant: 'contained' as const,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Fridge Finder: Service fridges',
};

export default function ServiceFridgesPage(): React.ReactElement {
  const { pageHero, content } = pageContent;
  return (
    <>
      <PageHero {...pageHero} />

      {content.map((paragraph, index) => (
        <PamphletParagraph
          {...paragraph}
          key={index + '_ServiceFridgesPage'}
          hasDivider={index > 0}
        />
      ))}

      
    </>
  );
}
