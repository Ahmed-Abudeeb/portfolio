"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#"
          className={cn(
            "text-lg font-bold transition-colors",
            scrolled ? "text-slate-900" : "text-white"
          )}
        >
          AA<span className="text-accent-400">.</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "text-sm transition-colors",
                scrolled
                  ? "text-slate-600 hover:text-accent-600"
                  : "text-white/80 hover:text-white"
              )}
            >
              {s.label}
            </a>
          ))}
          <Button
            variant={scrolled ? "outline" : "secondary"}
            size="sm"
            asChild
          >
            <a href="/resume.pdf" download>
              <FileDown className="h-4 w-4 mr-1" /> Resume
            </a>
          </Button>
        </div>

        <button
          className={cn("md:hidden p-2", !scrolled && "text-white")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

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
