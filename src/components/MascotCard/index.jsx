import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { Typography, Button } from '@mui/material';

export default function MascotCard({ img, title, text, link, buttonTitle }) {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      <Image {...img} />
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1" textAlign="center">
        {text}
      </Typography>
      <Link href={link} passHref>
        <Button component="a" fullWidth={true}>
          {buttonTitle || 'LEARN MORE'}
        </Button>
      </Link>
    </Stack>
  );
}

const imgShape = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

MascotCard.propTypes = {
  img: PropTypes.shape(imgShape).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
};
