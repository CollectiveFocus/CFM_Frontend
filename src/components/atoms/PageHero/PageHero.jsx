import PropTypes from 'prop-types';
import Image from 'next/image';
import { typesNextFillImage } from 'model/view/component/prop-types';
import { Box } from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { useTranslation } from 'next-i18next';

export default function PageHero({ img, title, link }) {
  const { t } = useTranslation('home');

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
      <Image
        priority
        layout="fill"
        objectFit="cover"
        alt=""
        {...img}
        style={{ opacity: 0.8 }}
      />
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
        {t('index.title')}
      </ButtonLink>
    </Box>
  );
}
PageHero.propTypes = {
  img: typesNextFillImage.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
