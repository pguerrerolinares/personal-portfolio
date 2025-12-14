"use client";

import { Typography, TypographyProps } from "@mui/material";
import { FadeIn } from "@/components/ui";
import { SxProps, Theme } from '@mui/material/styles';
import { ComponentProps } from 'react';

interface SectionTitleProps extends Omit<ComponentProps<typeof FadeIn>, 'children' | 'sx' | 'id'> {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  id?: string;
  sx?: SxProps<Theme>;
}

export function SectionTitle({
  children,
  subtitle,
  centered = false,
  id,
  sx,
  ...props
}: SectionTitleProps) {
  return (
    <FadeIn
      direction="up"
      sx={{
        textAlign: centered ? 'center' : 'left',
        mb: { xs: 4, md: 6 },
        ...sx
      }}
      id={id}
      data-component="SectionTitle"
      {...props}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 2,
        }}
      >
        {children}
      </Typography>
      {subtitle && (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            maxWidth: centered ? 600 : '100%',
            mx: centered ? 'auto' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </FadeIn>
  );
}

interface SectionSubtitleProps extends TypographyProps {
  children: React.ReactNode;
}

export function SectionSubtitle({ children, sx, ...props }: SectionSubtitleProps) {
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
      {...props}
      data-component="SectionSubtitle"
    >
      {children}
    </Typography>
  );
}
