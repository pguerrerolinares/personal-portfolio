"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { ContactCard } from "./contact-card";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionTitle, SectionSubtitle } from "@/components/ui/section-title";
import { MailIcon, GithubIcon, LinkedinIcon, MapPinIcon } from "@/components/ui/icon";
import { h, map } from "@/lib/react-helpers";

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

  return h(SectionContainer, {
    id: "contact",
    bgcolor: "paper",
    'data-component': "Contact",
    children: [
      h(SectionTitle, {
        key: 'section-title',
        id: "contact-heading",
        subtitle: t("subtitle")
      }, t("title")),

      // Contact info with timeline
      h(Box, {
        key: 'content',
        component: motion.div,
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        sx: { maxWidth: 700, mx: 'auto' },
        children: [
          // Timeline of contact methods
          h(Box, {
            key: 'contact-items',
            children: map(contactItems, (item, index) =>
              h(ContactCard, {
                key: item.label,
                icon: item.icon,
                label: item.label,
                value: item.value,
                href: item.href,
                external: item.external,
                index
              })
            )
          }),

          // CTA
          h(Typography, {
            key: 'cta',
            component: motion.p,
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.4 },
            variant: "body1",
            color: "text.secondary",
            sx: { mt: { xs: 4, md: 6 }, textAlign: 'center', fontStyle: 'italic' }
          }, t("cta"))
        ]
      })
    ]
  });
}
