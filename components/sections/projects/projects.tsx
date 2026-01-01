"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { projects } from "@/lib/constants/portfolio-data";
import { ProjectCard } from "./project-card";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";
import { GithubIcon, ArrowRightIcon } from "@/components/ui/icon";
import { containerVariants, itemVariants } from "@/lib/animations/variants";

const MotionBox = motion.create(Box);

export function Projects() {
  const t = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <SectionContainer id="projects" data-component="Projects" bgcolor="paper">
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <MotionBox variants={itemVariants} sx={{ mb: 2 }}>
          <Typography
            variant="eyebrow"
            sx={{ color: "primary.main" }}
          >
            {t("title")}
          </Typography>
        </MotionBox>

        <MotionBox variants={itemVariants} sx={{ mb: 6 }}>
          <Typography
            variant="display2"
            component="h2"
            sx={{
              color: "text.primary",
              maxWidth: "800px",
            }}
          >
            {t("subtitle")}
          </Typography>
        </MotionBox>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <MotionBox variants={itemVariants} sx={{ mb: 4 }}>
              <Typography variant="eyebrow" sx={{ color: "text.secondary" }}>
                {t("featured")}
              </Typography>
            </MotionBox>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
                gap: 3,
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
          <Box sx={{ mb: 4 }}>
            <MotionBox variants={itemVariants} sx={{ mb: 4 }}>
              <Typography variant="eyebrow" sx={{ color: "text.secondary" }}>
                {t("other")}
              </Typography>
            </MotionBox>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
                gap: 3,
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

        {/* Call to action - simplified */}
        <MotionBox
          variants={itemVariants}
          sx={{
            textAlign: "center",
            pt: 6,
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {t("cta.text")}
          </Typography>
          <Button
            component="a"
            href="https://github.com/pguerrerolinares"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            sx={{
              gap: 1.5,
              px: 4,
              py: 1.5,
              "& svg:last-child": {
                transition: "transform 0.2s ease",
              },
              "&:hover svg:last-child": {
                transform: "translateX(4px)",
              },
            }}
          >
            <GithubIcon size={20} />
            {t("cta.button")}
            <ArrowRightIcon size={16} />
          </Button>
        </MotionBox>
      </MotionBox>
    </SectionContainer>
  );
}
