"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Box, CardContent, Typography, IconButton, Stack, alpha } from "@mui/material";
import { FadeIn, HoverCard } from "@/components/ui";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, SmartphoneIcon, BrainIcon, BotIcon, FolderIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import { h, map, when } from "@/lib/react-helpers";

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

  return h(FadeIn, {
    delay: index * 0.1,
    fullWidth: true,
    style: { height: '100%' }
  }, h(HoverCard, {
    tabIndex: 0,
    role: "article",
    'aria-label': `Project: ${title}`,
    'data-component': "ProjectCard",
    sx: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    },
    children: [
      // Gradient Header
      h(Box, {
        key: 'header',
        sx: {
          position: 'relative',
          height: 180,
          bgcolor: (theme: any) => alpha(theme.palette.category[project.category], 0.04),
          borderTop: (theme: any) => `4px solid ${theme.palette.category[project.category]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }
      }, h(Box, {
        component: motion.div,
        whileHover: { scale: 1.1, rotate: 5 },
        sx: {
          color: (theme: any) => theme.palette.category[project.category],
          zIndex: 1,
          filter: (theme: any) => `drop-shadow(0 4px 6px ${alpha(theme.palette.category[project.category], 0.2)})`,
        }
      }, h(CategoryIcon, { size: 48 }))),

      // Content
      h(CardContent, {
        key: 'content',
        sx: { flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 },
        children: [
          // Header with title and links
          h(Box, {
            key: 'title-section',
            sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
            children: [
              h(Typography, {
                key: 'title',
                variant: "h6",
                component: "h3",
                sx: { fontWeight: 600, flex: 1 }
              }, title),
              h(Stack, {
                key: 'links',
                direction: "row",
                spacing: 0.5,
                children: [
                  when(!!project.githubUrl, () =>
                    h(IconButton, {
                      key: 'github-link',
                      component: "a",
                      href: project.githubUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      size: "small",
                      'aria-label': `View ${title} on GitHub`,
                      sx: {
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }
                    }, h(GithubIcon, { size: 16 }))
                  ),
                  when(!!project.liveUrl, () =>
                    h(IconButton, {
                      key: 'live-link',
                      component: "a",
                      href: project.liveUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      size: "small",
                      'aria-label': `View ${title} live`,
                      sx: {
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }
                    }, h(ExternalLinkIcon, { size: 16 }))
                  )
                ]
              })
            ]
          }),

          // Description
          h(Typography, {
            key: 'description',
            variant: "body2",
            color: "text.secondary",
            sx: { lineHeight: 1.6 }
          }, description),

          // Technologies
          h(Stack, {
            key: 'technologies',
            direction: "row",
            spacing: 1,
            flexWrap: "wrap",
            useFlexGap: true,
            sx: { mt: 'auto' },
            children: [
              ...map(project.technologies.slice(0, 4), (tech) =>
                h(Badge, { key: tech, variant: "default", size: "sm" }, tech)
              ),
              when(project.technologies.length > 4, () =>
                h(Badge, { key: 'more-tech', variant: "default", size: "sm" }, `+${project.technologies.length - 4}`)
              )
            ]
          })
        ]
      })
    ]
  }));
}
