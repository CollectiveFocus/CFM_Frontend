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
      organizations: [
        { name: 'Collective Focus Resource Hub ' },
        { name: 'One Love Community Fridge' },
        { name: 'Black Chef Movement' },
        { name: 'Stuff4Good' },
        { name: 'Artists.Athletes.Activists' },
        { name: 'Universe City' },
        { name: 'Woodbine Mutual Aid' },
        { name: 'Nuestra Mesa Brooklyn' },
      ],
    },
  };
}

export default function JoinACommunityGroup({ content, organizations }) {
  return (
    <>
      <Head>
        <title>Join a Community Group</title>
      </Head>
      <Box mx={3}>
        <DecoratedParagraph
          variant="h1"
          title="Join a Community Group."
          body="The fridges near you most likely need help cleaning and sourcing food. Anyone can participate in running community fridges. You are welcome to organize your own initiatives because operations for community fridges are decentralized and autonomous."
          hasDivider={false}
        />
        <Typography variant="body1" sx={{ mt: 8 }}>
          On FridgeFinder, you can find a fridge near you, connect with the
          location, and share updates. To collaborate with us behind the scenes,
          join our engineering or outreach teams.
        </Typography>

        <Box textAlign="center">
          <ButtonLink
            variant="contained"
            sx={{ my: 7, minWidth: 345 }}
            to="#"
            // [contact link: “Volunteer with FridgeFinder”]
            aria-label="Volunteer with FridgeFinder"
          >
            Volunteer with FridgeFinder
          </ButtonLink>
        </Box>

        <Typography variant="body1">
          There are groups across New York City that source donations and
          maintenance support for fridges. This is essential to keeping fridges
          active.
        </Typography>

        <DecoratedParagraph
          variant="h2"
          title="Community Groups We Recommend"
          body="The following organizations have initiatives to support community fridges. To participate, contact the groups that interest you. "
          hasDivider={false}
        />

        {renderOrganizations(organizations)}
      </Box>

      <PageFooter fixedAtBottom={false} />
    </>
  );
}

function renderOrganizations(orgs) {
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

JoinACommunityGroup.propTypes = PropTypes.exact({
  props: {
    content: PropTypes.arrayOf(DecoratedParagraph.propTypes),
  },
}).isRequired;
