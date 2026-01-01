"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { skills } from "@/lib/constants/portfolio-data";
import { SkillChip } from "./skill-chip";
import { SectionContainer } from "@/components/ui/section-container";
import { CounterAnimation } from "@/components/ui/counter-animation";
import { Marquee } from "@/components/ui/horizontal-scroll";
import { containerVariants, itemVariants } from "@/lib/animations/variants";

const MotionBox = motion.create(Box);

export function About() {
  const t = useTranslations("about");

  // Get expert skills first, then others
  const sortedSkills = [...skills].sort((a, b) => {
    if (a.level === "expert" && b.level !== "expert") return -1;
    if (a.level !== "expert" && b.level === "expert") return 1;
    return 0;
  });

  return (
    <SectionContainer id="about" data-component="About">
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <MotionBox variants={itemVariants} sx={{ mb: 2 }}>
          <Typography
            variant="eyebrow"
            sx={{ color: "primary.main" }}
          >
            {t("title")}
          </Typography>
        </MotionBox>

        {/* Large section title */}
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

        {/* Bio - Full width, narrative style */}
        <Box sx={{ mb: 8 }}>
          <MotionBox
            variants={itemVariants}
            sx={{
              maxWidth: "900px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                lineHeight: 1.9,
                color: "text.secondary",
                "& strong": {
                  color: "text.primary",
                  fontWeight: 600,
                },
              }}
            >
              {t("bio.p1")}
            </Typography>
          </MotionBox>

          <MotionBox
            variants={itemVariants}
            sx={{ mt: 4, maxWidth: "900px" }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                lineHeight: 1.9,
                color: "text.secondary",
              }}
            >
              {t("bio.p2")}
            </Typography>
          </MotionBox>

          <MotionBox
            variants={itemVariants}
            sx={{ mt: 4, maxWidth: "900px" }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                lineHeight: 1.9,
                color: "text.secondary",
              }}
            >
              {t("bio.p3")}
            </Typography>
          </MotionBox>
        </Box>

        {/* Stats - Large animated counters */}
        <MotionBox
          variants={itemVariants}
          sx={{
            display: "flex",
            gap: { xs: 6, md: 12 },
            mb: 10,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <CounterAnimation
              value={4}
              suffix="+"
              variant="display2"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                display: "block",
                lineHeight: 1,
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {t("stats.years")}
            </Typography>
          </Box>

          <Box>
            <CounterAnimation
              value={skills.length}
              suffix="+"
              variant="display2"
              delay={0.2}
              sx={{
                fontWeight: 700,
                color: "primary.main",
                display: "block",
                lineHeight: 1,
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {t("stats.technologies")}
            </Typography>
          </Box>

          <Box>
            <CounterAnimation
              value={10}
              suffix="+"
              variant="display2"
              delay={0.4}
              sx={{
                fontWeight: 700,
                color: "primary.main",
                display: "block",
                lineHeight: 1,
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {t("stats.projects")}
            </Typography>
          </Box>
        </MotionBox>

        {/* Skills label */}
        <MotionBox variants={itemVariants} sx={{ mb: 4 }}>
          <Typography
            variant="eyebrow"
            sx={{ color: "text.secondary" }}
          >
            {t("skills.title")}
          </Typography>
        </MotionBox>

        {/* Skills Marquee - Single direction for clean visual flow */}
        <MotionBox
          variants={itemVariants}
          sx={{
            mx: { xs: -3, md: -6 },
          }}
        >
          <Marquee speed={30} gap={16} direction="left">
            {sortedSkills.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </Marquee>
        </MotionBox>

        {/* Skills note */}
        <MotionBox variants={itemVariants} sx={{ mt: 6 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            {t("skills.more")}
          </Typography>
        </MotionBox>
      </MotionBox>
    </SectionContainer>
  );
}
