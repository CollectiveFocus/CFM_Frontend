import React from 'react';
import { Metadata } from 'next';
import { Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';
import { ButtonLink } from 'components/ui';

export const metadata: Metadata = {
  title: 'Fridge Finder: Start a Fridge',
};

export default function StartAFridgePage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Start a community fridge"
        img={{
          src: '/hero/start_a_fridge.webp',
          alt: 'Volunteers building a fridge shelter',
        }}
      />

      <PamphletParagraph>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Anyone can start a community fridge. The keys to success are finding a
          great host location, organizing a daily maintenance team, and
          communicating about your goals both online and in your neighborhood.
          If you are interested in starting a community fridge, contact us for
          advice or feedback.
        </Typography>
      </PamphletParagraph>

      <PamphletParagraph title="1. Form a team" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          To ensure the success and longevity of your community fridge, it is
          best to have some support from the beginning. Put together a group of
          people that will help you run the community fridge. We recommend
          including your friends, neighbors and family. Ensure everyone is
          excited and committed to running a community fridge.
        </Typography>
      </PamphletParagraph>

      <PamphletParagraph title="2. Select a location and a fridge" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Your team can scout for a location to host a community fridge. A
          location host would provide your fridge with electricity. Create an
          agreement on how everyone will dispose of trash at the location,
          including cardboard boxes that carry food donations. The best fridge
          hosts are supportive, helpful, and reliable. Examples include
          restaurants, cafes, bars, small businesses, and churches.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Once you have a location confirmed, you can find a refrigerator. Some
          people raise money to buy a new fridge, but it is possible to find a
          free second-use fridge online or by asking us.
        </Typography>
        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Request A Fridge"
            to="/contact?subject=Fridge%20Request"
            aria-label="Request a fridge"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>

      <PamphletParagraph title="3. Build a fridge shelter" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          To keep your fridge protected from outdoor elements like rain and
          snow, we strongly recommend building a weather resistant structure to
          protect your refrigerator. Fridge shelters are typically built from
          wood, which can be purchased or secured from donated materials. You
          can also do outreach to connect with volunteer carpenters.
        </Typography>
        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Get Construction Support"
            to="/contact?subject=Construction%20Support%20Request"
            aria-label="Request construction support"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>

      <PamphletParagraph title="4. Budgeting tips" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Running a community fridge is not expensive, but there are some costs
          involved. The basic costs for running a fridge are electricity,
          cleaning supplies, and trash removal. We also encourage organizers to
          save money for potential repairs or if the appliance needs to be
          replaced in the future. With additional funding support, community
          fridges can also reimburse volunteer drivers for their gas expenses.
        </Typography>
      </PamphletParagraph>

      <PamphletParagraph title="5. Announce the launch" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          You can introduce a new community fridge to the public by creating
          online profiles on Fridge Finder and social media. With Fridge Finder,
          launching a community fridge is easier because our platform allows
          everyone to share information in an open forum.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          To keep your communication organized, create an email account for the
          new fridge. From there, you can find press, media opportunities, and
          collaborations as your food justice efforts grow.
        </Typography>
      </PamphletParagraph>

      <PamphletParagraph title="Ready to start a fridge?" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Contact us for more information on sourcing a fridge.
        </Typography>
        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Request A Fridge"
            to="/contact?subject=Fridge%20Request"
            aria-label="Request a fridge"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>
    </>
  );
}
