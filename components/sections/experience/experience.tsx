"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { experiences } from "@/lib/constants/portfolio-data";
import { ExperienceCard } from "@/components/widgets";
import { FileDownIcon } from "@/components/ui/icon";
import styles from './experience.module.scss';

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.container}>
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 id="experience-heading" className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.accent} />
        </m.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Download resume CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.cta}
        >
          <p className={styles.ctaText}>{t("cta.text")}</p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
          >
            <FileDownIcon size={20} />
            {t("cta.button")}
          </a>
        </m.div>
      </div>
    </section>
  );
}
