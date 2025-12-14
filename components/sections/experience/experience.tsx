"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { experiences } from "@/lib/constants/portfolio-data";
import { ExperienceCard } from "@/components/widgets";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle } from "@/components/ui/section-title";
import DownloadIcon from '@mui/icons-material/Download';

export function Experience() {
  const t = useTranslations("experience");

  return (
    <SectionContainer id="experience">
      <SectionTitle id="experience-heading" subtitle={t("subtitle")}>
        {t("title")}
      </SectionTitle>

      {/* Timeline */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: { xs: 6, md: 8 } }}>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
          />
        ))}
      </Box>

      {/* Download resume CTA */}
      <Box
        component={m.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          textAlign: 'center',
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          bgcolor: 'action.hover',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t("cta.text")}
        </Typography>
        <Button
          component="a"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<DownloadIcon />}
          size="large"
        >
          {t("cta.button")}
        </Button>
      </Box>
    </SectionContainer>
  );
}
