import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { themeOptions } from '../theme/index';
import { ArrowBack } from '@mui/icons-material';

export default function Backtrack() {
  const router = useRouter();
  const { asPath } = useRouter();

  const prevLocation =
    asPath.includes('update') || asPath.includes('checkin') ? 'Fridge' : 'Map';

  return (
    <Box>
      <Container
        fixed
        disableGutters
        maxWidth={false}
        onClick={() => router.back()}
        sx={{
          minWidth: '100%',
          height: '54px',
          paddingLeft: '17px',
          display: 'flex',
          alignItems: 'center',
          color: themeOptions.palette.text.secondary,
          ':hover': { cursor: 'pointer' },
        }}
      >
        <ArrowBack fontSize="medium" />
        <Typography
          sx={{
            fontSize: '15px',
          }}
        >
          {`Back to ${prevLocation}`}
        </Typography>
      </Container>
    </Box>
  );
}
