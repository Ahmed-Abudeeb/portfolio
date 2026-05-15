import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import {
  loadProfile,
  loadExperience,
  loadSkills,
  loadContact,
  loadAllProjects,
} from "@/lib/content-loader";

export default function HomePage() {
  const profile = loadProfile();
  const experience = loadExperience();
  const skills = loadSkills();
  const contact = loadContact();
  const projects = loadAllProjects();

  return (
    <main>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ContactSection profile={profile} contact={contact} />
    </main>
  );
}
