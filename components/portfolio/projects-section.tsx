import { projects } from "@/data/portfolio";
import { ProjectCard } from "./project-card";
import { sectionClass, sectionHeadingClass } from "./styles";

export function ProjectsSection() {
  const sortedProjects = [...projects].sort((a, b) => a.period.localeCompare(b.period));

  return (
    <section id="projects" className={sectionClass}>
      <h2 className={sectionHeadingClass}>프로젝트</h2>
      {sortedProjects.map((project) => <ProjectCard key={project.title} project={project} />)}
    </section>
  );
}
