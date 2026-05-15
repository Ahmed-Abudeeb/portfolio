"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

function Counter({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  return (
    <motion.div
      className="text-center p-6 rounded-xl bg-slate-50 border border-slate-100"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-2xl font-bold text-accent-600"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </motion.div>
  );
}

export default function AboutSection({ profile }: { profile: Profile }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-accent-50/30 to-white -z-10" />
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-accent-600">Me</span>
        </motion.h2>

        <div
          ref={ref}
          className={cn(
            "space-y-4 text-lg text-slate-600 leading-relaxed max-w-3xl transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {profile.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {profile.stats.map((stat) => (
            <Counter key={stat.label} value={stat.value} label={stat.label} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
