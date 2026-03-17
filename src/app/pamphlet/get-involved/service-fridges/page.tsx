import React from 'react';
import { Metadata } from 'next';
import { Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';
import { ButtonLink } from 'components/ui';

export const metadata: Metadata = {
  title: 'Fridge Finder: Service fridges',
};

export default function ServiceFridgesPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Taking care of fridges"
        img={{
          src: '/hero/service_fridges.webp',
          alt: 'Man inspecting fridge',
        }}
      />

      <PamphletParagraph>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Fridges should be cleaned daily. If you see trash at a fridge
          location, take the trash with you to dispose of it properly. If the
          fridge is in need of a repair, you can alert our community on Fridge
          Finder by submitting a status report for that fridge.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          Do you have repair skills that can fix broken refrigerators? Can you
          help build fridge shelters? Contact us.
        </Typography>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <ButtonLink
            title="Service Fridges"
            to="/contact?subject=Fridge%20Service%20Interest"
            aria-label="Interested in fixing and maintaining a fridge"
            variant="contained"
          />
        </Box>
      </PamphletParagraph>
    </>
  );
}
