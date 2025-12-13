import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LazyMotionProvider } from '@/components/providers/lazy-motion-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = 'https://paulgl.dev';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Paul Guerrero Linares - Software Engineer',
    template: '%s | Paul Guerrero Linares',
  },
  description:
    'Software Engineer specializing in full-stack development, AI/ML pipelines, and cloud-native architectures. Expert in Angular, React, Java, Python, and modern DevOps practices.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'AI/ML',
    'Angular',
    'React',
    'Java',
    'Python',
    'TypeScript',
    'Cloud Native',
    'DevOps',
    'OCR',
    'Computer Vision',
  ],
  authors: [{ name: 'Paul Guerrero Linares' }],
  creator: 'Paul Guerrero Linares',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    url: baseUrl,
    siteName: 'Paul Guerrero Linares',
    title: 'Paul Guerrero Linares - Software Engineer',
    description:
      'Software Engineer specializing in full-stack development, AI/ML pipelines, and cloud-native architectures.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paul Guerrero Linares - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Guerrero Linares - Software Engineer',
    description:
      'Software Engineer specializing in full-stack development, AI/ML pipelines, and cloud-native architectures.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LazyMotionProvider>{children}</LazyMotionProvider>
      </body>
    </html>
  );
}
