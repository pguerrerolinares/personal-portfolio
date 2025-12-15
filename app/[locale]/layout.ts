import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/index';
import { LazyMotionProvider } from '@/components/providers/lazy-motion-provider';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { PageTransition } from '@/components/ui/page-transition';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { h } from '@/lib/react-helpers';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return h(NextIntlClientProvider, {
    messages,
    children: h(Providers, {
      children: h(LazyMotionProvider, {
        children: [
          h(ScrollProgress, { key: 'scroll-progress' }),
          h(Navbar, { key: 'navbar' }),
          h(PageTransition, { key: 'page-transition' },
            h(Box, { sx: { minHeight: '100vh', pt: '4rem' } }, children)
          ),
          h(Footer, { key: 'footer' })
        ]
      })
    })
  });
}
