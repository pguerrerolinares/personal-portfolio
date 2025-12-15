'use client';

import { useTranslations } from 'next-intl';
import { Box, Container, IconButton, Typography, Button } from '@mui/material';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icon';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { h } from "@/lib/react-helpers";

export function Footer() {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return h(Box, {
    component: "footer",
    'data-component': "Footer",
    sx: {
      borderTop: 1,
      borderColor: 'divider',
      py: 6,
      mt: 8,
    }
  }, h(Container, { maxWidth: "xl" },
    h(Box, {
      sx: {
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
      },
      children: [
        // Social Links
        h(Box, {
          key: 'social-links',
          sx: { display: 'flex', gap: 1 },
          children: [
            h(IconButton, {
              key: 'github',
              component: "a",
              href: "https://github.com/pguerrerolinares",
              target: "_blank",
              rel: "noopener noreferrer",
              'aria-label': "GitHub",
              sx: {
                color: 'text.primary',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                },
              }
            }, h(GithubIcon, { size: 20 })),
            h(IconButton, {
              key: 'linkedin',
              component: "a",
              href: "https://www.linkedin.com/in/paul-guerrero-linares-584759134",
              target: "_blank",
              rel: "noopener noreferrer",
              'aria-label': "LinkedIn",
              sx: {
                color: 'text.primary',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                },
              }
            }, h(LinkedinIcon, { size: 20 }))
          ]
        }),

        // Copyright
        h(Typography, {
          key: 'copyright',
          variant: "body2",
          color: "text.secondary",
          sx: { textAlign: 'center' }
        }, `© ${currentYear} Paul Guerrero Linares`),

        // Back to Top Button
        h(Button, {
          key: 'back-to-top',
          onClick: scrollToTop,
          endIcon: h(KeyboardArrowUpIcon),
          size: "small",
          sx: {
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              bgcolor: 'action.hover',
            },
          }
        }, t('backToTop'))
      ]
    })
  ));
}
