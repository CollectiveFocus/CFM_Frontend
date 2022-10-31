import Head from 'next/head';
import { PageFooter, PamphletParagraph } from 'components/atoms';
import { Box } from '@mui/material';

export default function DonateAFridge() {
  return (
    <>
      <Head>
        <title>Fridge Finder: Donate to a Fridge</title>
      </Head>
      <Box mx={8} mb={6}>
        <PamphletParagraph
          variant="h1"
          title="Spread the Word"
          body={['Give your time, food, or funds to make a big impact!']}
          hasDividerBottom={true}
        />

        <PamphletParagraph
          variant="h2"
          title="When Donating Time:"
          body={[
            'Most fridges are accessible 24/7, and these locations can use your support. Every community fridge has their own volunteer process, which can be found by contacting that fridge individually. As a general principle, we encourage everyone investing time into this project to treat others with kindness and respect.',
            'To volunteer with our specific group, Collective Focus, contact us.',
          ]}
          hasDividerBottom={true}
          button={{
            title: 'Volunteer with Collective Focus',
            to: {
              pathname: '/user/contact',
              query: { subject: 'Volunteer Interest' },
            },
            'aria-label': 'Volunteer with Collective Focus',
            variant: 'contained',
            size: 'wide',
          }}
        />

        <PamphletParagraph
          variant="h2"
          title="When Donating Food:"
          body={[
            'Food should be great quality, fresh, and sealed in airtight containers. Label donated meals with ingredients and date. Do not leave items outside of the fridges. Before donating, read our best practices.',
          ]}
          hasDividerBottom={true}
          button={{
            title: 'Best Practices',
            to: '/pamphlet/best-practices',
            'aria-label': 'Best Practices',
            variant: 'contained',
            size: 'wide',
          }}
        />

        <PamphletParagraph
          variant="h2"
          title="When Donating Funds:"
          body={[
            'Fridges should be cleaned daily. If you see trash at a fridge location, take the trash with you to dispose of it properly. If the fridge is in need of a repair, you can alert our community on Fridge Finder by doing a fridge ‘check in.’ Do you have repair skills that can fix broken refrigerators? Can you help build fridge shelters? Contact us.',
          ]}
          button={{
            title: 'Donate!',
            to: {
              pathname: '/user/contact',
              query: { subject: 'Donation Inquiry' },
            },
            'aria-label': 'Donate funds to Fridge Finder!',
            variant: 'contained',
            size: 'wide',
          }}
        />
      </Box>

      <PageFooter fixedAtBottom={false} />
    </>
  );
}
