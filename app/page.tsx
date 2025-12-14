'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0]; // e.g., "es-ES" -> "es"

    // Check if it's a supported locale, otherwise use default
    const locale = ['es', 'en'].includes(browserLang) ? browserLang : 'es';

    // Redirect to the detected language
    router.replace(`/${locale}`);
  }, [router]);

  // Show a minimal loading state while redirecting
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'text.secondary',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body1">Loading...</Typography>
      </Box>
    </Box>
  );
}
