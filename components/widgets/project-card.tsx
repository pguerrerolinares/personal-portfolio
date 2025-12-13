"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Box, Card, CardContent, Typography, IconButton, Stack } from "@mui/material";
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
  web: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  mobile: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  ai: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  automation: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  other: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations("projects.items");
  const CategoryIcon = categoryIcons[project.category];

  const title = t(`${project.id}.title`);
  const description = t(`${project.id}.description`);

  return (
    <Card
      component={m.article}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      tabIndex={0}
      role="article"
      aria-label={`Project: ${title}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
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
    </Card>
  );
}
