"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Box, CardContent, Typography, IconButton, Stack } from "@mui/material";
import { FadeIn, HoverCard } from "@/components/ui";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, SmartphoneIcon, BrainIcon, BotIcon, FolderIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/constants/portfolio-data";

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

const categoryGradients = {
  web: 'linear-gradient(135deg, #0071e3 0%, #409cff 100%)', // Blue
  mobile: 'linear-gradient(135deg, #34c759 0%, #30d158 100%)', // Green
  ai: 'linear-gradient(135deg, #bf5af2 0%, #d288ff 100%)', // Purple
  automation: 'linear-gradient(135deg, #ff9f0a 0%, #ffb340 100%)', // Orange
  other: 'linear-gradient(135deg, #8e8e93 0%, #aeaeb2 100%)', // Gray
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
            background: categoryGradients[project.category],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
            },
          }}
        >
          <Box
            component={m.div}
            whileHover={{ scale: 1.1, rotate: 5 }}
            sx={{
              color: 'white',
              zIndex: 1,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
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
