import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ButtonLink } from './molecules';

export default function AboutCommunityFridges({
  img,
  title,
  text,
  link,
  buttonTitle,
  type,
}) {
  return (
    <Box
      sx={{
        pt: 2,
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: type === 'about' ? 'row' : 'column',
        },
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Box
        sx={{ display: { xs: 'none', md: 'inline-block' } }}
        component="img"
        alt={img.alt}
        src={img.src}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: {
            xs: 'center',
            md: type === 'about' ? 'flex-start' : 'center',
          },
          gap: 4,
          textAlign: { xs: 'center', md: type === 'about' ? 'left' : 'center' },
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
        <Box
          component="img"
          alt={img.alt}
          src={img.src}
          sx={{
            display: { xs: 'inline-block', md: 'none' },
          }}
        ></Box>
        <Box>
          <Typography variant="body1">{text}</Typography>
        </Box>
        <Box>
          <ButtonLink
            to="/about"
            aria-label="About NYC Community Fridge"
            variant="outlined"
          >
            {buttonTitle}
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

AboutCommunityFridges.propTypes = {
  img: PropTypes.shape(imgShape).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  type: PropTypes.string,
};
