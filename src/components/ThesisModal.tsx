"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

export default function ThesisModal({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </DialogDescription>
        </DialogHeader>
        <div
          className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-accent-600"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
        {project.link && (
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent-600 hover:underline"
            >
              View Full Project →
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
