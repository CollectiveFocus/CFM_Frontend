import PropTypes from 'prop-types';
import { Box, Divider, Typography } from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { applyAlpha, designColor } from 'theme/palette';

const DividerGrey = () => (
  <Divider sx={{ borderColor: applyAlpha('40', designColor.neroGray) }} />
);

export default function PamphletParagraph({
  title,
  variant,
  body,
  button,
  hasDividerBottom,
}) {
  return (
    <>
      <Typography sx={{ my: 7 }} variant={variant} textAlign="center">
        {title}
      </Typography>

      {body &&
        body.map((val, index) => (
          <Typography sx={{ mb: 7 }} variant="body1" key={'ppBody' + index}>
            {val}
          </Typography>
        ))}

      {button && (
        <Box textAlign="center" mb={7}>
          <ButtonLink
            variant="contained"
            sx={{ minWidth: 345 }}
            to={button.to}
            aria-label={button[['aria-label']]}
          >
            {button.title}
          </ButtonLink>
        </Box>
      )}

      {hasDividerBottom && <DividerGrey />}
    </>
  );
}
PamphletParagraph.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
  body: PropTypes.arrayOf(PropTypes.string),
  button: PropTypes.shape(ButtonLink.propTypes),
  hasDividerBottom: PropTypes.bool,
};
