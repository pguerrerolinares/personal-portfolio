'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { h } from '@/lib/react-helpers';

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
  return h(Box, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'text.secondary',
    }
  },
    h(Box, { sx: { textAlign: 'center' }, children: [
      h(CircularProgress, { key: 'spinner', sx: { mb: 2 } }),
      h(Typography, { key: 'text', variant: "body1" }, "Loading...")
    ] })
  );
}
