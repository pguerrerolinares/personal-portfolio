"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, SmartphoneIcon, BrainIcon, BotIcon, FolderIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/constants/portfolio-data";
import styles from './project-card.module.scss';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryIcons = {
  web: GlobeIcon,
  mobile: SmartphoneIcon,
  ai: BrainIcon,
  automation: BotIcon,
  other: FolderIcon,
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations("projects.items");
  const CategoryIcon = categoryIcons[project.category];

  const title = t(`${project.id}.title`);
  const description = t(`${project.id}.description`);

  return (
    <m.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={styles.card}
      tabIndex={0}
      role="article"
      aria-label={`Project: ${title}`}
    >
      {/* Image/Gradient Header */}
      <div className={`${styles.imageHeader} ${styles[project.category]}`}>
        <div className={styles.pattern} />
        <m.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`${styles.categoryIcon} ${styles[project.category]}`}
        >
          <CategoryIcon size={48} />
        </m.div>
        <div className={styles.hoverOverlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.links}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`View ${title} on GitHub`}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`View ${title} live`}
              >
                <ExternalLinkIcon size={16} />
              </a>
            )}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.technologies}>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="default" size="sm">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </div>
    </m.article>
  );
}
