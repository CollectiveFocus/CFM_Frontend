'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Slider,
  Radio,
  Divider,
  Button,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';

import { ButtonLink } from 'components/ui';
import { reportSchema, ReportFormData } from '../schemas/fridge.schema';
import Image from 'next/image';

interface ReportFormProps {
  fridgeId: string;
  onSubmit: (data: ReportFormData) => void;
  initialValues?: Partial<ReportFormData>;
}

const sliderMarks = [
  { value: 0, label: 'Empty' },
  { value: 1, label: 'A Few Items' },
  { value: 2, label: 'Many Items' },
  { value: 3, label: 'Full' },
];

const fridgeSliderStyles = {
  mx: 'auto',
  width: 7 / 8,
  '.MuiSlider-markLabel': {
    fontSize: 12,
  },
  '.MuiSlider-markLabelActive': {
    fontSize: 12,
  },
};

export function ReportForm({
  fridgeId,
  onSubmit,
  initialValues,
}: ReportFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      condition: 'good',
      notes: '',
      foodPercentage: 0,
      ...initialValues,
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, md: 10 },
        px: { xs: 2, sm: 4 },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          maxWidth: 650,
          width: '100%',
        }}
      >
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                mb: 1,
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              COMMUNITY UPDATE
            </Typography>
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Report Status
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontWeight: 600,
              }}
            >
              {fridgeId}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack direction="column" spacing={5}>
              <FormControl component="fieldset">
                <FormLabel
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: '1.1rem',
                  }}
                >
                  Condition
                </FormLabel>
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} sx={{ gap: 1 }}>
                      <FormControlLabel
                        control={<Radio />}
                        value="good"
                        label="Fridge is in good condition"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        value="dirty"
                        label="Fridge needs cleaning"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        value="out of order"
                        label="Fridge needs repairs"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        value="not at location"
                        label="Fridge is temporarily unavailable"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        value="ghost"
                        label="Fridge is permanently unavailable"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <FormControl sx={{ pt: 2, pb: 4 }}>
                <FormLabel
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: '1.1rem',
                  }}
                >
                  How full is the fridge?
                </FormLabel>
                <Controller
                  name="foodPercentage"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      aria-label="Amount of food in the fridge"
                      min={0}
                      max={3}
                      step={1}
                      marks={sliderMarks}
                      sx={fridgeSliderStyles}
                      onChange={(_, value) => field.onChange(value)}
                    />
                  )}
                />
              </FormControl>

              <TextField
                label="Notes"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                placeholder="Got an update or request? Leave your notes here!"
                {...register('notes')}
                error={!!errors.notes}
                helperText={errors.notes?.message}
                sx={{ backgroundColor: 'background.paper' }}
              />

              <Stack
                direction={{ xs: 'column-reverse', sm: 'row' }}
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
                pt={2}
              >
                <ButtonLink
                  aria-label="Return to map page"
                  variant="outlined"
                  to="/browse"
                  title="Cancel"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: 140,
                    px: 4,
                  }}
                />
                <Button
                  aria-label="Submit status update"
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: 180,
                    px: 4,
                  }}
                >
                  Confirm Update
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
