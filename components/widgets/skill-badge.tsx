"use client";

import { m } from "framer-motion";
import { Chip, alpha, useTheme } from "@mui/material";
import type { Skill } from "@/lib/constants/portfolio-data";

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const theme = useTheme();

  const getStyleProps = (category: string) => {
    switch (category) {
      case "frontend":
        return { color: 'primary.main', bg: 'primary.main' };
      case "backend":
        return { color: 'success.main', bg: 'success.main' };
      case "devops":
        return { color: 'info.main', bg: 'info.main' };
      case "ai-ml":
        return { color: 'accent.purple', bg: 'accent.purple' };
      default:
        // For default/tools, use slate/grey
        return { color: 'text.secondary', bg: 'text.primary' };
    }
  };

  const styles = getStyleProps(skill.category);

  // Helper to safely get nested palette value
  const getPaletteValue = (theme: any, path: string) => {
    const parts = path.split('.');
    let value = theme.palette;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return undefined;
      }
    }
    return value;
  };

  return (
    <Chip
      component={m.span}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      label={skill.name}
      size="small"
      sx={{
        fontWeight: skill.level === "expert" ? 600 : 500,
        bgcolor: (theme) => {
          const bgColorValue = getPaletteValue(theme, styles.bg);
          if (bgColorValue) {
            // For default case, use action.hover for a lighter background
            if (styles.bg === 'text.primary') {
              return theme.palette.action.hover;
            }
            return alpha(bgColorValue, 0.1);
          }
          return undefined;
        },
        color: (theme) => {
          // For default, use text.secondary directly if mapped
          if (styles.color === 'text.secondary') return theme.palette.text.secondary;
          const colorValue = getPaletteValue(theme, styles.color);
          return colorValue || undefined;
        },
        border: '1px solid',
        borderColor: (theme) => {
          const borderColorValue = getPaletteValue(theme, styles.bg);
          if (borderColorValue) {
            if (styles.bg === 'text.primary') {
              return theme.palette.action.selected;
            }
            return alpha(borderColorValue, 0.2);
          }
          return undefined;
        },
        '&:hover': {
          bgcolor: (theme) => {
            const bgColorValue = getPaletteValue(theme, styles.bg);
            if (bgColorValue) {
              if (styles.bg === 'text.primary') {
                return alpha(theme.palette.action.hover, 0.8);
              }
              return alpha(bgColorValue, 0.2);
            }
            return undefined;
          },
        }
      }}
    />
  );
}
