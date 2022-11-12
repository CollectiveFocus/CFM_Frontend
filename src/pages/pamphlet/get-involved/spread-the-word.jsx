import Head from 'next/head';
import { PageFooter, PamphletParagraph } from 'components/atoms';
import { Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const inquiries = [];
const press = [];

export default function SpreadTheWord() {
  return (
    <>
      <Head>
        <title>Fridge Finder: Spread the Word</title>
      </Head>
      <Box mx={8} mb={6}>
        <PamphletParagraph
          variant="h1"
          title="Spread the Word"
          body={[
            'Fridges have their own communities on social media, as well as academic interest and international press coverage.',
            'On Fridge Finder, you can find a fridge near you, connect with the location, and share updates. To collaborate with us behind the scenes, join our engineering or outreach teams.',
            'There are groups across New York City that source donations and maintenance support for fridges. This is essential to keeping fridges active.',
          ]}
        />

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
