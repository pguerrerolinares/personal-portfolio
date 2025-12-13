"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { ContactCard } from "@/components/widgets";
import { MailIcon, GithubIcon, LinkedinIcon, MapPinIcon } from "@/components/ui/icon";

export function Contact() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      icon: MailIcon,
      label: t("info.email"),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      external: false,
    },
    {
      icon: MapPinIcon,
      label: t("info.location"),
      value: personalInfo.location,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "@pguerrerolinares",
      href: personalInfo.social.github,
      external: true,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "Paul Guerrero Linares",
      href: personalInfo.social.linkedin,
      external: true,
    },
  ];

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-heading"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
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
            id="contact-heading"
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

        {/* Contact info with timeline */}
        <Box
          component={m.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ maxWidth: 700, mx: 'auto' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
            {t("info.title")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            {t("info.description")}
          </Typography>

          {/* Timeline of contact methods */}
          <Box>
            {contactItems.map((item, index) => (
              <ContactCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
                external={item.external}
                index={index}
              />
            ))}
          </Box>

          {/* CTA */}
          <Typography
            component={m.p}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variant="body1"
            color="text.secondary"
            sx={{ mt: 4, textAlign: 'center', fontStyle: 'italic' }}
          >
            {t("cta")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
