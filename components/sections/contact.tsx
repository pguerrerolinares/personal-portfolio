"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { ContactCard } from "@/components/widgets";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      icon: Mail,
      label: t("info.email"),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      external: false,
    },
    {
      icon: MapPin,
      label: t("info.location"),
      value: personalInfo.location,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@pguerrerolinares",
      href: personalInfo.social.github,
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Paul Guerrero Linares",
      href: personalInfo.social.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground/[0.02]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Contact info with timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">{t("info.title")}</h3>
            <p className="text-muted-foreground text-sm">{t("info.description")}</p>
          </div>

          {/* Timeline of contact methods */}
          <div className="relative">
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
          </div>

          {/* CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-muted-foreground text-sm mt-8"
          >
            {t("cta")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
