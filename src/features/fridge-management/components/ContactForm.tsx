'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { ButtonLink } from 'components/ui';
import { contactSchema, ContactFormData } from '../schemas/fridge.schema';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  initialValues?: Partial<ContactFormData>;
}

export function ContactForm({
  onSubmit,
  initialValues,
}: ContactFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
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
        <Stack spacing={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.125rem' }}
            >
              Got a question or feedback? We'd love to hear from you.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack direction="column" spacing={4}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ backgroundColor: 'background.paper' }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Stack>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                {...register('subject')}
                error={!!errors.subject}
                helperText={errors.subject?.message}
                sx={{ backgroundColor: 'background.paper' }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={6}
                {...register('message')}
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={{ backgroundColor: 'background.paper' }}
              />
              <Stack
                direction={{ xs: 'column-reverse', sm: 'row' }}
                justifyContent="space-between"
                spacing={3}
                pt={2}
              >
                <ButtonLink
                  aria-label="Click to return to home page"
                  variant="outlined"
                  to="/"
                  title="Cancel"
                  sx={{ flex: { xs: 1, sm: 'none' }, minWidth: 140 }}
                />
                <Button
                  aria-label="Click to send an email to Fridge Finder"
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ flex: { xs: 1, sm: 'none' }, minWidth: 180 }}
                >
                  Send Message
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
