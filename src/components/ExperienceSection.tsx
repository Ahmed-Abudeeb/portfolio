"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/types";

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
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
    <motion.div
      ref={ref}
      className="relative pl-8 border-l-2 border-accent-200"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent-500 border-2 border-white"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
      />
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
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
            <motion.li
              key={i}
              className="text-sm text-slate-600 flex gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.2 + i * 0.1 }}
            >
              <span className="text-accent-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
              {bullet}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
