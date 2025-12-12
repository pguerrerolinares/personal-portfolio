'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    </div>
  );
}
