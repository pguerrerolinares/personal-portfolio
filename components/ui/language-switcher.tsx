'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useEffect, useRef } from 'react';
import styles from './language-switcher.module.scss';

export function LanguageSwitcher() {
  const locale = useLocale();
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
    <button
      onClick={() => switchLocale(locale === 'es' ? 'en' : 'es')}
      disabled={isPending}
      className={styles.button}
      aria-label="Switch language"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
