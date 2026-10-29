import Image from 'next/image';
import type { Project } from '@/data/portfolio';
import { formatProjectPeriod, getProjectPrimaryLink } from '@/lib/portfolio';
import {
  bulletItemClass,
  bulletListClass,
  cardBodyClass,
  cardClass,
  projectLabelClass,
  subHeadingClass
} from './portfolio-styles';

export function ProjectCard({ id, project }: { id: string; project: Project }) {
  const moreHref = getProjectPrimaryLink(project);
  const headingId = `${id}-title`;

  return (
    // scroll-mt: 앵커 이동 시 헤더 아래 떠 있는 프로젝트 독에 제목이 가리지 않도록 여백을 둔다.
    <article
      id={id}
      aria-labelledby={headingId}
      className="relative grid scroll-mt-[96px] content-start gap-[14px] border-t border-[#e5e8eb] py-[clamp(28px,4vw,40px)] text-base leading-[1.7] first-of-type:border-t-0 first-of-type:pt-0"
    >
      {project.legacyAnchorId && (
        <span
          id={project.legacyAnchorId}
          aria-hidden="true"
          className="absolute top-0 scroll-mt-[96px]"
        />
      )}
      <div className="flex items-center justify-between gap-3">
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
        {moreHref && (
          <a
            href={moreHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} 더보기 (새 창)`}
            className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border-0 bg-[#1b64da] px-3 py-1.5 text-sm font-semibold leading-4 text-white no-underline transition-colors hover:bg-[#1957bf] focus-visible:bg-[#1957bf] focus-visible:outline-none"
          >
            더보기
          </a>
        )}
      </div>
      <h4 className={projectLabelClass}>개요</h4>
      <p className={`${cardClass} ${cardBodyClass} px-5 py-4 sm:px-6 sm:py-5`}>
        {project.description}
      </p>

      <h4 className={projectLabelClass}>역할</h4>
      <p className="text-[#4e5968]">{project.role}</p>

      <h4 className={projectLabelClass}>기여한 부분</h4>
      <ul className={bulletListClass}>
        {project.details.map((detail) => (
          <li key={detail} className={bulletItemClass}>
            {detail}
          </li>
        ))}
      </ul>

      <h4 className={projectLabelClass}>사용 기술</h4>
      <p className="text-[#4e5968]">{project.technologies.join(' · ')}</p>
    </article>
  );
}
