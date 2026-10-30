import Image from 'next/image';
import { Globe } from 'lucide-react';
import { ProjectStory } from './project-story';
import { formatProjectPeriod, type Project } from '@/lib/portfolio';
import {
  bulletListClass,
  cardClass,
  projectLabelClass,
  subHeadingClass
} from './portfolio-styles';

export function ProjectCard({ id, project }: { id: string; project: Project }) {
  const headingId = `${id}-title`;
  const platformLinks = (['web', 'appStore', 'googlePlay'] as const).flatMap(
    (icon) => project.links.filter((link) => link.icon === icon)
  );

  return (
    <article
      id={id}
      aria-labelledby={headingId}
      className="relative grid scroll-mt-0 content-start gap-[14px] pt-[clamp(40px,5vw,56px)] text-[19px] font-normal not-italic leading-[30px] tracking-[-0.6px] text-[#000000] first-of-type:pt-0"
    >
      {project.legacyAnchorId && (
        <span
          id={project.legacyAnchorId}
          aria-hidden="true"
          className="absolute top-0 scroll-mt-0"
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#e5e8eb] bg-white">
            <Image
              className="block h-full w-full object-cover"
              src={project.icon}
              alt=""
              width={36}
              height={36}
              sizes="36px"
            />
          </div>
          <div className="min-w-0">
            <h3 id={headingId} className={subHeadingClass}>
              {project.title} ({formatProjectPeriod(project)})
            </h3>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          {platformLinks.map((link) => {
            const label =
              link.icon === 'web'
                ? '웹사이트'
                : link.icon === 'appStore'
                  ? 'iOS 앱'
                  : 'Android 앱';

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} ${label} (새 창)`}
                className="inline-flex min-h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f2f4f6] px-3 py-1.5 text-[13px] font-semibold leading-5 tracking-normal text-[#4e5968] no-underline transition-colors hover:bg-[#e5e8eb] hover:text-[#191f28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3182f6]"
              >
                {link.icon === 'web' ? (
                  <Globe aria-hidden="true" className="size-4 shrink-0" />
                ) : link.icon === 'appStore' ? (
                  <Image
                    src="/images/apple-logo-square.webp"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0 object-contain"
                  />
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0"
                    fill="currentColor"
                  >
                    <path
                      d="M6 9a6 6 0 0 1 12 0H6Zm3-3a.75.75 0 1 0 0 1.5A.75.75 0 0 0 9 6Zm6 0a.75.75 0 1 0 0 1.5A.75.75 0 0 0 15 6Z"
                      fillRule="evenodd"
                    />
                    <rect x="6" y="10" width="12" height="9" rx="1.5" />
                    <path
                      d="m8 4-1.5-2M16 4l1.5-2M3.5 11v6m17-6v6M9 19v3m6-3v3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {label}
              </a>
            );
          })}
        </div>
      </div>
      <h4 className={projectLabelClass}>개요</h4>
      <p className={`${cardClass} px-5 py-4 sm:px-6 sm:py-5`}>
        {project.description}
      </p>

      <h4 className={projectLabelClass}>역할</h4>
      <p className={`${cardClass} px-5 py-4 sm:px-6 sm:py-5`}>{project.role}</p>

      <h4 className={projectLabelClass}>기여</h4>
      <ul
        className={`${cardClass} ${bulletListClass} px-5 py-4 sm:px-6 sm:py-5`}
      >
        {project.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>

      <h4 className={projectLabelClass}>기술</h4>
      <p className={`${cardClass} px-5 py-4 sm:px-6 sm:py-5`}>
        {project.technologies.join(' · ')}
      </p>

      <ProjectStory id={id} title={project.title} />
    </article>
  );
}
