"use client";

import { motion } from "framer-motion";
import { ExternalLinkIcon, GithubIcon, GlobeIcon, SmartphoneIcon, BrainIcon, BotIcon, FolderIcon } from "@/components/ui/icon";
import type { Project } from "@/lib/constants/portfolio-data";

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

const categoryGradients = {
  web: "from-blue-500/20 to-cyan-500/20",
  mobile: "from-green-500/20 to-emerald-500/20",
  ai: "from-purple-500/20 to-pink-500/20",
  automation: "from-orange-500/20 to-amber-500/20",
  other: "from-gray-500/20 to-slate-500/20",
};

const categoryColors = {
  web: "text-blue-500",
  mobile: "text-green-500",
  ai: "text-purple-500",
  automation: "text-orange-500",
  other: "text-gray-500",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-foreground/[0.02] border border-foreground/10 rounded-xl overflow-hidden hover:border-accent/50 hover:bg-foreground/[0.04] transition-all duration-300"
    >
      {/* Image/Gradient Header */}
      <div
        className={`relative h-32 bg-gradient-to-br ${categoryGradients[project.category]} flex items-center justify-center overflow-hidden`}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Category icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`relative z-10 ${categoryColors[project.category]}`}
        >
          <CategoryIcon size={48} />
        </motion.div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Header with links */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
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
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={`View ${project.title} live`}
              >
                <ExternalLinkIcon size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-foreground/5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 bg-foreground/5 text-muted-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-0.5 bg-foreground/5 text-muted-foreground rounded-full">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
