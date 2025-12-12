"use client";

import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { BriefcaseIcon, CodeIcon, CalendarIcon, Building2Icon } from "@/components/ui/icon";
import type { Experience } from "@/lib/constants/portfolio-data";
import styles from './experience-card.module.scss';

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
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

function getCompanyInitials(company: string): string {
  const words = company.split(/[\s–-]+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const tCommon = useTranslations("common");
  const tExperience = useTranslations("experience.items");
  const locale = useLocale();
  const Icon = typeIcons[experience.type];

  const company = tExperience(`${experience.id}.company`);
  const role = tExperience(`${experience.id}.role`);
  const description = tExperience(`${experience.id}.description`);
  const highlights = tExperience.raw(`${experience.id}.highlights`) as string[];

  const initials = getCompanyInitials(company);

  return (
    <m.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={styles.container}
    >
      <div className={styles.timelineLine} />
      <m.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
        className={styles.timelineDot}
      />

      <div className={styles.card} tabIndex={0} role="article" aria-label={`Experience: ${role} at ${company}`}>
        <div className={`${styles.cardHeader} ${styles[experience.type]}`}>
          <div className={styles.logo}>
            {experience.type === "personal" ? (
              <Building2Icon size={24} className={styles.logoIcon} />
            ) : (
              <span className={styles.logoInitials}>{initials}</span>
            )}
          </div>

          <div className={styles.headerContent}>
            <h3 className={styles.role}>{role}</h3>
            <p className={styles.company}>{company}</p>
          </div>

          <span className={`${styles.typeBadge} ${styles[experience.type]}`}>
            <Icon size={12} />
            {tCommon(`experienceTypes.${experience.type}`)}
          </span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.date}>
            <CalendarIcon size={16} />
            <span>
              {formatDate(experience.startDate, locale)} —{" "}
              {experience.endDate ? formatDate(experience.endDate, locale) : tCommon("present")}
            </span>
          </div>

          <p className={styles.description}>{description}</p>

          {highlights.length > 0 && (
            <ul className={styles.highlights}>
              {highlights.map((highlight, i) => (
                <li key={i} className={styles.highlight}>
                  <span className={styles.highlightBullet}>•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.technologies}>
            {experience.technologies.map((tech) => (
              <span key={tech} className={styles.tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}
