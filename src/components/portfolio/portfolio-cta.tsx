import Image from "next/image";
import { profile } from "@/data/portfolio";
import { sectionClass } from "./portfolio-styles";

export function PortfolioCta() {
  return (
    <section aria-labelledby="portfolio-cta-title" className={sectionClass}>
      <div className="rounded-2xl bg-[#f2f4f6] p-10 text-center text-[#191f28] sm:p-14">
        <Image
          src={profile.image}
          alt=""
          width={96}
          height={128}
          sizes="96px"
          className="mx-auto mb-6 h-32 w-24 rounded-2xl border border-[#e5e8eb] object-cover shadow-[0_8px_24px_rgba(35,42,52,0.12)]"
        />
        <h2 id="portfolio-cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          아이디어를 실제 서비스로
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#4e5968] sm:text-base">
          기획부터 개발·배포·운영까지.
          <br />
          개발자 정지혁이 만들어가는 서비스와 코드를 GitHub에서 확인해 보세요.
        </p>
        <div className="mt-8">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#3182f6] px-7 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1b64da] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3182f6]"
          >
            <Image src="/images/github.svg" alt="" width={18} height={18} sizes="18px" className="brightness-0 invert" />
            GitHub에서 더 알아보기
            <span className="sr-only"> (새 창)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
