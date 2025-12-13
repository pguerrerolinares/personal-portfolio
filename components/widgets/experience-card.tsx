"use client";

import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Box, Card, CardContent, Typography, Chip, Stack, Avatar } from "@mui/material";
import { BriefcaseIcon, CodeIcon, CalendarIcon, Building2Icon } from "@/components/ui/icon";
import type { Experience } from "@/lib/constants/portfolio-data";

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

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      sx={{ position: 'relative', pl: { xs: 2, md: 4 }, pb: 4 }}
    >
      {/* Timeline line */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 4, md: 12 },
          top: 0,
          bottom: -16,
          width: 2,
          bgcolor: 'divider',
        }}
      />

      {/* Timeline dot */}
      <Box
        component={m.div}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
        sx={{
          position: 'absolute',
          left: { xs: 0, md: 8 },
          top: 8,
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          border: 3,
          borderColor: 'background.default',
        }}
      />

      <Card
        tabIndex={0}
        role="article"
        aria-label={`Experience: ${role} at ${company}`}
        sx={{
          ml: { xs: 2, md: 4 },
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateX(4px)',
            boxShadow: 3,
          },
        }}
      >
        <CardContent>
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 48,
                height: 48,
              }}
            >
              {experience.type === "personal" ? (
                <Building2Icon size={24} />
              ) : (
                <Typography variant="subtitle2">{initials}</Typography>
              )}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {company}
              </Typography>
            </Box>

            <Chip
              icon={<Icon size={12} />}
              label={tCommon(`experienceTypes.${experience.type}`)}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Stack>

          {/* Date */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
            <CalendarIcon size={16} />
            <Typography variant="body2">
              {formatDate(experience.startDate, locale)} —{" "}
              {experience.endDate ? formatDate(experience.endDate, locale) : tCommon("present")}
            </Typography>
          </Stack>

          {/* Description */}
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            {description}
          </Typography>

          {/* Highlights */}
          {highlights.length > 0 && (
            <Box component="ul" sx={{ pl: 2, mb: 2, m: 0 }}>
              {highlights.map((highlight, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5, lineHeight: 1.6 }}
                >
                  {highlight}
                </Typography>
              ))}
            </Box>
          )}

          {/* Technologies */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {experience.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
