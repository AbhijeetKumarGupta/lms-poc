'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <Typography variant="h1" color="error" sx={{ fontWeight: 700, fontSize: '5rem' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </Typography>

      <Button variant="contained" color="primary" onClick={() => router.push('/')}>
        Go Home
      </Button>
    </Box>
  );
}
