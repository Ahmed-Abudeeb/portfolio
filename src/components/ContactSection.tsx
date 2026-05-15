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

      <footer className="mt-24 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
        <div className="max-w-5xl mx-auto px-4">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </div>
      </footer>
    </section>
  );
}
