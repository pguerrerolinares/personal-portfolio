"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/constants/portfolio-data";
import { ContactCard } from "@/components/widgets";
import { MailIcon, GithubIcon, LinkedinIcon, MapPinIcon } from "@/components/ui/icon";
import styles from './contact.module.scss';

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
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.accent} />
        </motion.div>

        {/* Contact info with timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.contactContainer}
        >
          <h3 className={styles.infoTitle}>{t("info.title")}</h3>
          <p className={styles.infoDescription}>{t("info.description")}</p>

          {/* Timeline of contact methods */}
          <div className={styles.timeline}>
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
            className={styles.cta}
          >
            {t("cta")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
