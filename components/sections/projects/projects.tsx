"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import { projects } from "@/lib/constants/portfolio-data";
import { ProjectCard } from "@/components/widgets";

export function Projects() {
  const t = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <Box
      component="section"
      id="projects"
      aria-labelledby="projects-heading"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
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
            id="projects-heading"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t("title")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {t("subtitle")}
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

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography
              component={m.h3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              variant="h5"
              sx={{ fontWeight: 600, mb: 4, color: 'primary.main' }}
            >
              {t("featured")}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </Box>
          </Box>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <Box>
            <Typography
              component={m.h3}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              variant="h5"
              sx={{ fontWeight: 600, mb: 4, color: 'text.secondary' }}
            >
              {t("other")}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
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
            mt: 8,
            textAlign: 'center',
            p: 4,
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
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
      </Container>
    </Box>
  );
}
