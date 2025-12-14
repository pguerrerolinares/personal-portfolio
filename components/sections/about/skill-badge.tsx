"use client";

import { m } from "framer-motion";
import { Chip, alpha, useTheme } from "@mui/material";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const theme = useTheme();

  const getStyleProps = (category: string) => {
    switch (category) {
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
    <m.span
      data-component="SkillBadge"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Badge
        size="sm"
        variant="default"
        sx={{
          fontWeight: skill.level === "expert" ? 600 : 500,
          cursor: 'default',
        }}
      >
        {skill.name}
      </Badge>
    </m.span>
  );
}
