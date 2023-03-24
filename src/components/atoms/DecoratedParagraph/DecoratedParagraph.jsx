import PropTypes from 'prop-types';
import Image from 'next/image';
import { typesNextImage } from 'model/view/component/prop-types';
import { Typography, Box, Divider } from '@mui/material';
import { applyAlpha, designColor } from 'theme/palette';
import { useTranslation } from 'next-i18next';

export default function DecoratedParagraph({
  variant,
  img,
  title,
  body,
  hasDivider = false,
  sx = {},
}) {
  const { t } = useTranslation('home');
  const grey = applyAlpha('66', designColor.neroGray);

  return (
    <Box sx={sx}>
      {hasDivider && <Divider sx={{ mt: 10, borderColor: grey }} />}

      <Typography
        variant={variant}
        sx={{ ...headingStyles[variant], textAlign: 'center' }}
      >
        {renderTitleSentences(t(title), variant)}
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
        {t(body)}
      </Typography>
    </Box>
  );
}
DecoratedParagraph.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2']).isRequired,
  img: typesNextImage,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  hasDivider: PropTypes.bool,
  sx: PropTypes.object,
};

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

const renderTitleSentences = (title, variant) => {
  const result = title.match(/[^\.!\?]+[\.!\?]+/g);
  const output = result ? result : [title];

  return output.map((sentence, index) => (
    <Typography
      key={index}
      variant={variant}
      component="span"
      sx={{ display: 'inline-block', my: 0, py: 0 }}
    >
      &nbsp;{sentence.trimStart()}
    </Typography>
  ));
};
