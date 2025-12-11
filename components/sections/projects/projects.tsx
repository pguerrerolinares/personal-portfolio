"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { projects } from "@/lib/constants/portfolio-data";
import { ProjectCard } from "@/components/widgets";
import styles from './projects.module.scss';

export function Projects() {
  const t = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.section}>
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
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.accent} />
        </m.div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <div>
            <m.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.featuredLabel}
            >
              {t("featured")}
            </m.h3>
            <div className={styles.featuredGrid}>
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <div>
            <m.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.otherLabel}
            >
              {t("other")}
            </m.h3>
            <div className={styles.otherGrid}>
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to action */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.cta}
        >
          <p className={styles.ctaText}>{t("cta.text")}</p>
          <a
            href="https://github.com/pguerrerolinares"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
          >
            {t("cta.button")}
          </a>
        </m.div>
      </div>
    </section>
  );
}
