'use client';

import { ReactNode } from 'react';
import { MuiNextThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MuiNextThemeProvider>
      <ToastProvider />
      {children}
    </MuiNextThemeProvider>
  );
}
