"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography, Stack } from "@mui/material";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { SectionContainer } from "@/components/ui/section-container";
import { CopyButton } from "@/components/ui/copy-button";
import { MailIcon, GithubIcon, LinkedinIcon, MapPinIcon } from "@/components/ui/icon";
import { LAYOUT } from "@/lib/theme/layout";
import { containerVariants, itemVariants, easeOutQuart } from "@/lib/animations/variants";
import type { IconProps } from "@/components/ui/icon";

const MotionBox = motion.create(Box);

// Card-specific variant with scale
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutQuart },
  },
};

interface ContactCardLargeProps {
  icon: React.ComponentType<IconProps>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  copyable?: boolean;
  accent?: string;
}

function ContactCardLarge({
  icon: Icon,
  label,
  value,
  href,
  external = false,
  copyable = false,
  accent = "primary.main",
}: ContactCardLargeProps) {
  const cardContent = (
    <MotionBox
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: LAYOUT.borderRadius.lg,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        cursor: href || copyable ? "pointer" : "default",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        "&:hover": {
          borderColor: accent,
          boxShadow: (theme) => `0 8px 25px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: LAYOUT.borderRadius.md,
          bgcolor: accent,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={28} />
      </Box>

      {/* Label */}
      <Typography
        variant="eyebrow"
        sx={{ color: "text.secondary", mt: 1 }}
      >
        {label}
      </Typography>

      {/* Value */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          wordBreak: "break-word",
        }}
      >
        {value}
      </Typography>

      {/* Arrow indicator for links */}
      {href && (
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            transition: "color 0.2s ease",
          }}
        >
          <Box component="span" sx={{ fontSize: "1.2rem" }}>→</Box>
        </Box>
      )}
    </MotionBox>
  );

  if (copyable && !href) {
    return (
      <CopyButton text={value} successMessage={`${label} copied!`}>
        {cardContent}
      </CopyButton>
    );
  }

  if (href) {
    return (
      <Box
        component="a"
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={`${label}: ${value}`}
        sx={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
      >
        {cardContent}
      </Box>
    );
  }

  return cardContent;
}

export function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  const contactItems = [
    {
      icon: MailIcon,
      label: t("info.email"),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      copyable: true,
      accent: "primary.main",
    },
    {
      icon: GithubIcon,
      label: tCommon("github"),
      value: "@pguerrerolinares",
      href: personalInfo.social.github,
      external: true,
      accent: "grey.500",
    },
    {
      icon: LinkedinIcon,
      label: tCommon("linkedin"),
      value: "Paul Guerrero Linares",
      href: personalInfo.social.linkedin,
      external: true,
      accent: "#0077B5", // LinkedIn brand color
    },
    {
      icon: MapPinIcon,
      label: t("info.location"),
      value: personalInfo.location,
      accent: "success.main",
    },
  ];

  return (
    <SectionContainer id="contact" bgcolor="paper" data-component="Contact">
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

        {/* Big headline */}
        <MotionBox variants={itemVariants} sx={{ mb: 3 }}>
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

        {/* CTA text */}
        <MotionBox variants={itemVariants} sx={{ mb: 8 }}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              lineHeight: 1.8,
            }}
          >
            {t("cta")}
          </Typography>
        </MotionBox>

        {/* Contact cards grid */}
        <MotionBox
          variants={containerVariants}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 3,
            maxWidth: 800,
            mb: 8,
          }}
        >
          {contactItems.map((item) => (
            <MotionBox key={item.label} variants={cardVariants}>
              <ContactCardLarge
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
                external={item.external}
                copyable={item.copyable}
                accent={item.accent}
              />
            </MotionBox>
          ))}
        </MotionBox>

        {/* Availability indicator */}
        <MotionBox
          variants={itemVariants}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            px: 3,
            py: 2,
            borderRadius: LAYOUT.borderRadius.pill,
            bgcolor: "background.default",
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "success.main",
              boxShadow: (theme) => `0 0 0 3px ${theme.palette.success.main}33`,
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%, 100%": { boxShadow: (theme) => `0 0 0 3px ${theme.palette.success.main}33` },
                "50%": { boxShadow: (theme) => `0 0 0 6px ${theme.palette.success.main}1a` },
              },
            }}
          />
          <Stack spacing={0}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
              {t("availability.title")}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {t("availability.subtitle")}
            </Typography>
          </Stack>
        </MotionBox>
      </MotionBox>
    </SectionContainer>
  );
}
