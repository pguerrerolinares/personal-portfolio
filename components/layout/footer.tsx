'use client';

import { useTranslations } from 'next-intl';
import { Box, Container, IconButton, Typography, Button } from '@mui/material';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icon';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function Footer() {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      data-component="Footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              component="a"
              href="https://github.com/pguerrerolinares"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: 'text.primary',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <GithubIcon size={20} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/paul-guerrero-linares-584759134"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: 'text.primary',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <LinkedinIcon size={20} />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            &copy; {currentYear} Paul Guerrero Linares
          </Typography>

          {/* Back to Top Button */}
          <Button
            onClick={scrollToTop}
            endIcon={<KeyboardArrowUpIcon />}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
          >
            {t('backToTop')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
