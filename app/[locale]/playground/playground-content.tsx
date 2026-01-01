'use client';

import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionTitle, SectionSubtitle } from '@/components/ui/section-title';
import { FadeIn } from '@/components/ui';

// Seeded random number generator for consistent data between server/client
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate OHLC data with deterministic values (no Date.now() or Math.random())
function generateOHLCData(days = 90) {
  const data = [];
  let price = 150;
  // Fixed base timestamp: Jan 1, 2024
  const baseTime = 1704067200000;
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = days; i >= 0; i--) {
    const time = baseTime + (days - i) * dayMs;
    const seed = i + 1;
    const volatility = 0.02;
    const change = price * volatility * (seededRandom(seed) - 0.5) * 2;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.abs(change) * seededRandom(seed + 1000);
    const low = Math.min(open, close) - Math.abs(change) * seededRandom(seed + 2000);
    const volume = Math.floor(1000000 + seededRandom(seed + 3000) * 5000000);

    data.push({ time, open, high, low, close, volume });
    price = close;
  }
  return data;
}

// Generate once at module load - won't change on re-renders or language switch
const OHLC_SAMPLE_DATA = generateOHLCData(90);

const STOCK_CHART_CONFIG = JSON.stringify({
  symbol: 'DEMO',
  currency: '$',
  showVolume: true,
  realtime: true,
  realtimeInterval: 2000,
});

const EVOLUTION_CONFIG = JSON.stringify({
  symbol: 'S&P 500',
  currency: '$',
  showVolume: false,
  showEvents: true,
});

export function PlaygroundContent() {
  const t = useTranslations('playground');
  const stockChartRef = useRef<HTMLElement>(null);
  const stockEvolutionRef = useRef<HTMLElement>(null);

  // Dynamic import of web components and set data via property (not attribute)
  useEffect(() => {
    import('@pguerrerolinares/viz-components').then((module) => {
      // Set data as JS array via property, not string attribute
      if (stockChartRef.current) {
        (stockChartRef.current as unknown as { data: typeof OHLC_SAMPLE_DATA }).data = OHLC_SAMPLE_DATA;
      }
      // Set stock evolution data
      if (stockEvolutionRef.current) {
        const prices = module.generateHistoricalPrices();
        const events = module.getMarketEvents();
        (stockEvolutionRef.current as unknown as { prices: typeof prices; events: typeof events }).prices = prices;
        (stockEvolutionRef.current as unknown as { prices: typeof prices; events: typeof events }).events = events;
      }
    });
  }, []);

  return (
    <main id="main-content">
      {/* Header Section */}
      <SectionContainer id="playground" data-component="Playground">
        <SectionTitle
          id="playground-heading"
          subtitle={t('subtitle')}
          centered
          sx={{
            '& h2': {
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            },
            '& .MuiTypography-subtitle1': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            },
          }}
        >
          {t('title')}
        </SectionTitle>

        <FadeIn direction="up" delay={0.1}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              maxWidth: { xs: '100%', sm: 600, md: 700 },
              mx: 'auto',
              mb: { xs: 4, md: 6 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            {t('description')}
          </Typography>
        </FadeIn>
      </SectionContainer>

      {/* Stock Chart Section */}
      <SectionContainer bgcolor="paper" spacing="md">
        <FadeIn direction="up">
          <SectionSubtitle sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' } }}>
            {t('stockChart.title')}
          </SectionSubtitle>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            }}
          >
            {t('stockChart.description')}
          </Typography>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <Box
            sx={{
              width: '100%',
              height: 500,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* @ts-expect-error - Web Component */}
            <viz-stock-chart
              ref={stockChartRef}
              config={STOCK_CHART_CONFIG}
              theme="auto"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </Box>
        </FadeIn>
      </SectionContainer>

      {/* Stock Evolution Section */}
      <SectionContainer spacing="md">
        <FadeIn direction="up">
          <SectionSubtitle sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' } }}>
            {t('stockEvolution.title')}
          </SectionSubtitle>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            }}
          >
            {t('stockEvolution.description')}
          </Typography>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <Box
            sx={{
              width: '100%',
              height: 600,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* @ts-expect-error - Web Component */}
            <viz-stock-evolution
              ref={stockEvolutionRef}
              config={EVOLUTION_CONFIG}
              theme="auto"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </Box>
        </FadeIn>
      </SectionContainer>
    </main>
  );
}
