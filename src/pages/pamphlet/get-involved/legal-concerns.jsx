import Head from 'next/head';
import { Box } from '@mui/material';
import { PageFooter, PamphletParagraph } from 'components/atoms';
import List from '@mui/material/List';

const factSheet = [];
const inquiries = [];

export default function LegalConcerns() {
  return (
    <>
      <Head>
        <title>Fridge Finder: Legal Concerns</title>
      </Head>
      <Box mx={8} mb={6}>
        <PamphletParagraph
          title="Legal Concerns"
          variant="h1"
          body={[
            'Community fridges are safe, legal, and protected from liability under the Bill Emerson Good Samaritan Food Donation Act. For more legality information, please review this fact sheet created by Harvard Law School.',
          ]}
        />

        {renderFactSheet(factSheet)}
      </Box>

      <PageFooter fixedAtBottom={true} />
    </>
  );
}

function renderFactSheet(factSheet) {
  //todo - no fact sheet listed
  return <List></List>;
}
