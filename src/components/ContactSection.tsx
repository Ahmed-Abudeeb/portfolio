"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Profile, Contact } from "@/lib/types";

export default function ContactSection({
  profile,
  contact,
}: {
  profile: Profile;
  contact: Contact;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-50/30 to-transparent -z-10" />
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in <span className="text-accent-600">Touch</span>
        </motion.h2>

        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-slate-600">
              Interested in collaborating, hiring, or discussing research? Feel free to reach out.
            </p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 text-slate-600 group">
                <div className="p-2 rounded-lg bg-accent-50 group-hover:bg-accent-100 transition-colors">
                  <Mail className="h-5 w-5 text-accent-500" />
                </div>
                <a href={`mailto:${contact.email}`} className="hover:text-accent-600 transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-600 group">
                <div className="p-2 rounded-lg bg-accent-50 group-hover:bg-accent-100 transition-colors">
                  <MapPin className="h-5 w-5 text-accent-500" />
                </div>
                <span>{contact.locationText}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-input">Email</Label>
                <Input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Tell me about your interest..."
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" /> {sent ? "Message Ready!" : "Send Message"}
              </Button>
            </motion.div>
            <p className="text-xs text-slate-400 text-center">
              {sent
                ? "Your email client will open with the message pre-filled."
                : "Clicking Send will open your email client with a pre-filled message."}
            </p>
          </motion.form>
        </div>
      </div>

      <motion.footer
        className="mt-24 border-t border-slate-100 pt-8 text-center text-sm text-slate-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto px-4">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </div>
      </motion.footer>
    </section>
  );
}
