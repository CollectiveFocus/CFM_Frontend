import PropTypes from 'prop-types';
import Image from 'next/legacy/image';
import { typesNextFillImage } from 'model/view/component/prop-types';
import { Box } from '@mui/material';
import { ButtonLink } from 'components/atoms';

export default function PageHero({ img, button }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        width: '100%',
        position: 'relative',
      }}
    >
      <Image priority layout="fill" objectFit="cover" alt="" {...img} />
      {button && (
        <ButtonLink
          variant="contained"
          to={button.to}
          aria-label={button['aria-label']}
          sx={{
            minWidth: { xs: '90vw', md: '75vw', lg: '500px' },
            fontVariant: 'small-caps',
            fontColor: 'white',
            boxShadow: 8,
          }}
        >
          {button.title}
        </ButtonLink>
      )}
    </Box>
  );
}
PageHero.propTypes = {
  img: typesNextFillImage.isRequired,
  button: PropTypes.shape(ButtonLink.propTypes),
};
