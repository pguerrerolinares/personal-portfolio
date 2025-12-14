"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { projects } from "@/lib/constants/portfolio-data";
import { ProjectCard } from "./project-card";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle, SectionSubtitle } from "@/components/ui/section-title";
import { GithubIcon } from "@/components/ui/icon";
import { LAYOUT } from "@/lib/theme/layout";

export function Projects() {
  const t = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <SectionContainer id="projects" data-component="Projects" bgcolor="paper">
      <SectionTitle id="projects-heading" subtitle={t("subtitle")}>
        {t("title")}
      </SectionTitle>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <Box sx={{ mb: LAYOUT.spacing.section }}>
          <SectionSubtitle>{t("featured")}</SectionSubtitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: LAYOUT.spacing.grid,
            }}
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </Box>
        </Box>
      )}

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <Box>
          <SectionSubtitle sx={{ color: 'text.secondary' }}>{t("other")}</SectionSubtitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index + featuredProjects.length}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Call to action */}
      <Box
        component={m.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          mt: LAYOUT.spacing.section,
          textAlign: 'center',
          p: LAYOUT.spacing.grid,
          borderRadius: LAYOUT.borderRadius.lg,
          bgcolor: 'action.hover',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t("cta.text")}
        </Typography>
        <Button
          component="a"
          href="https://github.com/pguerrerolinares"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="large"
          startIcon={<GithubIcon />}
        >
          {t("cta.button")}
        </Button>
      </Box>
    </SectionContainer>
  );
}
