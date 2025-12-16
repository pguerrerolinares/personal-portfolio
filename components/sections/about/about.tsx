"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography, Divider } from "@mui/material";
import {
  skills,
  skillCategories,
} from "@/lib/constants/portfolio-data";
import type { SkillCategory } from "@/types";
import { SkillBadge } from "./skill-badge";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle, SectionSubtitle } from "@/components/ui/section-title";
import { LAYOUT } from "@/lib/theme/layout";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function About() {
  const t = useTranslations("about");

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  const displayCategories: SkillCategory[] = [
    "frontend",
    "backend",
    "ai-ml",
    "devops",
  ];

  return (
    <SectionContainer id="about" data-component="About">
      <SectionTitle id="about-heading">{t("title")}</SectionTitle>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: LAYOUT.spacing.container }}>
        {/* Bio section */}
        <Box sx={{ flex: 1 }}>
          <Box
            component={motion.div}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionSubtitle sx={{ mb: 4, color: 'text.primary' }}>
              {t("subtitle")}
            </SectionSubtitle>

            <Typography component={motion.p} variants={item} variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {t("bio.p1")}
            </Typography>
            <Typography component={motion.p} variants={item} variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {t("bio.p2")}
            </Typography>
            <Typography component={motion.p} variants={item} variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              {t("bio.p3")}
            </Typography>

            {/* Quick stats */}
            <Box
              component={motion.div}
              variants={item}
              sx={{
                mt: LAYOUT.spacing.container,
                p: LAYOUT.spacing.grid,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: LAYOUT.spacing.grid,
                bgcolor: 'background.paper',
                borderRadius: LAYOUT.borderRadius.lg,
                border: 1,
                borderColor: 'divider',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, lineHeight: 1.2 }}>
                  4+
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {t("stats.years")}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, lineHeight: 1.2 }}>
                  {skills.length}+
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {t("stats.technologies")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Skills section */}
        <Box sx={{ flex: 1 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionSubtitle sx={{ mb: 4, color: 'text.primary' }}>
              {t("skills.title")}
            </SectionSubtitle>

            {displayCategories.map((category, idx) => (
              <Box key={category} sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  {skillCategories[category]}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {skillsByCategory[category]?.map((skill, index) => (
                    <SkillBadge key={skill.name} skill={skill} index={index} />
                  ))}
                </Box>
                {idx < displayCategories.length - 1 && (
                  <Divider sx={{ mt: 3 }} />
                )}
              </Box>
            ))}

            <Typography variant="body2" color="text.secondary" sx={{ mt: 4, fontStyle: 'italic' }}>
              {t("skills.more")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionContainer >
  );
}
