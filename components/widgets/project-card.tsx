"use client";

import { motion } from "framer-motion";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, SmartphoneIcon, BrainIcon, BotIcon, FolderIcon } from "@/components/ui/icon";
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
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={styles.card}
    >
      {/* Image/Gradient Header */}
      <div className={`${styles.imageHeader} ${styles[project.category]}`}>
        <div className={styles.pattern} />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`${styles.categoryIcon} ${styles[project.category]}`}
        >
          <CategoryIcon size={48} />
        </motion.div>
        <div className={styles.hoverOverlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.links}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`View ${project.title} on GitHub`}
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
                aria-label={`View ${project.title} live`}
              >
                <ExternalLinkIcon size={16} />
              </a>
            )}
          </div>
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.technologies}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className={styles.tech}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={styles.tech}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
