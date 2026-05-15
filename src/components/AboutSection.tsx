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
