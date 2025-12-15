"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { projects } from "@/lib/constants/portfolio-data";
import { ProjectCard } from "./project-card";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle, SectionSubtitle } from "@/components/ui/section-title";
import { GithubIcon } from "@/components/ui/icon";
import { LAYOUT } from "@/lib/theme/layout";
import { h, map, when } from "@/lib/react-helpers";

export function Projects() {
  const t = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return h(SectionContainer, {
    id: "projects",
    'data-component': "Projects",
    bgcolor: "paper",
    children: [
      h(SectionTitle, {
        key: 'section-title',
        id: "projects-heading",
        subtitle: t("subtitle")
      }, t("title")),

      // Featured projects
      when(featuredProjects.length > 0, () =>
        h(Box, {
          key: 'featured-section',
          sx: { mb: LAYOUT.spacing.section },
          children: [
            h(SectionSubtitle, { key: 'featured-subtitle' }, t("featured")),
            h(Box, {
              key: 'featured-grid',
              sx: {
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: LAYOUT.spacing.grid,
              },
              children: map(featuredProjects, (project, index) =>
                h(ProjectCard, {
                  key: project.id,
                  project,
                  index
                })
              )
            })
          ]
        })
      ),

      // Other projects
      when(otherProjects.length > 0, () =>
        h(Box, {
          key: 'other-section',
          children: [
            h(SectionSubtitle, {
              key: 'other-subtitle',
              sx: { color: 'text.secondary' }
            }, t("other")),
            h(Box, {
              key: 'other-grid',
              sx: {
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: { xs: 3, md: 4 },
              },
              children: map(otherProjects, (project, index) =>
                h(ProjectCard, {
                  key: project.id,
                  project,
                  index: index + featuredProjects.length
                })
              )
            })
          ]
        })
      ),

      // Call to action
      h(Box, {
        key: 'cta',
        component: motion.div,
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.3 },
        sx: {
          mt: LAYOUT.spacing.section,
          textAlign: 'center',
          p: LAYOUT.spacing.grid,
          borderRadius: LAYOUT.borderRadius.lg,
          bgcolor: 'action.hover',
          border: 1,
          borderColor: 'divider',
        },
        children: [
          h(Typography, {
            key: 'cta-text',
            variant: "body1",
            color: "text.secondary",
            sx: { mb: 3 }
          }, t("cta.text")),
          h(Button, {
            key: 'cta-button',
            component: "a",
            href: "https://github.com/pguerrerolinares",
            target: "_blank",
            rel: "noopener noreferrer",
            variant: "outlined",
            size: "large",
            startIcon: h(GithubIcon)
          }, t("cta.button"))
        ]
      })
    ]
  });
}
