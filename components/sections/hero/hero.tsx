"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Container, Typography, Stack } from "@mui/material";
import { Link } from "@/i18n/routing";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { GradientMesh } from "@/components/ui/gradient-mesh";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, ArrowDownIcon, ArrowRightIcon } from "@/components/ui/icon";
import { LAYOUT } from "@/lib/theme/layout";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const MotionBox = motion.create(Box);

// Staggered reveal for the hero content
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
  },
};

// Name reveal with mask animation
const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const nameLineVariants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1] as const,
    },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useReducedMotion();

  // Split name for multi-line display
  const nameParts = t("name").split(" ");

  return (
    <Box
      component="section"
      id="hero"
      aria-label="Introduction"
      data-component="Hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <GradientMesh variant="hero" />

      <Container maxWidth="xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: LAYOUT.spacing.section,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' },
            gap: { xs: 4, lg: 8 },
            alignItems: 'center',
            minHeight: { xs: 'auto', lg: '80vh' },
          }}
        >
          {/* Left side - Main content */}
          <Box>
            {/* Eyebrow */}
            <MotionBox variants={itemVariants}>
              <Typography
                variant="eyebrow"
                sx={{
                  color: 'primary.main',
                  mb: 3,
                  display: 'block',
                }}
              >
                {t("greeting")}
              </Typography>
            </MotionBox>

            {/* Name - Large display typography with mask reveal */}
            <MotionBox
              variants={nameContainerVariants}
              initial="hidden"
              animate="visible"
              sx={{ mb: 4 }}
            >
              {nameParts.map((part, index) => (
                <Box key={index} sx={{ overflow: 'hidden' }}>
                  <MotionBox
                    variants={nameLineVariants}
                  >
                    <Typography
                      component={index === 0 ? "h1" : "span"}
                      variant="display1"
                      sx={{
                        display: 'block',
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? theme.gradients.heroTextDark
                            : theme.gradients.heroText,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        // Slight offset for visual interest (staggered indent)
                        ml: index === 0 ? 0 : index === 1 ? { xs: 2, md: 4 } : { xs: 4, md: 8 },
                      }}
                    >
                      {part}
                    </Typography>
                  </MotionBox>
                </Box>
              ))}
            </MotionBox>

            {/* Role */}
            <MotionBox variants={itemVariants}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  mb: 3,
                  maxWidth: '600px',
                }}
              >
                {t("role")}
              </Typography>
            </MotionBox>

            {/* Description */}
            <MotionBox variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '500px',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {t("description")}
              </Typography>
            </MotionBox>

            {/* CTAs */}
            <MotionBox variants={itemVariants}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  component={Link}
                  href="#projects"
                  variant="primary"
                  size="lg"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    gap: 1,
                    '& svg': {
                      transition: 'transform 0.2s ease',
                    },
                    '&:hover svg': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {t("cta.projects")}
                  <ArrowRightIcon size={18} />
                </Button>
                <Button
                  component={Link}
                  href="#contact"
                  variant="outline"
                  size="lg"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  {t("cta.contact")}
                </Button>
              </Stack>
            </MotionBox>

            {/* Social links */}
            <MotionBox variants={itemVariants}>
              <Stack direction="row" spacing={3}>
                <Box
                  component="a"
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  sx={{
                    color: 'text.secondary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-4px)',
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
                    color: 'text.secondary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <LinkedinIcon size={24} />
                </Box>
              </Stack>
            </MotionBox>
          </Box>
        </MotionBox>
      </Container>

      {/* Scroll indicator */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        sx={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'text.secondary',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.7rem',
          }}
        >
          {t("scroll")}
        </Typography>
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 8, 0] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon size={20} />
        </motion.div>
      </MotionBox>
    </Box>
  );
}
