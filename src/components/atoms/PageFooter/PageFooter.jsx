import { designColor } from 'theme/palette';
import { Box, Typography } from '@mui/material';

export default function PageFooter() {
  return (
    <footer>
      <Box
        sx={{
          height: '60px',
          fontSize: '10px',
          padding: '8px',
          backgroundColor: designColor.grayscale.gradient[3],
        }}
      >
        <Typography m={0} variant="p">
          &copy; 2022, Collective Focus. All rights reserved.{' '}
        </Typography>
        <Typography m={0} variant="p">
          We may use cookies for storing information to help provide you with a
          better, faster, and safer experience and for SEO purposes.
        </Typography>
      </Box>
    </footer>
  );
}
