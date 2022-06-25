import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

const props = {
  img: {
    src: '/img/hero.webp',
    alt: 'Community fridges in New York',
  },
  title: 'Take what you need. Leave what you can.',
  text: 'The NYC Community Fridges map can help you find community fridges containing free food. Click button below for the full map and list of fridges.',
  buttonTitle: 'FIND A FRIDGE',
};

export default function PageHero({}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          position: 'relative',
          mb: 4,
        }}
      >
        <Image
          priority
          src={props.img.src}
          layout="fill"
          objectFit="cover"
          alt={props.img.alt}
        />
        <Button variant="contained" sx={{ minWidth: 348 }}>
          {props.buttonTitle}
        </Button>
      </Box>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {props.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {props.text}
      </Typography>
    </Box>
  );
}
