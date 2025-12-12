'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/toast-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider />
      {children}
    </ThemeProvider>
  );
}
