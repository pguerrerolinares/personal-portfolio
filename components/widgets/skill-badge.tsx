"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/constants/portfolio-data";

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

const levelColors = {
  expert: "bg-accent/20 text-accent border-accent/30",
  advanced: "bg-foreground/10 text-foreground border-foreground/20",
  intermediate: "bg-muted/50 text-muted-foreground border-muted",
};

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${levelColors[skill.level]}`}
    >
      {skill.name}
    </motion.span>
  );
}
