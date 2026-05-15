"use client";

import { ArrowDown, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-accent-600 transition-colors animate-bounce"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  );
}
