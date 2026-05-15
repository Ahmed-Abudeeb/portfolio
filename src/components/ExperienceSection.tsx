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
