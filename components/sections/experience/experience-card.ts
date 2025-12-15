"use client";

import { useTranslations, useLocale } from "next-intl";
import { Box, CardContent, Typography, Chip, Stack, Avatar } from "@mui/material";
import { HoverCard, TimelineItem } from "@/components/ui";
import { BriefcaseIcon, CodeIcon, CalendarIcon, Building2Icon } from "@/components/ui/icon";
import type { Experience } from "@/types";
import { h, map, when } from "@/lib/react-helpers";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

const typeIcons = {
  fulltime: BriefcaseIcon,
  freelance: CodeIcon,
  personal: CodeIcon,
};

function formatDate(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

function getCompanyInitials(company: string): string {
  const words = company.split(/[\s–-]+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const tCommon = useTranslations("common");
  const tExperience = useTranslations("experience.items");
  const locale = useLocale();
  const Icon = typeIcons[experience.type];

  const company = tExperience(`${experience.id}.company`);
  const role = tExperience(`${experience.id}.role`);
  const description = tExperience(`${experience.id}.description`);
  const highlights = tExperience.raw(`${experience.id}.highlights`) as string[];

  const initials = getCompanyInitials(company);

  return h(TimelineItem, { index },
    h(HoverCard, {
      tabIndex: 0,
      role: "article",
      'aria-label': `Experience: ${role} at ${company}`,
      'data-component': "ExperienceCard"
    }, h(CardContent, {
      children: [
        // Header
        h(Stack, {
          key: 'header',
          direction: "row",
          spacing: 2,
          alignItems: "flex-start",
          sx: { mb: 2 },
          children: [
            h(Avatar, {
              key: 'avatar',
              sx: {
                width: { xs: '2.5rem', md: '3rem' },
                height: { xs: '2.5rem', md: '3rem' },
              }
            }, experience.type === "personal"
              ? h(Building2Icon, { size: 24 })
              : h(Typography, { variant: "subtitle2" }, initials)
            ),
            h(Box, {
              key: 'info',
              sx: { flex: 1 },
              children:
              h(Stack, {
                direction: { xs: 'column', sm: 'row' },
                justifyContent: "space-between",
                alignItems: "flex-start",
                spacing: 1,
                children: [
                  h(Box, {
                    key: 'company-info',
                    children: [
                      h(Typography, {
                        key: 'role',
                        variant: "h6",
                        sx: { fontWeight: 600, lineHeight: 1.3 }
                      }, role),
                      h(Typography, {
                        key: 'company',
                        variant: "body2",
                        color: "text.secondary"
                      }, company)
                    ]
                  }),
                  h(Chip, {
                    key: 'type-chip',
                    icon: h(Icon, { size: 12 }),
                    label: tCommon(`experienceTypes.${experience.type}`),
                    size: "small",
                    color: "primary",
                    variant: "outlined"
                  })
                ]
              })
            })
          ]
        }),

        // Date
        h(Stack, {
          key: 'date',
          direction: "row",
          spacing: 1,
          alignItems: "center",
          sx: { mb: 2, color: 'text.secondary' },
          children: [
            h(CalendarIcon, { key: 'calendar-icon', size: 16 }),
            h(Typography, {
              key: 'date-text',
              variant: "body2"
            }, `${formatDate(experience.startDate, locale)} — ${experience.endDate ? formatDate(experience.endDate, locale) : tCommon("present")}`)
          ]
        }),

        // Description
        h(Typography, {
          key: 'description',
          variant: "body2",
          sx: { mb: 2, lineHeight: 1.6 }
        }, description),

        // Highlights
        when(highlights.length > 0, () =>
          h(Box, {
            key: 'highlights',
            component: "ul",
            sx: { m: 0, pl: 2, mb: 2 },
            children: map(highlights, (highlight, i) =>
              h(Typography, {
                key: i,
                component: "li",
                variant: "body2",
                color: "text.secondary",
                sx: { mb: 0.5, lineHeight: 1.6 }
              }, highlight)
            )
          })
        ),

        // Technologies
        h(Stack, {
          key: 'technologies',
          direction: "row",
          spacing: 1,
          flexWrap: "wrap",
          useFlexGap: true,
          children: map(experience.technologies, (tech) =>
            h(Chip, {
              key: tech,
              label: tech,
              size: "small",
              variant: "outlined",
              sx: { fontSize: '0.75rem' }
            })
          )
        })
      ]
    }))
  );
}
