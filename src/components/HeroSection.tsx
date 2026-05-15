"use client";

import { useEffect, useState } from "react";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ParticleBackground from "./ParticleBackground";
import type { Profile } from "@/lib/types";

const roles = [
  "Chemical Engineer",
  "ML Researcher",
  "Process Engineer",
  "Thermodynamicist",
];

export default function HeroSection({ profile }: { profile: Profile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        t = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }
    }

    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

      <motion.div
        className="max-w-3xl mx-auto px-4 text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {profile.name}
        </motion.h1>

        <motion.div
          className="h-10 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xl md:text-2xl text-accent-300 font-mono">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button size="lg" asChild className="bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/30">
            <a href="#contact">
              <Mail className="h-5 w-5 mr-2" /> Get in Touch
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-white/30 text-white hover:bg-white/10"
          >
            <a href={profile.resumeFile} download>
              <FileDown className="h-5 w-5 mr-2" /> Download Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="text-white/60 hover:text-accent-300 transition-colors">
          <ArrowDown className="h-6 w-6" />
        </a>
      </motion.div>
    </section>
  );
}
