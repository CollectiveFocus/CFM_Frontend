import PropTypes from 'prop-types';
import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import ButtonLink from 'components/molecules/ButtonLink';

export default function MascotCard({ variant, img, title, text, link }) {
  if (variant === 'h2') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h2"
          sx={{ display: { xs: 'block', md: 'none' }, pb: 2 }}
        >
          {title}
        </Typography>
        <Image alt="" {...img} layout="fixed" />
        <Box
          sx={{ maxWidth: '500px', ml: { xs: 0, md: 2 }, pl: { xs: 0, md: 2 } }}
        >
          <Typography
            variant="h2"
            sx={{ display: { xs: 'none', md: 'block' }, pb: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <ButtonLink
            to={link}
            variant="outlined"
            aria-label={title}
            sx={{ width: '100%', maxWidth: '345px', mt: 2 }}
          >
            LEARN MORE
          </ButtonLink>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Image alt="" {...img} layout="fixed" />
        <Typography variant="h3" py={1}>
          {title}
        </Typography>
        <Typography variant="body1">{text}</Typography>
        <ButtonLink
          to={link}
          variant="outlined"
          aria-label={title}
          sx={{ width: '100%', maxWidth: '345px', mt: 2 }}
        >
          LEARN MORE
        </ButtonLink>
      </Box>
    );
  }
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

MascotCard.propTypes = PropTypes.exact({
  variant: PropTypes.oneOf(['h2', 'h3']).isRequired,
  img: PropTypes.exact(imgShape).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}).isRequired;
