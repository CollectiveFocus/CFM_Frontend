import React from 'react';
import { Metadata } from 'next';
import { Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';
import { ButtonLink } from 'components/ui';

export const metadata: Metadata = {
  title: 'Fridge Finder: Donate to a fridge',
};

export default function DonateToAFridgePage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Donate to a fridge"
        subtitle="Give your time, food, or funds to make a big impact!"
        img={{
          src: '/hero/donate_to_a_fridge.webp',
          alt: 'Volunteer hosting a bake sale to raise money for a community fridge',
        }}
      />

      <PamphletParagraph title="When donating time">
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Most fridges are accessible 24/7, and these locations can use your
          support. Every community fridge has their own volunteer process, which
          can be found by contacting that fridge individually. As a general
          principle, we encourage everyone investing time into this project to
          treat others with kindness and respect.
        </Typography>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Volunteer"
            to="/contact?subject=Volunteer%20Interest"
            aria-label="Volunteer"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>

      <PamphletParagraph title="When donating food" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Food should be great quality, fresh, and sealed in airtight
          containers. Label donated meals with ingredients and date. Do not
          leave items outside of the fridges. Before donating, read our best
          practices.
        </Typography>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Best Practices"
            to="/pamphlet/best-practices"
            aria-label="Best Practices"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>

      <PamphletParagraph title="When donating funds" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Fridges should be cleaned daily. If you see trash at a fridge
          location, take the trash with you to dispose of it properly. If the
          fridge is in need of a repair, you can alert our community on Fridge
          Finder by submitting a status report for that fridge. Do you have
          repair skills that can fix broken refrigerators? Can you help build
          fridge shelters? Contact us.
        </Typography>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Donate!"
            to="https://www.gofundme.com/f/hub-holiday2"
            aria-label="Donate funds to Fridge Finder!"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>
    </>
  );
}
