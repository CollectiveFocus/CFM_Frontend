import React from 'react';
import { Metadata } from 'next';
import { Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';
import { ButtonLink } from 'components/ui';

export const metadata: Metadata = {
  title: 'Fridge Finder: Become a Driver',
};

export default function BecomeADriverPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Become a Driver"
        img={{
          src: '/hero/become_a_driver.webp',
          alt: 'Food carrier picking up lunch bags',
        }}
      />

      <PamphletParagraph>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Volunteer drivers have the capacity to support many fridges at once by
          transporting food to multiple locations. These driving routes are
          often coordinated between fridge organizers, food donors, and drivers.
          If you have access to a bike or vehicle, you can rescue food and feed
          people in need. The impact is immediate!
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Anyone is welcome to coordinate these efforts on their own, but if you
          would like to request our driver support, contact Fridge Finder.
        </Typography>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Become a Driver"
            to="/contact?subject=Transport%20Food"
            aria-label="Become a Driver"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>
    </>
  );
}
