"use client";

import { m } from "framer-motion";
import { Box, Typography, TypographyProps } from "@mui/material";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  id?: string;
}

export function SectionTitle({ children, subtitle, align = "center", id }: SectionTitleProps) {
  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{
        mb: { xs: 6, md: 8 },
        textAlign: align,
      }}
    >
      <Typography
        id={id}
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 700,
          mb: subtitle ? 2 : 3,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {children}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            maxWidth: 600,
            mx: align === 'center' ? 'auto' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}

      <Box
        sx={{
          width: 60,
          height: 4,
          bgcolor: 'primary.main',
          borderRadius: 2,
          mx: align === 'center' ? 'auto' : 0,
          ml: align === 'right' ? 'auto' : align === 'center' ? 'auto' : 0,
        }}
      />
    </Box>
  );
}

interface SectionSubtitleProps {
  children: React.ReactNode;
  sx?: TypographyProps['sx'];
}

export function SectionSubtitle({ children, sx }: SectionSubtitleProps) {
  return (
    <Typography
      component="h3"
      variant="h5"
      sx={{
        fontWeight: 600,
        mb: 3,
        color: 'primary.main',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
