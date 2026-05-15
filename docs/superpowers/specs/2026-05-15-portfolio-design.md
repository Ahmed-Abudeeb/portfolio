# Chemical Engineering Portfolio — Design Spec

## Overview

A professional single-page portfolio website for a recent Chemical Engineering graduate (BS + MS). The site presents the candidate as a well-rounded industry-ready engineer, with their MS thesis ("Developing an EOS for Lennard Jones using ML and symbolic regression") as a featured project. Everything is driven by a file-based CMS (`content/`) so text changes never require touching code.

## Architecture

- **Framework:** Next.js 14 (App Router), SSG export for Vercel
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Button, Card, Dialog/Modal, Input, Badge, Avatar)
- **Content parsing:** gray-matter + marked for .md; js-yaml for .yaml
- **Animations:** react-intersection-observer for scroll-triggered fade-ins
- **Markdown rendering:** @tailwindcss/typography (prose classes for thesis modal)

## Page Structure (Single Page, 6 Sections)

| Section | Element | Content Source |
|---------|---------|----------------|
| **Navbar** | Fixed top bar with smooth-scroll links + Resume download | — |
| **Hero** | Name, title, tagline, profile photo, CTA buttons, animated CSS background | `profile.yaml` |
| **About** | 2-3 paragraph bio, stats bar (degrees, publications, years) | `profile.yaml` |
| **Experience** | Reverse-chronological timeline of roles | `experience.yaml` |
| **Projects** | Card grid (4-6 projects), thesis spotlight card with badge | `projects.yaml` + `projects/*.md` |
| **Skills** | Categorized tag cloud (technical, lab/process, soft) | `skills.yaml` |
| **Contact** | Form + email link + social icons + footer | `contact.yaml` + `profile.yaml` |

### Thesis Spotlight
The MS thesis card has a visual "Featured" badge. Clicking opens a full-page `Dialog` (shadcn) rendering the full `.md` writeup — abstract, methodology, results, links to paper/code.

## Component Tree

```
layout.tsx
├── Navbar (fixed, smooth-scroll, hamburger on mobile)
├── HeroSection
│   ├── AnimatedBackground (CSS-only particles/gradient)
│   ├── Avatar (profile photo)
│   ├── name + tagline (from profile.yaml)
│   └── CTA buttons (Contact scroll, Resume download)
├── AboutSection
│   ├── bio paragraphs
│   └── StatsBar (3-4 key metrics)
├── ExperienceSection
│   └── TimelineCard[] (icon, role, company, dates, bullet list)
├── ProjectsSection
│   ├── ProjectCard[] (title, description, tags, link)
│   ├── ThesisSpotlightCard (featured badge, links to modal)
│   └── ThesisModal (full shadcn Dialog, renders MDX content)
├── SkillsSection
│   └── SkillCategory[] (category name → Badge[] tags)
├── ContactSection
│   ├── ContactForm (name, email, message)
│   └── SocialLinks (email, LinkedIn, GitHub, Google Scholar)
└── Footer
```

## Data Flow

```
content/*.yaml, content/projects/*.md
    ↓  fs.readFileSync at build time
lib/content-loader.ts  (typed loader functions)
    ↓  typed objects
page.tsx (server component) → passes as props to section components
```

All content is loaded at **build time** via `fs` in server components. Output is fully static HTML — zero runtime data fetching.

## CMS Content Structure

```
content/
  profile.yaml              # name, title, tagline, bio[], photo, resumeFile, socials
  experience.yaml           # [{ company, role, location, startDate, endDate, bullets[] }]
  education.yaml            # [{ school, degree, field, year, thesis? }]
  skills.yaml               # [{ category, items[] }]
  projects.yaml             # [{ slug, title, description, tags[], featured?, link }]
  projects/
    thesis-eos-ml.md        # Full markdown: abstract, methodology, results, conclusion
    project-2.md
    ...
  contact.yaml              # email, locationText
```

## Visual Design

- **Colors:** White background, slate-900 text, accent teal-500 (CTAs, badges, hover states)
- **Typography:** Inter (body), font-bold for headings, max-w-prose constrained text
- **Spacing:** Generous padding (py-24 sections), max-w-5xl container
- **Animations:** Subtle fade-in-up on scroll via IntersectionObserver
- **Responsive:** Mobile-first; cards go 1-col → 2-col → 3-col

## Deployment

- `next build` produces static export
- Deploy on Vercel via `vercel --prod`
- No environment variables needed (fully static)

## Out of Scope

- Blog / writing section
- Authentication
- Database or API routes
- Analytics (can be added later via Vercel Analytics)
- Dark mode toggle (single theme keeps it simple and production-ready)
