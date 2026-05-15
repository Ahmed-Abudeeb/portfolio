import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import matter from "gray-matter";
import { marked } from "marked";
import type { Profile, Experience, Education, SkillCategory, ProjectMeta, Project, Contact } from "./types";

const contentDir = path.join(process.cwd(), "content");

function readYaml<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return yaml.load(raw) as T;
}

export function loadProfile(): Profile {
  return readYaml<Profile>(path.join(contentDir, "profile.yaml"));
}

export function loadExperience(): Experience[] {
  return readYaml<Experience[]>(path.join(contentDir, "experience.yaml"));
}

export function loadEducation(): Education[] {
  return readYaml<Education[]>(path.join(contentDir, "education.yaml"));
}

export function loadSkills(): SkillCategory[] {
  return readYaml<SkillCategory[]>(path.join(contentDir, "skills.yaml"));
}

export function loadProjectsMeta(): ProjectMeta[] {
  return readYaml<ProjectMeta[]>(path.join(contentDir, "projects.yaml"));
}

export function loadContact(): Contact {
  return readYaml<Contact>(path.join(contentDir, "contact.yaml"));
}

export function loadProjectContent(slug: string): Project | null {
  const filePath = path.join(contentDir, "projects", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const projects = loadProjectsMeta();
  const meta = projects.find((p) => p.slug === slug);
  if (!meta) return null;
  return {
    ...meta,
    content: marked.parse(content) as string,
  };
}

export function loadAllProjects(): Project[] {
  const projects = loadProjectsMeta();
  return projects
    .map((p) => loadProjectContent(p.slug))
    .filter((p): p is Project => p !== null);
}
