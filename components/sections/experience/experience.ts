"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { experiences } from "@/lib/constants/portfolio-data";
import { ExperienceCard } from "./experience-card";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle } from "@/components/ui/section-title";
import DownloadIcon from '@mui/icons-material/Download';
import { LAYOUT } from "@/lib/theme/layout";
import { h, map } from "@/lib/react-helpers";

export function Experience() {
  const t = useTranslations("experience");

  return h(SectionContainer, {
    id: "experience",
    'data-component': "Experience",
    children: [
      h(SectionTitle, {
        key: 'section-title',
        id: "experience-heading",
        subtitle: t("subtitle")
      }, t("title")),

      // Timeline
      h(Box, {
        key: 'timeline',
        sx: { maxWidth: 900, mx: 'auto', mb: LAYOUT.spacing.section },
        children: map(experiences, (experience, index) =>
          h(ExperienceCard, {
            key: experience.id,
            experience,
            index
          })
        )
      }),

      // Download resume CTA
      h(Box, {
        key: 'cta',
        component: motion.div,
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.3 },
        sx: {
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
            href: "/resume.pdf",
            target: "_blank",
            rel: "noopener noreferrer",
            variant: "outlined",
            startIcon: h(DownloadIcon),
            size: "large"
          }, t("cta.button"))
        ]
      })
    ]
  });
}
