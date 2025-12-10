'use client';

import { useTranslations } from 'next-intl';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icon';
import styles from './footer.module.scss';

export function Footer() {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.links}>
            <a
              href="https://github.com/pguerrerolinares"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/paul-guerrero-linares-584759134"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>

          <p className={styles.year}>
            &copy; {currentYear} Paul Guerrero Linares
          </p>

          <button onClick={scrollToTop} className={styles.backToTop}>
            {t('backToTop')}
          </button>
        </div>
      </div>
    </footer>
  );
}
