import PropTypes from 'prop-types';
import Image from 'next/image';
import { typesNextImage } from 'model/view/component/prop-types';
import { Typography, Box, Divider } from '@mui/material';
import { applyAlpha, designColor } from 'theme/palette';

export default function DecoratedParagraph({
  variant,
  img,
  title,
  body,
  hasDivider = false,
  sx = {},
}) {
  const grey = applyAlpha('66', designColor.neroGray);

  return (
    <Box sx={sx}>
      {hasDivider && <Divider sx={{ mt: 10, borderColor: grey }} />}

      <Typography
        variant={variant}
        sx={{ ...headingStyles[variant], textAlign: 'center' }}
      >
        {renderTitleSentences(title, variant)}
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
    </Box>
  );
}
DecoratedParagraph.propTypes = PropTypes.exact({
  variant: PropTypes.oneOf(['h1', 'h2']).isRequired,
  img: typesNextImage,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  hasDivider: PropTypes.bool,
  sx: PropTypes.object,
}).isRequired;

const headingStyles = {
  h1: {
    mt: 7,
    mb: 7,
  },
  h2: {
    mt: 5,
    mb: 3,
  },
};

const renderTitleSentences = (title, variant) =>
  title
    .split('.')
    .filter((s) => s.length > 0)
    .map((sentence, index) => (
      <Typography
        key={index}
        variant={variant}
        component="span"
        sx={{ display: 'inline-block' }}
      >
        &nbsp;{sentence.trimStart()}.
      </Typography>
    ));
