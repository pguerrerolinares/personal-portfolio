'use client';

import { useTranslations } from 'next-intl';
import { useState, Fragment } from 'react';
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
import { h, map } from "@/lib/react-helpers";

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

  return h(Fragment, {
    children: [
      // Skip to main content link for accessibility
      h(Box, {
        key: 'skip-link',
        component: "a",
        href: "#main-content",
        sx: {
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
        }
      }, "Skip to main content"),

      h(AppBar, {
        key: 'appbar',
      'data-component': "Navbar",
      position: "sticky",
      elevation: trigger ? 2 : 0,
      sx: {
        bgcolor: trigger ? 'background.default' : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        transition: 'all 0.3s',
        borderBottom: trigger ? 1 : 0,
        borderColor: 'divider',
      }
    }, h(Container, { maxWidth: "xl" },
      h(Toolbar, {
        disableGutters: true,
        sx: {
          justifyContent: 'space-between',
          minHeight: { xs: 64, md: 72 },
        },
        children: [
          // Logo
          h(Box, {
            key: 'logo',
            component: "a",
            href: "#",
            'aria-label': "Go to homepage",
            sx: {
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }
          }, "PGL"),

          // Desktop Navigation
          h(Box, {
            key: 'desktop-nav',
            sx: {
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            },
            children: map(navItems, (item) =>
              h(Box, {
                key: item.key,
                component: "a",
                href: item.href,
                sx: {
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
                }
              }, t(item.key))
            )
          }),

          // Controls
          h(Box, {
            key: 'controls',
            sx: { display: 'flex', gap: 1, alignItems: 'center' },
            children: [
              h(ThemeToggle, { key: 'theme-toggle' }),
              h(LanguageSwitcher, { key: 'language-switcher' }),

              // Mobile Menu Button
              h(IconButton, {
                key: 'mobile-menu-button',
                onClick: () => setIsOpen(!isOpen),
                'aria-label': "Toggle menu",
                sx: {
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.primary',
                }
              }, isOpen ? h(CloseIcon) : h(MenuIcon))
            ]
          })
        ]
      })
    )),

      // Mobile Drawer
      h(Drawer, {
        key: 'mobile-drawer',
        anchor: "right",
        open: isOpen,
        onClose: () => setIsOpen(false),
        sx: {
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        },
        children: [
          h(Box, {
            key: 'drawer-header',
            sx: {
              p: 2,
              display: 'flex',
              justifyContent: 'flex-end',
            }
          }, h(IconButton, {
            onClick: () => setIsOpen(false)
          }, h(CloseIcon))),

          h(List, {
            key: 'drawer-list',
            children: map(navItems, (item) =>
              h(ListItem, {
                key: item.key,
                disablePadding: true
              }, h(ListItemButton, {
                component: "a",
                href: item.href,
                onClick: () => setIsOpen(false),
                sx: {
                  py: 2,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }
              }, h(ListItemText, {
                primary: t(item.key),
                primaryTypographyProps: {
                  fontWeight: 500,
                }
              })))
            )
          })
        ]
      })
    ]
  });
}
