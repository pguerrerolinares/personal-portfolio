"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Box, CardContent, Typography, IconButton, Stack, alpha } from "@mui/material";
import { FadeIn, HoverCard } from "@/components/ui";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, SmartphoneIcon, BrainIcon, BotIcon, FolderIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryIcons = {
  web: GlobeIcon,
  mobile: SmartphoneIcon,
  ai: BrainIcon,
  automation: BotIcon,
  other: FolderIcon,
};



export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations("projects.items");
  const CategoryIcon = categoryIcons[project.category];

  const title = t(`${project.id}.title`);
  const description = t(`${project.id}.description`);

  return (
    <FadeIn
      delay={index * 0.1}
      fullWidth
      style={{ height: '100%' }}
    >
      <HoverCard
        tabIndex={0}
        role="article"
        aria-label={`Project: ${title}`}
        data-component="ProjectCard"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient Header */}
        <Box
          sx={{
            position: 'relative',
            height: 180,
            bgcolor: (theme) => alpha(theme.palette.category[project.category], 0.04), // Very subtle tint
            borderTop: (theme) => `4px solid ${theme.palette.category[project.category]}`, // The "Connection"
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            component={m.div}
            whileHover={{ scale: 1.1, rotate: 5 }}
            sx={{
              color: (theme) => theme.palette.category[project.category], // Icon matches category
              zIndex: 1,
              filter: (theme) => `drop-shadow(0 4px 6px ${alpha(theme.palette.category[project.category], 0.2)})`,
            }}
          >
            <CategoryIcon size={48} />
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Header with title and links */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
              {title}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {project.githubUrl && (
                <IconButton
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`View ${title} on GitHub`}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <GithubIcon size={16} />
                </IconButton>
              )}
              {project.liveUrl && (
                <IconButton
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`View ${title} live`}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <ExternalLinkIcon size={16} />
                </IconButton>
              )}
            </Stack>
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {description}
          </Typography>

          {/* Technologies */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="default" size="sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </Stack>
        </CardContent>
      </HoverCard>
    </FadeIn>
  );
}
