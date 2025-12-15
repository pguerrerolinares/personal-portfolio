"use client";

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';
import { h } from "@/lib/react-helpers";

export function ToastProvider() {
  const { theme } = useTheme();

  return h(Toaster, {
    position: "bottom-right",
    theme: theme as 'light' | 'dark' | 'system',
    richColors: true,
    closeButton: true
  });
}
