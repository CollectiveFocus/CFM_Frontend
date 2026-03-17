import React from 'react';
import { Metadata } from 'next';
import { Typography, Box } from '@mui/material';
import { PageHero } from 'components/layout';
import { PamphletParagraph } from 'features/marketing';
import { ButtonLink } from 'components/ui';

export const metadata: Metadata = {
  title: 'Fridge Finder: Join a community group',
};

const organizations = [
  {
    name: 'Artists.Athletes.Activists',
    url: 'https://artists-athletes-activists.org/',
  },
  { name: 'Black Chef Movement', url: 'https://blackchefmovement.org/' },
  {
    name: 'Black Voices Matter',
    url: 'https://www.blackvoicesmatterpledge.org/',
  },
  { name: 'Bushwick Ayuda Mutua ', url: 'https://bushwickayudamutua.com/' },
  {
    name: 'Collective Focus Resource Hub',
    url: 'https://collectivefocus.site/',
  },
  { name: 'Freedge', url: 'https://freedge.org/' },
  { name: 'Nuestra Mesa Brooklyn', url: 'https://www.nuestramesabk.com/' },
  {
    name: 'One Love Community Fridge',
    url: 'https://www.onelovecommunityfridge.org/',
  },
  { name: 'Stuff4Good', url: 'https://officialgoodstuff.com/stuff4good/' },
  { name: 'Universe City', url: 'https://www.universecity.nyc/' },
  { name: 'Woodbine Mutual Aid', url: 'https://www.woodbine.nyc/mutualaid/' },
];

export default function JoinACommunityGroupPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Join a community group"
        img={{
          src: '/hero/join_a_community_group.webp',
          alt: 'Volunteers resting',
        }}
      />

      <PamphletParagraph>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          The fridges near you most likely needs help cleaning and sourcing
          food. Anyone can participate in running community fridges. You are
          welcome to organize your own initiatives because operations for
          community fridges are decentralized and autonomous.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          On Fridge Finder, you can find a fridge near you, connect with the
          location, and share status updates. To collaborate with us behind the
          scenes, join our engineering or outreach teams.
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

      <PamphletParagraph title="Community groups we recommend" hasDivider>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          There are groups across New York City that source donations and
          maintenance support for fridges. This is essential to keeping fridges
          active.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          The following organizations have initiatives to support community
          fridges. To participate, contact the groups that interest you.
        </Typography>
      </PamphletParagraph>

      <Box
        sx={{ mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, maxWidth: 1000, mb: 12 }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
          }}
        >
          {organizations.map(({ name, url }, index) => (
            <Box
              component="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              key={index + '_org'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.08)',
                textDecoration: 'none',
                color: 'text.primary',
                backgroundColor: 'background.paper',
                transition: 'all 0.2s ease',
                minHeight: 80,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(21, 67, 212, 0.03)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  color: 'primary.main',
                },
              }}
            >
              <Typography variant="body1" fontWeight={700}>
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
