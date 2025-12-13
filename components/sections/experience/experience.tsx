"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import { experiences } from "@/lib/constants/portfolio-data";
import { ExperienceCard } from "@/components/widgets";
import DownloadIcon from '@mui/icons-material/Download';

export function Experience() {
  const t = useTranslations("experience");

  return (
    <Box
      component="section"
      id="experience"
      aria-labelledby="experience-heading"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="xl">
        {/* Section header */}
        <Box
          component={m.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6, textAlign: 'center' }}
        >
          <Typography
            id="experience-heading"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t("title")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {t("subtitle")}
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              bgcolor: 'primary.main',
              borderRadius: 2,
              mx: 'auto',
            }}
          />
        </Box>

        {/* Timeline */}
        <Box sx={{ maxWidth: 900, mx: 'auto', mb: 6 }}>
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
            p: 4,
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
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
      </Container>
    </Box>
  );
}
