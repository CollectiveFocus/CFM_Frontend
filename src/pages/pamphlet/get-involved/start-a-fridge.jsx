import Head from 'next/head';
import { Box } from '@mui/material';
import { PageFooter, PamphletParagraph } from 'components/atoms';

export default function StartAFridgePage() {
  return (
    <>
      <Head>
        <title>Fridge Finder: Start a Fridge</title>
      </Head>
      <Box mx={8} mb={6}>
        <PamphletParagraph
          title="Start a community fridge"
          variant="h1"
          body={[
            'Anyone can start a community fridge. The keys to success are finding a great host location, organizing a daily maintenance team, and communicating about your goals both online and in your neighborhood. If you are interested in starting a community fridge, contact us for advice or feedback.',
          ]}
          hasDividerBottom={true}
        />

        <PamphletParagraph
          title="1. Form a team"
          variant="h2"
          body={[
            'To ensure the success and longevity of your community fridge, it is best to have some support from the beginning. Put together a group of people that will help you run the community fridge. We recommend including your friends, neighbors and family. Ensure everyone is excited and committed to running a community fridge.',
          ]}
          hasDividerBottom={true}
        />

        <PamphletParagraph
          title="2. Select a location and a fridge"
          variant="h2"
          hasDividerBottom={true}
          body={[
            'Your team can scout for a location to host a community fridge. A location host would provide your fridge with electricity. Create an agreement on how everyone will dispose of trash at the location, including cardboard boxes that carry food donations. The best fridge hosts are supportive, helpful, and reliable. Examples include restaurants, cafes, bars, small businesses, and churches.',
            'Once you have a location confirmed, you can find a refrigerator. Some people raise money to buy a new fridge, but it is possible to find a free second-use fridge online or by asking us.',
          ]}
          button={{
            title: 'Request A Fridge',
            to: {
              pathname: '/user/contact',
              query: { subject: 'Fridge Request' },
            },
            'aria-label': 'Request a fridge',
            variant: 'contained',
            size: 'wide',
          }}
        />

        <PamphletParagraph
          title="3. Build a fridge shelter"
          variant="h2"
          body={[
            'To keep your fridge protected from outdoor elements like rain and snow, we strongly recommend building a weather resistant structure to protect your refrigerator. Fridge shelters are typically built from wood, which can be purchased or secured from donated materials. You can also do outreach to connect with volunteer carpenters.',
          ]}
          hasDividerBottom={true}
          button={{
            title: 'Get Construction Support',
            to: {
              pathname: '/user/contact',
              query: { subject: 'Construction Support Request' },
            },
            'aria-label': 'Request construction support',
            variant: 'contained',
            size: 'wide',
          }}
        />

        <PamphletParagraph
          title="4. Budgeting tips"
          variant="h2"
          body={[
            'Running a community fridge is not expensive, but there are some costs involved. The basic costs for running a fridge are electricity, cleaning supplies, and trash removal. We also encourage organizers to save money for potential repairs or if the appliance needs to be replaced in the future. With additional funding support, community fridges can also reimburse volunteer drivers for their gas expenses. ',
          ]}
          hasDividerBottom={true}
        />

        <PamphletParagraph
          title="5. Announce the launch"
          variant="h2"
          body={[
            'You can introduce a new community fridge to the public by creating online profiles on Fridge Finder and social media. With Fridge Finder, launching a community fridge is easier because our platform allows everyone to share information in an open forum.',
            'To keep your communication organized, create an email account for the new fridge. From there, you can find press, media opportunities, and collaborations as your food justice efforts grow.',
          ]}
          hasDividerBottom={true}
        />

        <PamphletParagraph
          title="Ready to add a fridge?"
          variant="h2"
          body={[
            'Add a new fridge to Fridge Finder by clicking the button and completing a short form.',
          ]}
          button={{
            title: 'Add a fridge',
            to: '/user/fridge/add',
            'aria-label': 'Add a fridge to Fridge Finder',
            variant: 'contained',
            size: 'wide',
          }}
        />
      </Box>

      <PageFooter fixedAtBottom={false} />
    </>
  );
}