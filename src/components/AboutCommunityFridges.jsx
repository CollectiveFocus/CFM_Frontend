import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import PearFridgeTomato from '../../public/mascot/pearFridgeTomatos.svg';
import { Typography, Button, Box, Item } from '@mui/material';

export default function AboutCommunityFridges() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 1fr',
        },

        placeItems: {
          xs: 'center',
          md: 'start start',
        },
        borderBlock: '1px solid #B4B4B4',
        paddingBlock: '40px',
      }}
    >
      <Box
        sx={{
          order: {
            md: 0,
          },
          alignSelf: {
            md: 'end',
          },
        }}
      >
        <Typography variant="h2" textAlign="center">
          About NYC Community Fridges
        </Typography>
      </Box>
      <Box
        sx={{
          gridRow: {
            md: 'span 3',
          },
          order: {
            md: -1,
          },
          alignSelf: {
            md: 'center',
          },
          justifySelf: {
            md: 'center',
          },
        }}
      >
        <Image src={PearFridgeTomato} alt="pear fridge tomato" />
      </Box>
      <Box
        sx={{
          fontSize: {
            xs: '12px',
            md: '12px',
          },
        }}
      >
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          A community fridge is a decentralized food resource. There are dozens
          of fridges hosted by volunteers across the New York Cty area. This
          website was made to make it easy for people to find fridges and get
          involved with the community fridge project.
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100vw',
            md: 'max-content',
          },
        }}
      >
        <Link href={'/about'} passHref>
          <Button
            component="a"
            fullWidth={true}
            sx={{ paddingInline: { md: '100px' } }}
          >
            LEARN MORE
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
