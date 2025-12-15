import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProduction ? '/personal-portfolio' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

// IMPORTANT: The "Middleware cannot be used with output: export" warning during `next dev`
// is expected and harmless. Next-intl's plugin shows this warning because it registers
// middleware configuration, but with static export, the middleware is never actually used.
// The locale routing works through the [locale] folder structure and generateStaticParams.
// This is the correct setup for static export with next-intl.
export default withNextIntl(nextConfig);
