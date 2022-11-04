import PropTypes from 'prop-types';
import Head from 'next/head';
import { PageFooter, PamphletParagraph } from 'components/atoms';
import { Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export async function getStaticProps() {
  return {
    props: {
      organizations: [
        { name: 'Artists.Athletes.Activists' },
        { name: 'Black Chef Movement' },
        { name: 'Black Voices Matter' },
        { name: 'Bushwick Ayuda Mutua ' },
        { name: 'Collective Focus Resource Hub' },
        { name: 'Freedge' },
        { name: 'Nuestra Mesa Brooklyn' },
        { name: 'One Love Community Fridge' },
        { name: 'Stuff4Good' },
        { name: 'Universe City' },
        { name: 'Woodbine Mutual Aid' },
      ],
    },
  };
}

export default function JoinACommunityGroupPage({ organizations }) {
  return (
    <>
      <Head>
        <title>Fridge Finder: Join a Community Group</title>
      </Head>
      <Box mx={8} mb={6}>
        <PamphletParagraph
          title="Join a Community Group."
          variant="h1"
          body={[
            'The fridges near you most likely needs help cleaning and sourcing food. Anyone can participate in running community fridges. You are welcome to organize your own initiatives because operations for community fridges are decentralized and autonomous.',
            'On Fridge Finder, you can find a fridge near you, connect with the location, and share status updates. To collaborate with us behind the scenes, join our engineering or outreach teams.',
          ]}
          button={{
            title: 'Volunteer with Collective Focus',
            to: {
              pathname: '/user/contact',
              query: { subject: 'Volunteer Interest' },
            },
            'aria-label': 'Volunteer',
            variant: 'contained',
            size: 'wide',
          }}
        />

        {/* <Typography sx={{ mb: 7 }} variant="body1">
          There are groups across New York City that source donations and
          maintenance support for fridges. This is essential to keeping fridges
          active.
        </Typography>

        <PamphletParagraph
          variant="h2"
          title="Community Groups We Recommend"
          body={[
            'The following organizations have initiatives to support community fridges. To participate, contact the groups that interest you.',
          ]}
        />

        {renderOrganizations(organizations)} */}
      </Box>

      <PageFooter fixedAtBottom={true} />
    </>
  );
}
JoinACommunityGroupPage.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.exact({ name: PropTypes.string })),
};

function renderOrganizations(orgs) {
  //todo add better styling

  return (
    <List>
      {orgs.map((org) => (
        <ListItem key={org.name} sx={{ py: 1 }}>
          <ListItemText>{org.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
