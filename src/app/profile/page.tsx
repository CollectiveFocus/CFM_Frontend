'use client';

import Image from 'next/image';
import { Box, Button, Container, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from 'config/firebase';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const onSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Image
          src="/card/paragraph/plum.svg"
          alt="Profile"
          width={100}
          height={140}
          style={{ objectFit: 'contain' }}
        />
        <Typography variant="h5" fontWeight={700}>
          Your Profile
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={onSignOut}
          sx={{
            borderRadius: '20px',
            px: 5,
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          Sign out
        </Button>
      </Box>
    </Container>
  );
}
