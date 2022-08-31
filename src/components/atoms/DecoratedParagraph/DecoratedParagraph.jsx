import PropTypes from 'prop-types';
import Image from 'next/image';
import { Typography, Box, Divider } from '@mui/material';
import { designColor } from 'theme/palette';

export default function DecoratedParagraph({
  variant,
  img,
  title,
  body,
  hasDivider = false,
}) {
  const headingStyles = {
    h1: {
      mt: 12,
      mb: 2,
    },
    h2: {
      mt: 10,
      mb: 2,
    },
  };

  const grey = designColor.grayscale.gradient[6];

  return (
    <>
      {hasDivider && <Divider sx={{ mt: 10, borderColor: grey }} />}

      <Typography variant={variant} sx={{ ...headingStyles[variant] }}>
        {title}
      </Typography>

      {img && (
        <Box
          sx={{
            textAlign: 'center',
            mt: 5,
            mb: 7,
          }}
        >
          <Image alt="" {...img} style={{ borderRadius: '5px' }} />
        </Box>
      )}

      <Typography variant="body1" sx={{ mt: 2 }}>
        {body}
      </Typography>
    </>
  );
}
const imgShape = PropTypes.exact({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

DecoratedParagraph.propTypes = PropTypes.exact({
  variant: PropTypes.oneOf(['h1', 'h2']).isRequired,
  img: imgShape,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  hasDivider: PropTypes.bool,
}).isRequired;
