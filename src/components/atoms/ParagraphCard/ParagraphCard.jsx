import PropTypes from 'prop-types';
import Image from 'next/image';
import { typesNextImage } from 'schema/component/prop-types';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { ButtonLink } from 'components/molecules';

export default function ParagraphCard({ variant, img, title, text, link }) {
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
          <Typography variant="h2">{title}</Typography>
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
            {title}
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <ButtonLink
            to={link}
            variant="outlined"
            aria-label={title}
            sx={{ width: '100%', maxWidth: '345px', mt: 4 }}
          >
            LEARN MORE
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
            {title}
          </Typography>
          <Typography variant="body1">{text}</Typography>
        </CardContent>

        <CardActions>
          <ButtonLink
            to={link}
            variant="outlined"
            aria-label={title}
            sx={{
              width: '100%',
              maxWidth: '345px',
              mx: 'auto',
            }}
          >
            LEARN MORE
          </ButtonLink>
        </CardActions>
      </Card>
    );
  }
}
// img: typesImage.isRequired,
ParagraphCard.propTypes = PropTypes.exact({
  variant: PropTypes.oneOf(['h2', 'h3']).isRequired,
  img: typesNextImage.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}).isRequired;
