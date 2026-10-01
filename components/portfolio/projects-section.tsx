import { ProjectCard } from "./project-card";
import { projectAnchorId, sortedProjects } from "./project-anchors";
import { sectionClass, sectionHeadingClass } from "./styles";

export function ProjectsSection() {
  return (
    <section id="projects" className={sectionClass}>
      <h2 className={sectionHeadingClass}>프로젝트</h2>
      {sortedProjects.map((project, index) => (
        <ProjectCard key={project.title} id={projectAnchorId(index)} project={project} />
      ))}
    </section>
  );
}
