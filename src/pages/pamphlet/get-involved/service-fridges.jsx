import Head from 'next/head';
import { Box } from '@mui/material';
import { PageFooter, PamphletParagraph } from 'components/atoms';

export default function ServiceFridges() {
  return (
    <>
      <Head>
        <title>Fridge Finder: Service Fridges</title>
      </Head>
      <Box mx={8} mb={6}>
        <PamphletParagraph
          title="Taking Care of Fridges"
          variant="h1"
          body={[
            'Fridges should be cleaned daily. If you see trash at a fridge location, take the trash with you to dispose of it properly. If the fridge is in need of a repair, you can alert our community on Fridge Finder by submitting a status report for that fridge. Do you have repair skills that can fix broken refrigerators? Can you help build fridge shelters? Contact us.',
          ]}
          button={{
            title: 'Service Fridges',
            to: {
              pathname: '/user/contact',
              query: { subject: 'Fridge Service Interest' },
            },
            'aria-label': 'Interested in fixing and maintaining a fridge',
            variant: 'contained',
            size: 'wide',
          }}
        />
      </Box>

      <PageFooter fixedAtBottom={true} />
    </>
  );
}
