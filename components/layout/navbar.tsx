'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Link } from '@/i18n/routing';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

const MotionBox = motion.create(Box);

const navItems = [
  { key: 'about', href: '/#about', section: 'about' },
  { key: 'projects', href: '/#projects', section: 'projects' },
  { key: 'experience', href: '/#experience', section: 'experience' },
  { key: 'contact', href: '/#contact', section: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section === 'hero' ? null : section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          '&:focus': {
            left: '50%',
            top: 8,
            transform: 'translateX(-50%)',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 2,
            borderRadius: 1,
          },
        }}
      >
        {tCommon('skipToMainContent')}
      </Box>

      <AppBar
        data-component="Navbar"
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: trigger ? 'rgba(var(--background-rgb), 0.8)' : 'transparent',
          backdropFilter: trigger ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: trigger ? 'blur(20px) saturate(180%)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
          borderBottom: trigger ? 1 : 0,
          borderColor: 'divider',
          '--background-rgb': (theme) =>
            theme.palette.mode === 'dark' ? '0, 0, 0' : '255, 255, 255',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: trigger ? 64 : 80 },
              transition: 'min-height 0.3s ease',
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              aria-label={tCommon('goToHomepage')}
              sx={{
                fontSize: trigger ? '1.25rem' : '1.5rem',
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  opacity: 0.8,
                },
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
              PGL
            </Box>

            {/* Desktop Navigation */}
            <Box
              component="nav"
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
                bgcolor: trigger ? 'rgba(var(--background-rgb), 0.6)' : 'transparent',
                px: trigger ? 1 : 0,
                py: 0.5,
                borderRadius: '24px',
                transition: 'all 0.3s ease',
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.key}
                  component={Link}
                  href={item.href}
                  sx={{
                    position: 'relative',
                    px: 2,
                    py: 1,
                    color: activeSection === item.section ? 'primary.main' : 'text.primary',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    borderRadius: '12px',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {t(item.key)}
                  {/* Active indicator */}
                  <AnimatePresence>
                    {activeSection === item.section && (
                      <MotionBox
                        layoutId="activeSection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Box>
              ))}
              <Box
                component={Link}
                href="/playground"
                sx={{
                  px: 2,
                  py: 1,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  borderRadius: '12px',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                {t('playground')}
              </Box>
            </Box>

            {/* Controls */}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <ThemeToggle />
              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <IconButton
                onClick={() => setIsOpen(!isOpen)}
                aria-label={tCommon('toggleMenu')}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.primary',
                  ml: 1,
                }}
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ fontWeight: 700, color: 'primary.main' }}>{tCommon('menu')}</Box>
          <IconButton onClick={() => setIsOpen(false)} aria-label={tCommon('closeMenu')}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pt: 2 }}>
          {navItems.map((item, index) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setIsOpen(false)}
                sx={{
                  py: 2,
                  px: 3,
                  borderLeft: 3,
                  borderColor: activeSection === item.section ? 'primary.main' : 'transparent',
                  bgcolor: activeSection === item.section ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    mr: 2,
                    fontFamily: 'var(--font-geist-mono, monospace)',
                  }}
                >
                  0{index + 1}
                </Box>
                <ListItemText
                  primary={t(item.key)}
                  primaryTypographyProps={{
                    fontWeight: activeSection === item.section ? 600 : 500,
                    color: activeSection === item.section ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <ListItemButton
              component={Link}
              href="/playground"
              onClick={() => setIsOpen(false)}
              sx={{
                py: 2,
                px: 3,
                mx: 2,
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                justifyContent: 'center',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={t('playground')}
                primaryTypographyProps={{
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
