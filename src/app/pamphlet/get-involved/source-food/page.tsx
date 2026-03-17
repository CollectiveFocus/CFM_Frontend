import React from 'react';
import { Metadata } from 'next';
import { Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';
import { ButtonLink } from 'components/ui';

export const metadata: Metadata = {
  title: 'Fridge Finder: Source Food',
};

export default function SourceFoodPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Source Food"
        img={{
          src: '/hero/source_food.webp',
          alt: 'Boxes of food stacked up in front of Community Focus',
        }}
      />

      <PamphletParagraph>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Sourcing food donations is possible by building relationships with
          businesses that have surplus products. Fridge organizers are able to
          redirect food waste from bakeries, grocery stores, pantries, cafes,
          restaurants, and more. That way, perfectly good food can provide
          nutrition to people in need, instead of being thrown away.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Businesses have many incentives to partner with community fridges.
          Excess food causes a negative environmental impact and inefficiencies
          within our economy, which community fridges can help resolve. The best
          way to approach a business about donating food would be to present
          materials about community fridges and create a proposal.
        </Typography>
        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Source Food"
            to="/contact?subject=Sourcing%20Food%20Inquiry"
            aria-label="Sourcing Food Inquiry"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>
    </>
  );
}
