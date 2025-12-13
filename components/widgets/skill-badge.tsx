"use client";

import { m } from "framer-motion";
import { Chip } from "@mui/material";
import type { Skill } from "@/lib/constants/portfolio-data";

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const getColor = () => {
    switch (skill.level) {
      case "expert":
        return "primary";
      case "advanced":
        return "success";
      case "intermediate":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Chip
      component={m.span}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      label={skill.name}
      color={getColor() as any}
      size="small"
      sx={{
        fontWeight: 500,
        ...(skill.level === "expert" && {
          fontWeight: 600,
        }),
      }}
    />
  );
}
