import PropTypes from 'prop-types';
import Head from 'next/head';
import { PageFooter, DecoratedParagraph } from 'components/atoms';
import { Box } from '@mui/material';
import List from '@mui/material/List';

export async function getStaticProps() {
  return {
    props: {
      factSheet: [],
    },
  };
}

export default function LegalConcerns({ factSheet }) {
  return (
    <>
      <Head>
        <title>Legal Concerns</title>
      </Head>
      <Box mx={3}>
        <DecoratedParagraph
          variant="h1"
          title="Legal Concerns"
          body="Community fridges are safe, legal, and protected from liability under the Bill Emerson Good Samaritan Food Donation Act. For more legality information, please review this fact sheet created by Harvard Law School."
          hasDivider={false}
        />

        {renderFactSheet(inquiries)}
      </Box>

      <PageFooter fixedAtBottom={true} />
    </>
  );
}

function renderFactSheet(factSheet) {
  return <List>{/* todo - no fact sheet listed*/}</List>;
}

LegalConcerns.propTypes = PropTypes.exact({
  props: {
    content: PropTypes.arrayOf(DecoratedParagraph.propTypes),
  },
}).isRequired;
