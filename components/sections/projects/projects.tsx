"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { projects } from "@/lib/constants/portfolio-data";
import { ProjectCard } from "@/components/widgets";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle, SectionSubtitle } from "@/components/ui/section-title";

export function Projects() {
  const t = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <SectionContainer id="projects" bgcolor="paper">
      <SectionTitle id="projects-heading" subtitle={t("subtitle")}>
        {t("title")}
      </SectionTitle>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <SectionSubtitle>{t("featured")}</SectionSubtitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: { xs: 3, md: 4 },
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
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
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
          mt: { xs: 6, md: 8 },
          textAlign: 'center',
          p: { xs: 3, md: 4 },
          borderRadius: 3,
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
          variant="contained"
          size="large"
        >
          {t("cta.button")}
        </Button>
      </Box>
    </SectionContainer>
  );
}
