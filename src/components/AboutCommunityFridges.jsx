import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import PearFridgeTomato from '../../public/mascot/pearFridgeTomatos.svg';
import { Typography, Stack, Button, Divider } from '@mui/material';

export default function AboutCommunityFridges() {
  return (
    <Stack
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={4}
      borderTop={`1px solid #B4B4B4`}
      borderBottom={`1px solid #B4B4B4`}
      paddingTop="40px"
      paddingBottom="40px"
      maxWidth="90%"
      marginInline="auto"
    >
      <Typography variant="h2" textAlign="center" sx={{ mb: { xs: 3, lg: 5 } }}>
        About NYC Community Fridges
      </Typography>
      <Image src={PearFridgeTomato} alt="pear fridge tomato" />
      <Typography variant="body1" textAlign="center">
        A community fridge is a decentralized food resource. There are dozens of
        fridges hosted by volunteers across the New York Cty area. This website
        was made to make it easy for people to find fridges and get involved
        with the community fridge project.
      </Typography>
      <Link href={'/about'} passHref>
        <Button component="a" fullWidth={true}>
          LEARN MORE
        </Button>
      </Link>
    </Stack>
  );
}
