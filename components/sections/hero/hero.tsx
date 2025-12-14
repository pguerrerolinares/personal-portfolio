"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Container, Typography, Stack } from "@mui/material";
import { Link } from "@/i18n/routing";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { useMagnetic } from "@/lib/hooks/use-magnetic";
import { GithubIcon, LinkedinIcon, ArrowDownIcon } from "@/components/ui/icon";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const magneticProps = useMagnetic<HTMLAnchorElement>(0.1);

  return (
    <Box
      component="section"
      id="hero"
      aria-label="Introduction"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <AnimatedBackground />

      <Container maxWidth="xl">
        <Box
          component={m.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 8, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
          }}
        >
          <Typography
            component={m.p}
            variants={item}
            variant="body1"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', md: '1rem' },
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {t("greeting")}
          </Typography>

          <Typography
            component={m.h1}
            variants={item}
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.accent.cyan} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'none',
            }}
          >
            {t("name")}
          </Typography>

          <Typography
            component={m.h2}
            variants={item}
            variant="h4"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
            }}
          >
            {t("role")}
          </Typography>

          <Typography
            component={m.p}
            variants={item}
            variant="body1"
            sx={{
              maxWidth: '42rem',
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'text.secondary',
              lineHeight: 1.8,
              px: { xs: 2, sm: 0 },
            }}
          >
            {t("description")}
          </Typography>

          <Stack
            component={m.div}
            variants={item}
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <m.div style={{ x: magneticProps.x, y: magneticProps.y }}>
              <Button
                component={Link}
                href="#projects"
                ref={magneticProps.ref as any}
                variant="primary"
                size="md"
                onMouseMove={magneticProps.onMouseMove as any}
                onMouseLeave={magneticProps.onMouseLeave as any}
              >
                {t("cta.projects")}
              </Button>
            </m.div>
            <Button
              component={Link}
              href="#contact"
              variant="outline"
              size="md"
            >
              {t("cta.contact")}
            </Button>
          </Stack>

          <Stack
            component={m.div}
            variants={item}
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Box
              component="a"
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: 'text.primary',
                transition: 'all 0.2s',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <GithubIcon size={24} />
            </Box>
            <Box
              component="a"
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: 'text.primary',
                transition: 'all 0.2s',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LinkedinIcon size={24} />
            </Box>
          </Stack>
        </Box>
      </Container>

      <Box
        component={m.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'text.secondary',
        }}
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon size={24} />
        </m.div>
      </Box>
    </Box>
  );
}
