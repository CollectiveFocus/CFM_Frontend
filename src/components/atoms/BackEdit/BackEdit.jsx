import { Stack, Typography } from '@mui/material';
import {
  ArrowBackRounded as BackIcon,
  EditOutlined as EditIcon,
} from '@mui/icons-material';
export default function BackEdit() {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{ color: 'text.secondary' }}
      >
        <BackIcon fontSize="medium" />
        <Typography fontSize="medium">Back to Map</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{ color: 'text.secondary' }}
      >
        <EditIcon fontSize="medium" />
        <Typography fontSize="medium">Edit Fridge</Typography>
      </Stack>
    </Stack>
  );
}
