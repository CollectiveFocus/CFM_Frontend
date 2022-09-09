import { designColor } from 'theme/palette';
import { Box, Typography } from '@mui/material';

export default function PageFooter() {
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        backgroundColor: designColor.grayscale.gradient[3],
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        rowGap: '0.2em',
      }}
    >
      <Typography variant="footer">
        &copy; 2022, Collective Focus. All rights reserved.&nbsp;
      </Typography>
      <Typography variant="footer">
        We may use cookies for storing information to help provide you with a
        better, faster, and safer experience and for SEO purposes.
      </Typography>
    </Box>
  );
}
