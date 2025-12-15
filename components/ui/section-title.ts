"use client";

import { Typography, TypographyProps } from "@mui/material";
import { FadeIn } from "@/components/ui";
import { SxProps, Theme } from '@mui/material/styles';
import { ComponentProps } from 'react';
import { h, when } from "@/lib/react-helpers";

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
  return h(FadeIn, {
    direction: "up",
    sx: {
      textAlign: centered ? 'center' : 'left',
      mb: { xs: 4, md: 6 },
      ...sx
    },
    id,
    'data-component': "SectionTitle",
    ...props,
    children: [
      h(Typography, {
        key: 'title',
        variant: "h2",
        component: "h2",
        sx: {
          fontWeight: 700,
          color: 'primary.main',
          mb: 2,
        }
      }, children),
      when(!!subtitle, () =>
        h(Typography, {
          key: 'subtitle',
          variant: "subtitle1",
          color: "text.secondary",
          sx: {
            maxWidth: centered ? 600 : '100%',
            mx: centered ? 'auto' : 0,
          }
        }, subtitle)
      )
    ]
  });
}

interface SectionSubtitleProps extends TypographyProps {
  children: React.ReactNode;
}

export function SectionSubtitle({ children, sx, ...props }: SectionSubtitleProps) {
  return h(Typography, {
    component: "h3",
    variant: "h5",
    sx: {
      fontWeight: 600,
      mb: 3,
      color: 'primary.main',
      ...sx,
    },
    'data-component': "SectionSubtitle",
    ...props
  }, children);
}
