import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';

const data = {
  img: {
    src: '/img/hero.webp',
    alt: 'Community fridges in New York',
  },
  title: 'Take what you need. Leave what you can.',
  text: 'The NYC Community Fridges map can help you find community fridges containing free food. Click button below for the full map and list of fridges.',
  buttonTitle: 'FIND A FRIDGE',
};

export default function PageHero() {
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
          src={data.img.src}
          layout="fill"
          objectFit="cover"
          alt={data.img.alt}
        />
        <Button variant="contained" sx={{ minWidth: '75%' }}>
          {data.buttonTitle}
        </Button>
      </Box>
      <Typography variant="h2" sx={{ mb: 2, px: 2 }}>
        {data.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, px: 4 }}>
        {data.text}
      </Typography>
    </Box>
  );
}
