import PropTypes from 'prop-types';
import Image from 'next/image';
import { typesNextImage } from 'model/view/component/prop-types';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { useTranslation } from 'next-i18next';

export default function ParagraphCard({ variant, img, title, text, link }) {
  const { t } = useTranslation('home');

  if (variant === 'h2') {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          textAlign: { xs: 'center', md: 'left' },
          backgroundColor: 'white',
          boxShadow: 0,
        }}
      >
        <CardContent sx={{ display: { xs: 'block', md: 'none' }, p: 0 }}>
          <Typography variant="h2">{t('h2ParagraphCardHeading')}</Typography>
        </CardContent>

        <Box sx={{ width: 'clamp(300px, 100%, 400px)' }}>
          <Image alt="" {...img} layout="responsive" />
        </Box>

        <CardContent
          sx={{
            flex: { md: 1.5 },
            ml: { xs: 0, md: 6 },
            p: 0,
          }}
        >
          <Typography
            variant="h2"
            sx={{ display: { xs: 'none', md: 'block' }, pb: 1 }}
          >
            {t('h2ParagraphCardHeading')}
          </Typography>
          <Typography variant="body1">{t('h2ParagraphCardBody')}</Typography>
          <ButtonLink
            to={link}
            variant="outlined"
            size="wide"
            aria-label={title}
            sx={{ width: '100%', mt: 4 }}
          >
            {t('learn.more')}
          </ButtonLink>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          backgroundColor: 'white',
          boxShadow: 0,
        }}
      >
        <Image alt="" {...img} layout="responsive" />

        <CardContent sx={{ py: { xs: 2, md: 4 } }}>
          <Typography variant="h3" pb={1}>
            {t(title)}
          </Typography>
          <Typography variant="body1">{t(text)}</Typography>
        </CardContent>

        <CardActions>
          <ButtonLink
            to={link}
            variant="outlined"
            size="wide"
            aria-label={title}
            sx={{
              width: '100%',
              mx: 'auto',
            }}
          >
            {t('learn.more')}
          </ButtonLink>
        </CardActions>
      </Card>
    );
  }
}
ParagraphCard.propTypes = {
  variant: PropTypes.oneOf(['h2', 'h3']).isRequired,
  img: typesNextImage.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
