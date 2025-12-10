"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/constants/portfolio-data";
import styles from './skill-badge.module.scss';

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`${styles.badge} ${styles[skill.level]}`}
    >
      {skill.name}
    </motion.span>
  );
}
