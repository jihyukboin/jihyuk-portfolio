import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { bulletItemClass, bulletListClass, subHeadingClass } from "./styles";

export function ProjectCard({ project }: { project: Project }) {
  const moreHref = project.moreHref
    ?? project.links.find((link) => link.icon === "web")?.href
    ?? project.links.find((link) => link.icon === "appStore")?.href
    ?? project.links.find((link) => link.icon === "googlePlay")?.href;

  return (
    <article className="grid content-start gap-[14px] border-t border-[#e9e9e7] py-[clamp(28px,4vw,40px)] text-[16px] leading-[1.7]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#e7e7e5] bg-white">
            <Image
              className="block h-full w-full object-cover"
              src={project.icon}
              alt={`${project.title} 아이콘`}
              width={36}
              height={36}
              sizes="36px"
            />
          </div>
          <h3 className={subHeadingClass}>{`${project.title} (${project.period})`}</h3>
        </div>
        {moreHref && (
          <a
            href={moreHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} 더보기`}
            className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border-0 bg-[#3182f6] px-3 py-1.5 text-sm font-semibold leading-4 text-white no-underline transition-colors hover:bg-[#1b64da] focus-visible:bg-[#1b64da] focus-visible:outline-none"
          >
            더보기
          </a>
        )}
      </div>
      {/* YoungManRest_FE What Is 게시물 카드(회색 rounded-2xl 박스) 디자인을 참고한 설명 영역 */}
      <p className="mt-1 rounded-2xl bg-[#f2f4f6] px-5 py-4 text-[15px] leading-[1.7] tracking-[-0.02em] text-[#4e5968] sm:px-6 sm:py-5 sm:text-base">
        {project.description}
      </p>
      <p className="text-[#9b9a97]">{project.role}</p>
      <h4 className="mt-[18px] text-[17px] [font-weight:750]">👩🏻‍💻 내가 기여한 부분</h4>
      <ul className={bulletListClass}>
        {project.details.map((detail) => (
          <li key={detail} className={bulletItemClass}>{detail}</li>
        ))}
      </ul>
      <h4 className="mt-[18px] text-[17px] [font-weight:750]">🖥️ 사용 기술</h4>
      <p className="text-[#65645f]">
        {project.technologies ?? "NextJS · TypeScript · React-Query · Storybook · Axios · Emotion · MonoRepo"}
      </p>
    </article>
  );
}
