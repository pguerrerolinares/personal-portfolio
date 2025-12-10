"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import type { Project } from "@/lib/constants/portfolio-data";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryIcons = {
  web: "globe",
  mobile: "smartphone",
  ai: "brain",
  automation: "bot",
  other: "folder",
};

const categoryColors = {
  web: "text-blue-500",
  mobile: "text-green-500",
  ai: "text-purple-500",
  automation: "text-orange-500",
  other: "text-gray-500",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-foreground/[0.02] border border-foreground/10 rounded-xl p-6 hover:border-accent/50 hover:bg-foreground/[0.04] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`${categoryColors[project.category]}`}>
          <Folder className="w-10 h-10" />
        </div>
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`View ${project.title} live`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-foreground/5">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-xs text-muted-foreground font-mono"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="text-xs text-muted-foreground font-mono">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>
    </motion.article>
  );
}
