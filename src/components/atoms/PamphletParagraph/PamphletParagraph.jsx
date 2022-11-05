import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { applyAlpha, designColor } from 'theme/palette';
import { typesNextImage } from 'model/view/component/prop-types';

const DividerGrey = () => (
  <Divider
    sx={{ borderColor: applyAlpha('66', designColor.neroGray), mx: { lg: 15 } }}
  />
);

export default function PamphletParagraph({
  title,
  variant,
  img,
  body,
  button,
  hasDivider = false,
  sx = {},
}) {
  return (
    <Box sx={sx}>
      {hasDivider && <DividerGrey />}

      <Typography
        variant={variant}
        textAlign="center"
        sx={sxTitleMargin[variant]}
      >
        {PrettyWrapSentence(title)}
      </Typography>

      {img && (
        <Box
          sx={{
            textAlign: 'center',
            mb: 7,
            mx: { xs: 10, lg: 15, xl: 20 },
          }}
        >
          <Image alt="" {...img} style={{ borderRadius: '5px' }} />
        </Box>
      )}

      {body &&
        body.map((val, index) => (
          <Typography
            sx={{ mb: 7, mx: { xs: 10, lg: 15, xl: 20 } }}
            variant="body1"
            key={index + '_PamphletParagraph'}
          >
            {val}
          </Typography>
        ))}

      {button && (
        <Box
          sx={{
            textAlign: 'center',
            mb: 7,
            mx: { xs: 10, lg: 15, xl: 20 },
          }}
        >
          <ButtonLink
            variant={button.variant}
            size="wide"
            to={button.to}
            aria-label={button['aria-label']}
          >
            {button.title}
          </ButtonLink>
        </Box>
      )}
    </Box>
  );
}
PamphletParagraph.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
  img: typesNextImage,
  body: PropTypes.arrayOf(PropTypes.string),
  button: PropTypes.shape(ButtonLink.propTypes),
  hasDivider: PropTypes.bool,
  sx: PropTypes.object,
};

const sxTitleMargin = {
  h1: {
    mt: 7,
    mb: 7,
  },
  h2: {
    mt: 7,
    mb: 7,
  },
};

function PrettyWrapSentence(paragraph) {
  const result = paragraph.match(/[^\.!\?]+[\.!\?]+/g);
  const sentences = result ? result : [paragraph];

  return sentences.map((sentence, index) => (
    <span
      key={index + '_PrettyWrapSentence'}
      style={{ display: 'inline-block', margin: 0, padding: 0 }}
    >
      &nbsp;{sentence.trimStart()}
    </span>
  ));
}
PrettyWrapSentence.propTypes = {
  paragraph: PropTypes.string.isRequired,
};
