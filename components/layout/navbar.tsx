'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
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

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

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
        Skip to main content
      </Box>

      <AppBar
        data-component="Navbar"
        position="sticky"
        elevation={trigger ? 2 : 0}
        sx={{
          bgcolor: trigger ? 'background.default' : 'transparent',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          transition: 'all 0.3s',
          borderBottom: trigger ? 1 : 0,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
            }}
          >
            {/* Logo */}
            <Box
              component="a"
              href="#"
              aria-label="Go to homepage"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              PGL
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.key}
                  component="a"
                  href={item.href}
                  sx={{
                    px: 2,
                    py: 1,
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      color: 'primary.main',
                    },
                  }}
                >
                  {t(item.key)}
                </Box>
              ))}
            </Box>

            {/* Controls */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <ThemeToggle />
              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <IconButton
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.primary',
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
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={() => setIsOpen(false)}
                sx={{
                  py: 2,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={t(item.key)}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
