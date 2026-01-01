'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Box, Container, IconButton, Typography, Button, Stack } from '@mui/material';
import { GithubIcon, LinkedinIcon, MailIcon } from '@/components/ui/icon';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { personalInfo } from '@/lib/constants/portfolio-data';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { LAYOUT } from '@/lib/theme/layout';

const MotionBox = motion.create(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
  },
};

export function Footer() {
  const t = useTranslations('common');
  const tFooter = useTranslations('footer');

  const socialLinks = [
    {
      icon: GithubIcon,
      href: personalInfo.social.github,
      label: t('github'),
      hoverColor: '#6e7681',
    },
    {
      icon: LinkedinIcon,
      href: personalInfo.social.linkedin,
      label: t('linkedin'),
      hoverColor: '#0077B5',
    },
    {
      icon: MailIcon,
      href: `mailto:${personalInfo.email}`,
      label: t('email'),
      hoverColor: '#0071e3',
    },
  ];
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <Box
      component="footer"
      data-component="Footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
      }}
    >
      {/* Decorative gradient line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, transparent 0%, rgba(10, 132, 255, 0.5) 50%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(0, 113, 227, 0.3) 50%, transparent 100%)',
        }}
      />

      <Container maxWidth="xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Main footer content */}
          <MotionBox
            variants={itemVariants}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'space-between',
              gap: 4,
              mb: 6,
            }}
          >
            {/* Brand and tagline */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'inline-block',
                  }}
                />
                Paul Guerrero Linares
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                {tFooter('tagline')}
              </Typography>
            </Box>

            {/* Social links */}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <MotionBox
                    key={social.label}
                    variants={itemVariants}
                    whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  >
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        width: 44,
                        height: 44,
                        color: 'text.secondary',
                        bgcolor: 'action.hover',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'white',
                          bgcolor: social.hoverColor,
                        },
                      }}
                    >
                      <Icon size={20} />
                    </IconButton>
                  </MotionBox>
                );
              })}
            </Stack>
          </MotionBox>

          {/* Bottom bar */}
          <MotionBox
            variants={itemVariants}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              pt: 4,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            {/* Copyright */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box component="span">&copy;</Box>
              <Box component="span">{currentYear}</Box>
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Paul Guerrero Linares
              </Box>
            </Typography>

            {/* Tech stack hint */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1,
                fontFamily: 'var(--font-geist-mono, monospace)',
              }}
            >
              Built with Next.js, TypeScript & MUI
            </Typography>

            {/* Back to Top Button */}
            <Box>
              <Button
                onClick={scrollToTop}
                endIcon={<KeyboardArrowUpIcon />}
                size="small"
                sx={{
                  color: 'text.secondary',
                  px: 2,
                  borderRadius: LAYOUT.borderRadius.pill,
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {t('backToTop')}
              </Button>
            </Box>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
