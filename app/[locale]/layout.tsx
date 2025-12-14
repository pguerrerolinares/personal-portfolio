import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers';
import { LazyMotionProvider } from '@/components/providers/lazy-motion-provider';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { PageTransition } from '@/components/ui/page-transition';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

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

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <LazyMotionProvider>
          <ScrollProgress />
          <Navbar />
          <PageTransition>
            <Box sx={{ minHeight: '100vh', pt: '4rem' }}>{children}</Box>
          </PageTransition>
          <Footer />
        </LazyMotionProvider>
      </Providers>
    </NextIntlClientProvider>
  );
}
