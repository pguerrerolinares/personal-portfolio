"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Container, Typography, Stack } from "@mui/material";
import { Link } from "@/i18n/routing";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, ArrowDownIcon } from "@/components/ui/icon";
import { LAYOUT } from "@/lib/theme/layout";
import { h } from "@/lib/react-helpers";

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

  return h(Box, {
    component: "section",
    id: "hero",
    'aria-label': "Introduction",
    'data-component': "Hero",
    sx: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    },
    children: [
      h(AnimatedBackground, { key: 'animated-background' }),

      h(Container, {
        key: 'container',
        maxWidth: "xl",
        children:
        h(Box, {
          component: motion.div,
          variants: container,
          initial: "hidden",
          animate: "show",
          sx: {
            position: 'relative',
            zIndex: 1,
            py: LAYOUT.spacing.section,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: LAYOUT.spacing.grid,
          },
          children: [
            h(Typography, {
              key: 'greeting',
              component: motion.p,
              variants: item,
              variant: "body1",
              sx: {
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', md: '1rem' },
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }
            }, t("greeting")),

            h(Typography, {
              key: 'name',
              component: motion.h1,
              variants: item,
              variant: "h1",
              sx: {
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                background: (theme: any) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.accent.cyan} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'none',
              }
            }, t("name")),

            h(Typography, {
              key: 'role',
              component: motion.h2,
              variants: item,
              variant: "h4",
              sx: {
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
              }
            }, t("role")),

            h(Typography, {
              key: 'description',
              component: motion.p,
              variants: item,
              variant: "body1",
              sx: {
                maxWidth: '42rem',
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: 'text.secondary',
                lineHeight: 1.8,
                px: { xs: 2, sm: 0 },
              }
            }, t("description")),

            h(Stack, {
              key: 'cta-buttons',
              component: motion.div,
              variants: item,
              direction: "row",
              spacing: 2,
              sx: { mt: 2 },
              children: [
                h(Button, {
                  key: 'projects-button',
                  component: Link,
                  href: "#projects",
                  variant: "primary",
                  size: "md"
                }, t("cta.projects")),
                h(Button, {
                  key: 'contact-button',
                  component: Link,
                  href: "#contact",
                  variant: "outline",
                  size: "md"
                }, t("cta.contact"))
              ]
            }),

            h(Stack, {
              key: 'social-links',
              component: motion.div,
              variants: item,
              direction: "row",
              spacing: 2,
              sx: { mt: 2 },
              children: [
                h(Box, {
                  key: 'github',
                  component: "a",
                  href: personalInfo.social.github,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  'aria-label': "GitHub",
                  sx: {
                    color: 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }
                }, h(GithubIcon, { size: 24 })),
                h(Box, {
                  key: 'linkedin',
                  component: "a",
                  href: personalInfo.social.linkedin,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  'aria-label': "LinkedIn",
                  sx: {
                    color: 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }
                }, h(LinkedinIcon, { size: 24 }))
              ]
            })
          ]
        })
      }),

      h(Box, {
        key: 'scroll-indicator',
        component: motion.div,
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1.5, duration: 0.5 },
        sx: {
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'text.secondary',
        }
      }, h(motion.div, {
        animate: { y: [0, 8, 0] },
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }, h(ArrowDownIcon, { size: 24 })))
    ]
  });
}
