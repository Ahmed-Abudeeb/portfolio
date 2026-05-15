# Portfolio Website Implementation Plan

> **For agentic workers:** Tasks use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, deployable single-page Chemical Engineering portfolio with a file-based CMS.

**Architecture:** Next.js 14 App Router with SSG. All content loaded at build time from `content/` YAML/MD files. shadcn/ui for components. Tailwind for styling.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, gray-matter, js-yaml, marked, @tailwindcss/typography, react-intersection-observer

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `D:\GitHub\Website\package.json`
- Create: `D:\GitHub\Website\tsconfig.json`
- Create: `D:\GitHub\Website\next.config.ts`
- Create: `D:\GitHub\Website\tailwind.config.ts`
- Create: `D:\GitHub\Website\postcss.config.js`
- Create: `D:\GitHub\Website\components.json`
- Create: `D:\GitHub\Website\src\app\globals.css`
- Create: `D:\GitHub\Website\src\app\layout.tsx`
- Create: `D:\GitHub\Website\public\images\.gitkeep`

- [ ] **Step 1: Create package.json with all dependencies**

```json
{
  "name": "cheme-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0",
    "marked": "^12.0.0",
    "react-intersection-observer": "^9.10.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-visually-hidden": "^1.0.3"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/js-yaml": "^4.0.9",
    "@types/gray-matter": "^4.0.4",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@tailwindcss/typography": "^0.5.12",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: Create tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

- [ ] **Step 5: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create components.json for shadcn**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": false
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

- [ ] **Step 7: Create globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
}

@layer base {
  body {
    @apply bg-white text-slate-900 font-sans antialiased;
  }
}
```

- [ ] **Step 8: Create initial layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chemical Engineer | Portfolio",
  description: "Professional portfolio of a Chemical Engineering graduate with BS and MS degrees",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Run npm install**

```bash
cd D:\GitHub\Website && npm install
```

---

### Task 2: Create lib utilities

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/types.ts`
- Create: `src/lib/content-loader.ts`

- [ ] **Step 1: Create src/lib/utils.ts** (shadcn utility)

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create src/lib/types.ts**

```ts
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  photo: string;
  resumeFile: string;
  stats: { label: string; value: string }[];
  socials: { linkedin: string; github: string; email: string; googleScholar?: string };
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
  thesis?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  link?: string;
}

export interface Project extends ProjectMeta {
  content: string;
}

export interface Contact {
  email: string;
  locationText: string;
}
```

- [ ] **Step 3: Create src/lib/content-loader.ts**

```ts
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
```

---

### Task 3: Create all content files

**Files:**
- Create: `content/profile.yaml`
- Create: `content/experience.yaml`
- Create: `content/education.yaml`
- Create: `content/skills.yaml`
- Create: `content/projects.yaml`
- Create: `content/contact.yaml`
- Create: `content/projects/thesis-eos-ml.md`
- Create: `content/projects/bioreactor-optimization.md`
- Create: `content/projects/process-simulation-pid.md`
- Create: `content/projects/polymer-reactor-design.md`

- [ ] **Step 1: Create content/profile.yaml**

```yaml
name: Ahmed Abudeeb
title: "MS in Chemical Engineering"
tagline: "Bridging molecular simulation and machine learning to solve real-world chemical engineering challenges"
photo: /images/profile.jpg
resumeFile: /resume.pdf
bio:
  - "Dedicated chemical engineer with a Master of Science degree and a passion for combining computational modeling with experimental insight. My graduate research focused on developing a novel equation of state for Lennard-Jones fluids using machine learning and symbolic regression — work that sits at the intersection of thermodynamics, molecular simulation, and data science."
  - "Beyond research, I bring hands-on experience in process simulation, reactor design, and bioprocess engineering. I thrive in collaborative environments where complex problems require both deep domain knowledge and creative, data-driven approaches. I am excited to apply my skills to advance sustainable energy, materials design, and process innovation."
stats:
  - label: "Degrees"
    value: "B.S. + M.S."
  - label: "Thesis"
    value: "ML + Symbolic Regression"
  - label: "Fields"
    value: "ChemE + ML"
  - label: "Focus"
    value: "Thermodynamics"
socials:
  linkedin: https://linkedin.com/in/ahmed-abudeeb
  github: https://github.com/ahmedabudeeb
  email: ahmed.abudeeb@example.com
```

- [ ] **Step 2: Create content/experience.yaml**

```yaml
- company: "Department of Chemical Engineering, University"
  role: "Graduate Research Assistant"
  location: "University Lab"
  startDate: "Sep 2023"
  endDate: "May 2026"
  bullets:
    - "Developed a machine learning-driven equation of state for Lennard-Jones fluids using symbolic regression (PySR) and molecular simulation data"
    - "Processed and analyzed large-scale molecular dynamics datasets to train regression models predicting thermodynamic properties"
    - "Authored a master's thesis and presented findings at departmental symposiums"

- company: "Chemical Plant Co."
  role: "Process Engineering Intern"
  location: "Industrial City"
  startDate: "Jun 2024"
  endDate: "Aug 2024"
  bullets:
    - "Assisted in optimizing a distillation column train, reducing energy consumption by 12% through reboiler duty tuning"
    - "Developed Aspen Plus simulation models to evaluate alternative process configurations"
    - "Collaborated with cross-functional teams on process hazard analysis (PHA) reviews"

- company: "University Department"
  role: "Undergraduate Teaching Assistant"
  location: "University"
  startDate: "Sep 2022"
  endDate: "Dec 2022"
  bullets:
    - "Led tutorial sessions for Thermodynamics and Fluid Mechanics courses (50+ students)"
    - "Designed problem sets and grading rubrics; provided individualized student support"
```

- [ ] **Step 3: Create content/education.yaml**

```yaml
- school: "University Name"
  degree: "Master of Science"
  field: "Chemical Engineering"
  year: "2026"
  thesis: "Developing an equation of state for Lennard Jones fluids using machine learning and symbolic regression"

- school: "University Name"
  degree: "Bachelor of Science"
  field: "Chemical Engineering"
  year: "2024"
```

- [ ] **Step 4: Create content/skills.yaml**

```yaml
- category: "Process & Simulation"
  items:
    - "Aspen Plus"
    - "Aspen HYSYS"
    - "MATLAB/Simulink"
    - "COMSOL Multiphysics"
    - "ANSYS Fluent"

- category: "Programming & ML"
  items:
    - "Python"
    - "PyTorch"
    - "scikit-learn"
    - "PySR (Symbolic Regression)"
    - "Pandas / NumPy"
    - "LAMMPS (MD Simulation)"

- category: "Lab & Process"
  items:
    - "Process Hazard Analysis"
    - "Distillation Design"
    - "Reactor Engineering"
    - "Heat & Mass Transfer"
    - "Bioprocess Engineering"
```

- [ ] **Step 5: Create content/projects.yaml**

```yaml
- slug: thesis-eos-ml
  title: "ML-Driven Equation of State for Lennard-Jones Fluids"
  description: "Developed a novel EOS using molecular dynamics simulation data and symbolic regression to accurately predict thermodynamic properties across a wide phase space."
  tags:
    - "Machine Learning"
    - "Molecular Simulation"
    - "Thermodynamics"
    - "Python"
  featured: true

- slug: bioreactor-optimization
  title: "Bioreactor Yield Optimization"
  description: "Modeled and optimized a continuous stirred-tank bioreactor for maximum product yield using kinetic parameter estimation and sensitivity analysis."
  tags:
    - "Bioprocess"
    - "MATLAB"
    - "Optimization"

- slug: process-simulation-pid
  title: "PID-Tuned Distillation Column Simulation"
  description: "Designed and simulated a feedback control system for a binary distillation column in Aspen Plus, achieving 99.2% purity spec under feed disturbances."
  tags:
    - "Process Control"
    - "Aspen Plus"
    - "PID"

- slug: polymer-reactor-design
  title: "Polymerization Reactor Design Project"
  description: "Designed a 10,000-ton/year CSTR train for free-radical polymerization including catalyst selection, heat removal, and economic analysis."
  tags:
    - "Reactor Design"
    - "Polymerization"
    - "Economics"
```

- [ ] **Step 6: Create content/contact.yaml**

```yaml
email: ahmed.abudeeb@example.com
locationText: "City, Country (Open to Relocation)"
```

- [ ] **Step 7: Create content/projects/thesis-eos-ml.md**

```markdown
---
title: "ML-Driven Equation of State for Lennard-Jones Fluids"
tags: [Machine Learning, Molecular Simulation, Thermodynamics, Python]
---

## Abstract

Equations of state (EOS) are fundamental tools in chemical engineering for predicting the thermodynamic behavior of fluids. Traditional EOS models rely on empirical parameter fitting, which often fails to capture complex molecular interactions. This thesis presents a data-driven approach to developing an accurate and interpretable EOS for Lennard-Jones fluids using machine learning and symbolic regression.

## Methodology

1. **Data Generation:** Performed large-scale molecular dynamics simulations using LAMMPS across a grid of reduced temperatures (T* = 0.7–6.0) and densities (ρ* = 0.05–1.2), generating >10,000 state points.
2. **Feature Engineering:** Extracted virial coefficients, radial distribution function features, and thermodynamic response functions as input descriptors.
3. **Modeling:** Applied PySR (Symbolic Regression) to discover compact mathematical expressions relating pressure, density, and temperature. Benchmarking against Peng-Robinson and SAFT EOS models.

## Key Results

- Discovered a novel closed-form EOS expression with only 8 parameters that matches MD simulation data within 2.5% AAD across the entire fluid region
- Outperformed Peng-Robinson EOS by 40% in the supercritical region
- The symbolic expression reveals physically interpretable temperature-density coupling terms not captured by classical EOS forms

## Impact

This work demonstrates that symbolic regression can discover physically meaningful thermodynamic relationships from simulation data — opening the door to automated EOS development for complex fluids where theoretical models are unavailable.

## Links

- [Thesis PDF (placeholder)](#)
- [GitHub Repository (placeholder)](https://github.com)
```

- [ ] **Step 8: Create content/projects/bioreactor-optimization.md**

```markdown
---
title: "Bioreactor Yield Optimization"
tags: [Bioprocess, MATLAB, Optimization]
---

## Overview

Designed and optimized a continuous stirred-tank bioreactor (CSTR) for monoclonal antibody production. Used kinetic parameter estimation from experimental data and multi-objective optimization to maximize product yield while minimizing byproduct formation.

## Approach

- Developed a kinetic model incorporating cell growth, substrate consumption, and product formation kinetics
- Estimated Monod kinetic parameters via nonlinear least-squares regression against batch experimental data
- Applied sequential quadratic programming (SQP) to find optimal dilution rate and feed substrate concentration

## Results

- Identified operating conditions yielding a 34% improvement in volumetric productivity
- Validated predictions with steady-state experiments showing <5% deviation
```

- [ ] **Step 9: Create content/projects/process-simulation-pid.md**

```markdown
---
title: "PID-Tuned Distillation Column Simulation"
tags: [Process Control, Aspen Plus, PID]
---

## Overview

Designed a feedback control system for a binary ethanol-water distillation column in Aspen Plus Dynamics. The objective was to maintain top product purity above 99 mol% despite ±15% feed composition disturbances.

## Approach

- Steady-state design in Aspen Plus with 30 sieve trays and a partial condenser
- Pressure-compensated temperature control on tray 22 for inferential composition control
- Tuned PID controller using Ziegler-Nichols and refined via IMC-based tuning

## Results

- Achieved 99.2% purity with <2% offset under worst-case disturbances
- Settling time under 12 minutes for feed composition step changes
```

- [ ] **Step 10: Create content/projects/polymer-reactor-design.md**

```markdown
---
title: "Polymerization Reactor Design Project"
tags: [Reactor Design, Polymerization, Economics]
---

## Overview

Capstone design project: a 10,000 ton/year free-radical polymerization facility for polystyrene production. Covered reactor sizing, heat transfer, catalyst selection, and full economic analysis.

## Approach

- Designed a CSTR train with interstage cooling for temperature control
- Selected benzoyl peroxide initiator based on half-life matching at reaction temperature
- Sized heat exchangers for removal of 2.8 MW of polymerization heat

## Results

- Capital cost estimate: $14.2M with 22% ROI and 4.5-year payback period
- Final report included P&ID, HAZOP review, and equipment specification sheets
```

---

### Task 4: Create shadcn UI components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/avatar.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/label.tsx`

- [ ] **Step 1: Create src/components/ui/button.tsx**

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-slate-200 bg-white hover:bg-slate-50",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100",
        link: "text-accent-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 2: Create src/components/ui/card.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border border-slate-200 bg-white shadow-sm", className)} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

- [ ] **Step 3: Create src/components/ui/dialog.tsx**

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl max-h-[85vh] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
```

- [ ] **Step 4: Create src/components/ui/badge.tsx**

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent-100 text-accent-800",
        secondary: "border-transparent bg-slate-100 text-slate-800",
        outline: "text-slate-600",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

- [ ] **Step 5: Create src/components/ui/avatar.tsx**

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string; fallback?: string }
>(({ className, src, alt, fallback, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100", className)}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt || ""} className="aspect-square h-full w-full object-cover" />
    ) : (
      <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-500">
        {fallback || "?"}
      </span>
    )}
  </div>
));
Avatar.displayName = "Avatar";

export { Avatar };
```

- [ ] **Step 6: Create src/components/ui/input.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
```

- [ ] **Step 7: Create src/components/ui/textarea.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
```

- [ ] **Step 8: Create src/components/ui/label.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
```

---

### Task 5: Build all section components

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/AboutSection.tsx`
- Create: `src/components/ExperienceSection.tsx`
- Create: `src/components/ProjectsSection.tsx`
- Create: `src/components/ThesisModal.tsx`
- Create: `src/components/SkillsSection.tsx`
- Create: `src/components/ContactSection.tsx`

- [ ] **Step 1: Create src/components/Navbar.tsx**

```tsx
"use client";

import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold text-slate-900">
          AA<span className="text-accent-600">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-slate-600 hover:text-accent-600 transition-colors"
            >
              {s.label}
            </a>
          ))}
          <Button variant="outline" size="sm" asChild>
            <a href="/resume.pdf" download>
              <FileDown className="h-4 w-4 mr-1" /> Resume
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-80 border-t border-slate-100" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-3 bg-white">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="text-sm text-slate-600 hover:text-accent-600 py-1"
            >
              {s.label}
            </a>
          ))}
          <Button variant="outline" size="sm" asChild className="w-fit">
            <a href="/resume.pdf" download>
              <FileDown className="h-4 w-4 mr-1" /> Resume
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create src/components/HeroSection.tsx**

```tsx
"use client";

import { ArrowDown, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-white to-slate-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-4">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-accent-600 font-medium mb-2">
          {profile.title}
        </p>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          {profile.tagline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#contact">
              <Mail className="h-5 w-5 mr-2" /> Get in Touch
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={profile.resumeFile} download>
              <FileDown className="h-5 w-5 mr-2" /> Download Resume
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-accent-600 transition-colors animate-bounce"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  );
}
```

- [ ] **Step 3: Create src/components/AboutSection.tsx**

```tsx
"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default function AboutSection({ profile }: { profile: Profile }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          About <span className="text-accent-600">Me</span>
        </h2>
        <div
          ref={ref}
          className={cn(
            "space-y-4 text-lg text-slate-600 leading-relaxed max-w-3xl transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="text-2xl font-bold text-accent-600">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create src/components/ExperienceSection.tsx**

```tsx
"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/types";

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-8 border-l-2 border-accent-200 transition-all duration-500",
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent-500 border-2 border-white" />
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{exp.role}</h3>
            <p className="text-accent-600 font-medium">{exp.company}</p>
          </div>
          <div className="text-sm text-slate-400 mt-1 md:mt-0">
            {exp.startDate} — {exp.endDate} · {exp.location}
          </div>
        </div>
        <ul className="space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-slate-600 flex gap-2">
              <span className="text-accent-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create src/components/ProjectsSection.tsx**

```tsx
"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

        {/* Featured thesis card */}
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

        {/* Other projects grid */}
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
```

- [ ] **Step 6: Create src/components/ThesisModal.tsx**

```tsx
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
```

- [ ] **Step 7: Create src/components/SkillsSection.tsx**

```tsx
"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/lib/types";

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Skills &amp; Tools
        </h2>
        <div
          ref={ref}
          className={cn(
            "grid md:grid-cols-3 gap-8 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {skills.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Badge key={item} variant="outline" className="text-sm py-1">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Create src/components/ContactSection.tsx**

```tsx
"use client";

import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Profile, Contact } from "@/lib/types";

export default function ContactSection({
  profile,
  contact,
}: {
  profile: Profile;
  contact: Contact;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Get in <span className="text-accent-600">Touch</span>
        </h2>
        <div
          ref={ref}
          className={cn(
            "grid md:grid-cols-2 gap-12 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Contact info */}
          <div className="space-y-6">
            <p className="text-lg text-slate-600">
              Interested in collaborating, hiring, or discussing research? Feel free to reach out.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="h-5 w-5 text-accent-500" />
                <a href={`mailto:${contact.email}`} className="hover:text-accent-600 transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="h-5 w-5 text-accent-500" />
                <span>{contact.locationText}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact form (static / placeholder) */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-input">Email</Label>
                <Input id="email-input" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell me about your interest..." />
            </div>
            <Button className="w-full">Send Message</Button>
            <p className="text-xs text-slate-400 text-center">
              Form is a demo. Reach out directly via email above.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
        <div className="max-w-5xl mx-auto px-4">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </div>
      </footer>
    </section>
  );
}
```

---

### Task 6: Wire up page.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite src/app/page.tsx**

```tsx
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import {
  loadProfile,
  loadExperience,
  loadSkills,
  loadContact,
  loadAllProjects,
} from "@/lib/content-loader";

export default function HomePage() {
  const profile = loadProfile();
  const experience = loadExperience();
  const skills = loadSkills();
  const contact = loadContact();
  const projects = loadAllProjects();

  return (
    <main>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ContactSection profile={profile} contact={contact} />
    </main>
  );
}
```

- [ ] **Step 2: Add Navbar to layout.tsx**

Modify `src/app/layout.tsx` to include Navbar:

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chemical Engineer | Portfolio",
  description: "Professional portfolio of a Chemical Engineering graduate with BS and MS degrees",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

---

### Task 7: Build and verify

**Files:**
- None (build step)

- [ ] **Step 1: Add next-env.d.ts**

Create `D:\GitHub\Website\next-env.d.ts`:
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 2: Run build**

```bash
cd D:\GitHub\Website && npm run build
```

Expected: Successful build with no errors. Static export in `out/` directory.
