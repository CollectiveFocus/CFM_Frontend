import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { applyAlpha, designColor } from 'theme/palette';
import { SoftWrap } from 'lib/format';
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

      <Typography textAlign="center" sx={sxTitleMargin} variant={variant}>
        {SoftWrap(title)}
      </Typography>

      {img && (
        <Box textAlign="center" sx={sxParagraphMargin}>
          <Image alt="" {...img} style={{ borderRadius: '5px' }} />
        </Box>
      )}

      {body &&
        body.map((val, index) => (
          <Typography
            variant="body1"
            sx={sxParagraphMargin}
            key={`${index}_PamphletParagraph`}
          >
            {val}
          </Typography>
        ))}

      {button && (
        <Box textAlign="center" sx={sxParagraphMargin}>
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

const sxParagraphMargin = {
  mb: 7,
  mx: { xs: 10, lg: 15, xl: 20 },
};
const sxTitleMargin = {
  mt: 7,
  mb: 7,
  mx: { xs: 10, lg: 15, xl: 20 },
};
