"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import {
  skills,
  skillCategories,
  type SkillCategory,
} from "@/lib/constants/portfolio-data";
import { SkillBadge } from "@/components/widgets";
import styles from './about.module.scss';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function About() {
  const t = useTranslations("about");

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  const displayCategories: SkillCategory[] = [
    "frontend",
    "backend",
    "ai-ml",
    "devops",
  ];

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.accent} />
        </m.div>

        <div className={styles.content}>
          {/* Bio section */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={styles.bio}
          >
            <m.h3 variants={item}>{t("subtitle")}</m.h3>

            <m.p variants={item}>{t("bio.p1")}</m.p>
            <m.p variants={item}>{t("bio.p2")}</m.p>
            <m.p variants={item}>{t("bio.p3")}</m.p>

            {/* Quick stats */}
            <m.div variants={item} className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>4+</div>
                <div className={styles.statLabel}>{t("stats.years")}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{skills.length}+</div>
                <div className={styles.statLabel}>{t("stats.technologies")}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>AI/ML</div>
                <div className={styles.statLabel}>{t("stats.focus")}</div>
              </div>
            </m.div>
          </m.div>

          {/* Skills section */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.skills}
          >
            <h3>{t("skills.title")}</h3>

            {displayCategories.map((category) => (
              <div key={category} className={styles.skillCategory}>
                <h4 className={styles.categoryTitle}>
                  {skillCategories[category]}
                </h4>
                <div className={styles.skillList}>
                  {skillsByCategory[category]?.map((skill, index) => (
                    <SkillBadge key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}

            <p className={styles.statLabel}>{t("skills.more")}</p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
