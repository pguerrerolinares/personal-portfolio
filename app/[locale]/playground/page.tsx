import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { PlaygroundContent } from './playground-content';

type Props = {
  params: Promise<{ locale: string }>;
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PlaygroundPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PlaygroundContent />;
}
