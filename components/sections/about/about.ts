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
import { h, map, when } from "@/lib/react-helpers";

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

  return h(SectionContainer, {
    id: "about",
    'data-component': "About",
    children: [
      h(SectionTitle, { key: 'section-title', id: "about-heading" }, t("title")),

      h(Box, {
        key: 'content',
        sx: {
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: LAYOUT.spacing.container
        },
        children: [
          // Bio section
          h(Box, {
            key: 'bio-section',
            sx: { flex: 1 },
            children:
            h(Box, {
              component: motion.div,
              variants: container,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true },
              children: [
                h(SectionSubtitle, {
                  key: 'subtitle',
                  sx: { mb: 4, color: 'text.primary' }
                }, t("subtitle")),

                h(Typography, {
                  key: 'bio-p1',
                  component: motion.p,
                  variants: item,
                  variant: "body1",
                  color: "text.secondary",
                  sx: { mb: 3, lineHeight: 1.8 }
                }, t("bio.p1")),

                h(Typography, {
                  key: 'bio-p2',
                  component: motion.p,
                  variants: item,
                  variant: "body1",
                  color: "text.secondary",
                  sx: { mb: 3, lineHeight: 1.8 }
                }, t("bio.p2")),

                h(Typography, {
                  key: 'bio-p3',
                  component: motion.p,
                  variants: item,
                  variant: "body1",
                  color: "text.secondary",
                  sx: { mb: 4, lineHeight: 1.8 }
                }, t("bio.p3")),

                // Quick stats
                h(Box, {
                  key: 'stats',
                  component: motion.div,
                  variants: item,
                  sx: {
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
                  },
                  children: [
                    h(Box, {
                      key: 'stat-years',
                      sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100px'
                      },
                      children: [
                        h(Typography, {
                          key: 'years-number',
                          variant: "h4",
                          sx: { fontWeight: 700, color: 'primary.main', mb: 1, lineHeight: 1.2 }
                        }, "4+"),
                        h(Typography, {
                          key: 'years-label',
                          variant: "body2",
                          color: "text.secondary",
                          align: "center"
                        }, t("stats.years"))
                      ]
                    }),
                    h(Box, {
                      key: 'stat-technologies',
                      sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100px'
                      },
                      children: [
                        h(Typography, {
                          key: 'tech-number',
                          variant: "h4",
                          sx: { fontWeight: 700, color: 'primary.main', mb: 1, lineHeight: 1.2 }
                        }, `${skills.length}+`),
                        h(Typography, {
                          key: 'tech-label',
                          variant: "body2",
                          color: "text.secondary",
                          align: "center"
                        }, t("stats.technologies"))
                      ]
                    })
                  ]
                })
              ]
            })
          }),

          // Skills section
          h(Box, {
            key: 'skills-section',
            sx: { flex: 1 },
            children:
            h(Box, {
              component: motion.div,
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.2 },
              children: [
                h(SectionSubtitle, {
                  key: 'skills-subtitle',
                  sx: { mb: 4, color: 'text.primary' }
                }, t("skills.title")),

                ...map(displayCategories, (category, idx) =>
                  h(Box, {
                    key: category,
                    sx: { mb: 4 },
                    children: [
                      h(Typography, {
                        key: 'category-title',
                        variant: "subtitle1",
                        sx: {
                          fontWeight: 600,
                          color: 'text.secondary',
                          mb: 2,
                        }
                      }, skillCategories[category]),

                      h(Box, {
                        key: 'skills-list',
                        sx: { display: 'flex', flexWrap: 'wrap', gap: 1.5 },
                        children: map(skillsByCategory[category] || [], (skill, index) =>
                          h(SkillBadge, {
                            key: skill.name,
                            skill,
                            index
                          })
                        )
                      }),

                      when(idx < displayCategories.length - 1, () =>
                        h(Divider, { key: 'divider', sx: { mt: 3 } })
                      )
                    ]
                  })
                ),

                h(Typography, {
                  key: 'skills-more',
                  variant: "body2",
                  color: "text.secondary",
                  sx: { mt: 4, fontStyle: 'italic' }
                }, t("skills.more"))
              ]
            })
          })
        ]
      })
    ]
  });
}
