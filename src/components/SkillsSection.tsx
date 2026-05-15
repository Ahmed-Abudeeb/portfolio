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
