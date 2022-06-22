import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from 'theme';

const GoToButton = styled(Button)(({ theme }) => ({
  color: 'white',
  borderRadius: 45,
  fontWeight: 700,
  backgroundColor: '#1543D4',
  borderColor: '#1543D4',
  border: '2px solid #1543D4',
  minWidth: 345,
  '&:hover': {
    backgroundColor: '#1543D4',
  },
}));

const EditButton = styled(GoToButton)(({ theme }) => ({
  color: '#222222',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
}));

const displayButton = {
  StatusUpdate: <GoToButton sx={{ mb: 2 }}>GO TO FRIDGE</GoToButton>,
  Create: (
    <>
      <GoToButton sx={{ mb: 2 }}>GO TO FRIDGE</GoToButton>
      <EditButton sx={{ mb: 2 }}>EDIT FRIDGE</EditButton>
    </>
  ),
};

const displayText = {
  StatusUpdate: 'You have successfully updated a community fridge listing.',
  Create: 'You have successfully added a community fridge listing.',
};

export default function SuccessMessage({ type }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography textAlign="center" variant="h2">
          Success!
        </Typography>
        <Typography textAlign="center" variant="body1" sx={{ mb: 4 }}>
          {displayText[type]}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Image
            width={163}
            height={244}
            src="/mascot/happyFridge.svg"
            alt="Happy fridge image"
          />
        </Box>
      </Box>

      {displayButton[type]}
    </Box>
  );
}

SuccessMessage.propTypes = {
  type: PropTypes.oneOf(['StatusUpdate', 'Create']),
};
