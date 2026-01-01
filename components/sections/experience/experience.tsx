"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography, Chip, Stack, Avatar } from "@mui/material";
import { experiences } from "@/lib/constants/portfolio-data";
import { SectionContainer } from "@/components/ui/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, CodeIcon, CalendarIcon, ArrowRightIcon } from "@/components/ui/icon";
import DownloadIcon from '@mui/icons-material/Download';
import { LAYOUT } from "@/lib/theme/layout";
import { containerVariants, itemVariants, cardVariantsLeft, cardVariantsRight } from "@/lib/animations/variants";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { Experience } from "@/types";

const MotionBox = motion.create(Box);

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isEven: boolean;
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

function ExperienceCardNew({ experience, index, isEven }: ExperienceCardProps) {
  const tCommon = useTranslations("common");
  const tExperience = useTranslations("experience.items");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const Icon = typeIcons[experience.type];
  const company = tExperience(`${experience.id}.company`);
  const role = tExperience(`${experience.id}.role`);
  const description = tExperience(`${experience.id}.description`);
  const highlights = tExperience.raw(`${experience.id}.highlights`) as string[];

  const isCurrentRole = !experience.endDate;

  return (
    <MotionBox
      variants={prefersReducedMotion ? itemVariants : isEven ? cardVariantsRight : cardVariantsLeft}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: isEven ? "row-reverse" : "row" },
        gap: { xs: 3, md: 6 },
        alignItems: { xs: "stretch", md: "flex-start" },
        mb: 6,
      }}
    >
      {/* Date column */}
      <Box
        sx={{
          flex: { md: "0 0 200px" },
          textAlign: { xs: "left", md: isEven ? "left" : "right" },
          pt: { md: 1 },
        }}
      >
        <Typography
          variant="eyebrow"
          sx={{
            color: isCurrentRole ? "primary.main" : "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: { xs: "flex-start", md: isEven ? "flex-start" : "flex-end" },
          }}
        >
          <CalendarIcon size={14} />
          {formatDate(experience.startDate, locale)} — {experience.endDate ? formatDate(experience.endDate, locale) : tCommon("present")}
        </Typography>
        {isCurrentRole && (
          <Box
            sx={{
              mt: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: "12px",
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "currentColor",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.4 },
                },
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.65rem", textTransform: "uppercase" }}>
              {tCommon("current")}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Card */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          borderRadius: LAYOUT.borderRadius.lg,
          bgcolor: "background.paper",
          border: 1,
          borderColor: isCurrentRole ? "primary.main" : "divider",
          boxShadow: isCurrentRole ? (theme) => `0 0 0 1px ${theme.palette.primary.main}20` : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: (theme) => `0 10px 30px ${theme.palette.primary.main}10`,
            transform: "translateY(-4px)",
          },
        }}
      >
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: isCurrentRole ? "primary.main" : "grey.200",
              color: isCurrentRole ? "primary.contrastText" : "text.primary",
            }}
          >
            <Icon size={24} />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              {role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {company}
            </Typography>
          </Box>

          <Chip
            label={tCommon(`experienceTypes.${experience.type}`)}
            size="small"
            color={isCurrentRole ? "primary" : "default"}
            variant={isCurrentRole ? "filled" : "outlined"}
            sx={{ fontWeight: 500 }}
          />
        </Stack>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          {description}
        </Typography>

        {/* Highlights */}
        {highlights.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {highlights.map((highlight, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    mt: 1,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {highlight}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Technologies */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {experience.technologies.slice(0, 6).map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
          {experience.technologies.length > 6 && (
            <Badge variant="default" size="sm">
              +{experience.technologies.length - 6}
            </Badge>
          )}
        </Stack>
      </Box>
    </MotionBox>
  );
}

export function Experience() {
  const t = useTranslations("experience");

  return (
    <SectionContainer id="experience" data-component="Experience">
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

        <MotionBox variants={itemVariants} sx={{ mb: 8 }}>
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

        {/* Timeline */}
        <Box sx={{ maxWidth: 1000, mx: "auto", mb: 8 }}>
          {experiences.map((experience, index) => (
            <ExperienceCardNew
              key={experience.id}
              experience={experience}
              index={index}
              isEven={index % 2 === 1}
            />
          ))}
        </Box>

        {/* Download resume CTA */}
        <MotionBox
          variants={itemVariants}
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: LAYOUT.borderRadius.lg,
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            {t("cta.text")}
          </Typography>
          <Button
            component="a"
            href="/resume.pdf"
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
            <DownloadIcon sx={{ fontSize: 20 }} />
            {t("cta.button")}
            <ArrowRightIcon size={16} />
          </Button>
        </MotionBox>
      </MotionBox>
    </SectionContainer>
  );
}
