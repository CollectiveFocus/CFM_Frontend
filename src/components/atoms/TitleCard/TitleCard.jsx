import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from '@mui/material';
import { NextLink } from 'components/atoms';

export default function TitleCard({ img, title, link }) {
  return (
    <Card
      sx={{
        width: { xs: '9em', sm: '10em' },
        height: '10em',
        backgroundColor: 'secondary.main',
      }}
    >
      <CardActionArea
        component={NextLink}
        to={link}
        aria-label={title}
        sx={{
          width: 'inherit',
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          image={img.src}
          alt={img.alt}
          sx={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h5" textAlign="center" pt={2}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

TitleCard.propTypes = {
  img: PropTypes.shape(imgShape).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
