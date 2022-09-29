import PropTypes from 'prop-types';

import { Link, Stack, Typography } from '@mui/material';
import {
  ArrowBackRounded as BackIcon,
  EditOutlined as EditIcon,
} from '@mui/icons-material';

export default function BackEdit({ fridgeId }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Link
        href="/browse"
        underline="none"
        aria-label="Click to return to the map"
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{ color: 'text.secondary' }}
        >
          <BackIcon fontSize="medium" />
          <Typography fontSize="medium">Browse</Typography>
        </Stack>
      </Link>
      <Link
        href={`/fridge/${fridgeId}/edit`}
        underline="none"
        aria-label="Click to edit the fridge"
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{ color: 'text.secondary' }}
        >
          <EditIcon fontSize="medium" />
          <Typography fontSize="medium">Edit Fridge</Typography>
        </Stack>
      </Link>
    </Stack>
  );
}
BackEdit.propTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
}).isRequired;
