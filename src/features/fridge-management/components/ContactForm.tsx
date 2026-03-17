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
    <Box sx={{ width: '100%', py: { xs: 4, md: 10 }, px: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          mx: 'auto',
          maxWidth: 650,
          p: { xs: 3, sm: 5, md: 6 },
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
            Contact Us!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={4}>
              <TextField
                label="Full Name"
                variant="outlined"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Subject"
                variant="outlined"
                {...register('subject')}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={5}
                {...register('message')}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
              <Stack
                direction={{ xs: 'column-reverse', sm: 'row' }}
                justifyContent="space-between"
                spacing={4}
                pt={4}
              >
                <ButtonLink
                  aria-label="Click to return to home page"
                  variant="outlined"
                  to="/"
                  title="Cancel"
                  sx={{ flex: 1 }}
                />
                <Button
                  aria-label="Click to send an email to Fridge Finder"
                  variant="contained"
                  type="submit"
                  sx={{ flex: 1 }}
                >
                  Send Email
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
}
