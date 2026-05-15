"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SkillCategory } from "@/lib/types";

const skillLevels: Record<string, number> = {
  Python: 90,
  MATLAB: 85,
  "Machine Learning": 80,
  "Symbolic Regression": 75,
  "Kinetic Modeling": 85,
  "Data Analysis": 80,
  "Aspen Plus": 80,
  "MATLAB/Simulink": 85,
  "Process Simulation": 80,
  "FCC Catalyst Testing": 75,
  Gasification: 70,
  Thermodynamics: 90,
  "Reaction Kinetics": 85,
  "Heat & Mass Transfer": 80,
  "CO₂ Capture Technologies": 80,
  "Fuel Cells & Batteries": 75,
  "Renewable Energy Systems": 80,
};

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100/40 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills &amp; Tools
        </motion.h2>
        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((category, ci) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.5 }}
            >
              <h3 className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-4">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <SkillBar key={item} name={item} level={skillLevels[item] || 70} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, inView }: { name: string; level: number; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700 font-medium">{name}</span>
        <span className="text-slate-400">{level}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
