"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  return (
    <motion.span
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
    </motion.span>
  );
}
