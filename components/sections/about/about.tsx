"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Container, Typography, Divider } from "@mui/material";
import {
  skills,
  skillCategories,
  type SkillCategory,
} from "@/lib/constants/portfolio-data";
import { SkillBadge } from "@/components/widgets";

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
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="xl">
        {/* Section header */}
        <Box
          component={m.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6, textAlign: 'center' }}
        >
          <Typography
            id="about-heading"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            {t("title")}
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              bgcolor: 'primary.main',
              borderRadius: 2,
              mx: 'auto',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
          {/* Bio section */}
          <Box sx={{ flex: 1 }}>
            <Box
              component={m.div}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Typography
                component={m.h3}
                variants={item}
                variant="h5"
                sx={{ fontWeight: 600, mb: 3 }}
              >
                {t("subtitle")}
              </Typography>

              <Typography component={m.p} variants={item} variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                {t("bio.p1")}
              </Typography>
              <Typography component={m.p} variants={item} variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                {t("bio.p2")}
              </Typography>
              <Typography component={m.p} variants={item} variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                {t("bio.p3")}
              </Typography>

              {/* Quick stats */}
              <Box
                component={m.div}
                variants={item}
                sx={{
                  mt: 4,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    4+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("stats.years")}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {skills.length}+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("stats.technologies")}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
                    Full-Stack
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("stats.focus")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Skills section */}
          <Box sx={{ flex: 1 }}>
            <Box
              component={m.div}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {t("skills.title")}
              </Typography>

              {displayCategories.map((category, idx) => (
                <Box key={category} sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 1.5,
                    }}
                  >
                    {skillCategories[category]}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillsByCategory[category]?.map((skill, index) => (
                      <SkillBadge key={skill.name} skill={skill} index={index} />
                    ))}
                  </Box>
                  {idx < displayCategories.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}

              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
                {t("skills.more")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
