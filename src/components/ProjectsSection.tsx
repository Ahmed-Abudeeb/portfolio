"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThesisModal from "./ThesisModal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Projects
        </h2>

        {featured && (
          <div
            ref={ref}
            className={cn(
              "mb-10 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Card
              className="relative border-accent-200 bg-gradient-to-br from-accent-50 to-white cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProject(featured)}
            >
              <div className="absolute top-3 right-3">
                <Badge variant="default" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Featured
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{featured.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{featured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={idx}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ThesisModal
          project={selectedProject}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="h-full cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
