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
  Paper,
} from '@mui/material';
import { ButtonLink } from 'components/atoms';
import { reportSchema, ReportFormData } from '../schemas/fridge.schema';

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
    <Box sx={{ width: '100%', py: { xs: 4, md: 10 }, px: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          mx: 'auto',
          maxWidth: 650,
          p: { xs: 3, sm: 5, md: 6 },
        }}
      >
        <Stack direction="column" spacing={1}>
          <Typography variant="h1" textAlign="center">
            Fridge Status Report
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            color="textSecondary"
            mb={2}
          >
            {fridgeId}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider orientation="horizontal" flexItem />
            <Stack direction="column" spacing={4} mt={4}>
              <FormControl component="fieldset">
                <FormLabel
                  sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
                >
                  Select if applicable:
                </FormLabel>
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        control={<Radio />}
                        value="good"
                        label="Fridge is in good condition"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        value="out of order"
                        label="Fridge needs repairs"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        value="dirty"
                        label="Fridge needs cleaning"
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
              <FormControl>
                <FormLabel
                  sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
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
                placeholder="Got an update or request? Leave your notes here!"
                {...register('notes')}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
              <Stack
                direction={{ xs: 'column-reverse', sm: 'row' }}
                justifyContent="space-between"
                spacing={4}
                pt={4}
              >
                <ButtonLink
                  aria-label="Return to map page"
                  variant="outlined"
                  to="/browse"
                  title="Cancel"
                  sx={{ flex: 1 }}
                />
                <Button
                  aria-label="Submit status update"
                  variant="contained"
                  type="submit"
                  sx={{ flex: 1 }}
                >
                  Confirm
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
}
