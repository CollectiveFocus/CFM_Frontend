import styled from '@emotion/styled';
import { designColor } from 'theme';
import { Box, Typography } from '@mui/material';

const converted = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '8px',
  marginTop: '12px',
  height: '100px',
  fontSize: '12px',
  gap: '12px',
  backgroundColor: designColor.grayscale.gradient[3],
};

export default function PageFooter() {
  return (
    <footer>
      <Box sx={converted}>
        <Typography m={0}>
          &copy; 2022, Collective Focus. All rights reserved.
        </Typography>
        <Typography m={0}>
          We may use cookies for storing information to help provide you with a
          better, faster, and safer experience and for SEO purposes.{' '}
        </Typography>
      </Box>
    </footer>
  );
}
