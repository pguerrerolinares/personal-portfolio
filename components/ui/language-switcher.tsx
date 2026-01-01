'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const scrollPositionRef = useRef(0);

  // Restore scroll position after navigation
  useEffect(() => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo(0, scrollPositionRef.current);
      scrollPositionRef.current = 0;
    }
  }, [pathname]);

  const switchLocale = (newLocale: string) => {
    // Save current scroll position
    scrollPositionRef.current = window.scrollY;

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    // Use replace with scroll: false to prevent auto-scrolling
    startTransition(() => {
      router.replace(newPath, { scroll: false });
    });
  };

  return (
    <Button
      data-component="LanguageSwitcher"
      onClick={() => switchLocale(locale === 'es' ? 'en' : 'es')}
      disabled={isPending}
      size="small"
      startIcon={<LanguageIcon />}
      aria-label={t('switchLanguage')}
      sx={{
        color: 'text.primary',
        textTransform: 'uppercase',
        fontWeight: 600,
        fontSize: '0.875rem',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </Button>
  );
}
