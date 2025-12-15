'use client';

import { ReactNode } from 'react';
import { MuiNextThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { h, Fragment } from "@/lib/react-helpers";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return h(MuiNextThemeProvider, {
    children: [
      h(ToastProvider, { key: 'toast-provider' }),
      h(Fragment, { key: 'content' }, children)
    ]
  });
}
