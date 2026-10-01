import { languageTests } from "@/data/portfolio";
import { sectionClass, sectionHeadingClass } from "./styles";

export function LanguageSection() {
  return (
    <section id="language-tests" className={sectionClass}>
      <h2 className={sectionHeadingClass}>어학</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {languageTests.map((languageTest) => (
          <article
            key={languageTest.registrationNumber}
            className="flex min-h-[248px] flex-col rounded-2xl bg-[#f2f4f6] p-6 text-[#1d1d1f] sm:p-8"
          >
            <h3 className="text-xl leading-[1.35] tracking-[-0.04em] [font-weight:700] sm:text-2xl">
              {languageTest.name}
            </h3>
            <dl className="mt-auto grid gap-4 pt-8 text-[15px] leading-[1.6] tracking-[-0.02em] text-[#4e5968] sm:text-base">
              <div>
                <dt className="text-sm text-[#8b95a1] [font-weight:650]">취득일</dt>
                <dd className="mt-1 text-[#333d4b] [font-weight:650]"><time dateTime={languageTest.testedOnDateTime}>{languageTest.testedOn}</time></dd>
              </div>
              <div>
                <dt className="text-sm text-[#8b95a1] [font-weight:650]">등록 번호</dt>
                <dd className="mt-1 text-[#333d4b] [font-weight:650]">{languageTest.registrationNumber}</dd>
              </div>
              <div>
                <dt className="text-sm text-[#8b95a1] [font-weight:650]">등급 및 점수</dt>
                <dd className="mt-1 text-[#333d4b] [font-weight:650]">{languageTest.result}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
