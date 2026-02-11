import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';
import { ButtonLink, SoftWrap } from 'components/atoms';
import { applyAlpha, designColor } from 'theme/palette';

const DividerGrey = () => (
  <Divider sx={{ borderColor: applyAlpha('66', designColor.neroGray) }} />
);

function ResponsiveImage({ src, alt = '', attribution = null }) {
  if (!src) {
    return null;
  }
  return (
    <Box sx={{ mt: 7, mb: 7 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 2',
          height: { xs: 200, sm: 400, lg: 500 },
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          sizes="100vw"
        />
      </Box>
      {attribution && (
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            textAlign: 'right',
            color: 'text.secondary',
            mt: 1,
            fontSize: '1rem !important',
          }}
        >
          {'Photo: ' + attribution}
        </Typography>
      )}
    </Box>
  );
}
const typesResponsiveImage = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  attribution: PropTypes.string,
};
ResponsiveImage.propTypes = typesResponsiveImage;

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
    <Box sx={{ ...sxParagraphMargin, ...sx }}>
      {hasDivider && <DividerGrey />}

      {img && ResponsiveImage(img)}

      <Typography sx={{ mt: 7, mb: 7 }} variant={variant}>
        <SoftWrap text={title} />
      </Typography>

      {body &&
        body.map((val, index) => (
          <Typography variant="body1" key={`${index}_PamphletParagraph`}>
            {val}
          </Typography>
        ))}

      {button && (
        <Box textAlign="center" sx={{ mt: 7 }}>
          <ButtonLink
            variant={button.variant}
            size="wide"
            to={button.to}
            aria-label={button['aria-label']}
            title={button.title}
          />
        </Box>
      )}
    </Box>
  );
}
PamphletParagraph.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
  img: PropTypes.exact(typesResponsiveImage),
  body: PropTypes.arrayOf(PropTypes.string),
  button: PropTypes.shape(ButtonLink.propTypes),
  hasDivider: PropTypes.bool,
  sx: PropTypes.object,
};

const sxParagraphMargin = {
  mb: 7,
  mx: { xs: 10, lg: 15, xl: 20 },
};
