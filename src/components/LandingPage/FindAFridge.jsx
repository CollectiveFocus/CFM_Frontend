import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#1543D4',
  borderColor: '#1543D4',
  minWidth: 348,
  '&:hover': {
    backgroundColor: '#1543D4',
  },
}));

const FindAFridge = ({}) => {
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
          src="/hero.webp"
          layout="fill"
          objectFit="cover"
          alt=""
        />
        <StyledButton>FIND A FRIDGE</StyledButton>
      </Box>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Take what you need. Leave what you can.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The NYC Community Fridges map can help you find community fridges
        containing free food. Click button below for the full map and list of
        fridges.
      </Typography>
    </Box>
  );
};

export default FindAFridge;
