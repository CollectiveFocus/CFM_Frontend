import PropTypes from 'prop-types';
import Image from 'next/image';
import { typesNextFillImage } from 'model/view/component/prop-types';
import { Box } from '@mui/material';
import { ButtonLink } from 'components/atoms';

export default function PageHero({ img, title, link }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '73vh',
        width: '100%',
        position: 'relative',
      }}
    >
      <Image priority layout="fill" objectFit="cover" alt="" {...img} />
      <ButtonLink
        to={link}
        variant="contained"
        aria-label={title}
        sx={{
          minWidth: { xs: '90vw', md: '75vw', lg: '500px' },
          fontVariant: 'small-caps',
          fontColor: 'white',
          boxShadow: 8,
        }}
      >
        {title}
      </ButtonLink>
    </Box>
  );
}
PageHero.propTypes = PropTypes.exact({
  img: typesNextFillImage.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}).isRequired;
