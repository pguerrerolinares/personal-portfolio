'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import styles from './navbar.module.scss';

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#" className={styles.logo} aria-label="Go to homepage">
            PGL
          </a>

          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className={styles.navLink}>
                {t(item.key)}
              </a>
            ))}
          </div>

          <div className={styles.controls}>
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.mobileMenuBtn}
              aria-label="Toggle menu"
            >
              <svg
                className={styles.mobileMenuIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={styles.mobileNavLink}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
