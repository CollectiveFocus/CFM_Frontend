import PropTypes from 'prop-types';
import Head from 'next/head';
import { ButtonLink, PageFooter, DecoratedParagraph } from 'components/atoms';
import { Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export async function getStaticProps() {
  return {
    props: {
      inquiries: [],
      press: [],
    },
  };
}

export default function SpreadTheWord({ inquiries, press }) {
  return (
    <>
      <Head>
        <title>Spread the Word</title>
      </Head>
      <Box mx={3}>
        <DecoratedParagraph
          variant="h1"
          title="Spread the Word"
          body="Fridges have their own communities on social media, as well as academic interest and international press coverage."
          hasDivider={false}
        />
        <Typography variant="body1" sx={{ mt: 8 }}>
          On FridgeFinder, you can find a fridge near you, connect with the
          location, and share updates. To collaborate with us behind the scenes,
          join our engineering or outreach teams.
        </Typography>

        <Typography variant="body1" sx={{ mt: 8 }}>
          There are groups across New York City that source donations and
          maintenance support for fridges. This is essential to keeping fridges
          active.
        </Typography>

        <Typography variant="h2" textAlign="center" sx={{ mt: 8 }}>
          Academic Inquiries
        </Typography>

        {renderAcademicInquiries(inquiries)}

        <Typography variant="h2" textAlign="center" sx={{ mt: 8 }}>
          Press
        </Typography>
        {renderPress(press)}
      </Box>

      <PageFooter fixedAtBottom={false} />
    </>
  );
}

function renderAcademicInquiries(inquiry) {
  return <List>{/* todo - no inquiries listed*/}</List>;
}

function renderPress(press) {
  return <List>{/* todo - no press listed*/}</List>;
}

SpreadTheWord.propTypes = PropTypes.exact({
  props: {
    content: PropTypes.arrayOf(DecoratedParagraph.propTypes),
  },
}).isRequired;
