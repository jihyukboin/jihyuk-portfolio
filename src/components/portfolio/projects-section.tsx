import { ProjectCard } from './project-card';
import { getProjectAnchorId, sortedProjects } from '@/lib/portfolio';
import { sectionClass, sectionHeadingClass } from './portfolio-styles';

export function ProjectsSection() {
  return (
    <section id="projects" className={sectionClass}>
      <h2 className={sectionHeadingClass}>프로젝트</h2>
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          id={getProjectAnchorId(project)}
          project={project}
        />
      ))}
    </section>
  );
}
