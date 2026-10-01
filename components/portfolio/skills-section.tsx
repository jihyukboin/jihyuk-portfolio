import { skills } from "@/data/portfolio";
import { cardBodyClass, cardClass, cardGridClass, cardPaddingClass, cardTitleClass, sectionClass, sectionHeadingClass } from "./styles";

export function SkillsSection() {
  return (
    <section id="skills" className={sectionClass}>
      <h2 className={sectionHeadingClass}>기술</h2>
      <div className={cardGridClass}>
        {skills.map((group) => (
          <article key={group.category} className={`${cardClass} ${cardPaddingClass} flex flex-col gap-4`}>
            <h3 className={cardTitleClass}>{group.category}</h3>
            <ul className="flex flex-wrap gap-2" aria-label={`${group.category} 기술 스택`}>
              {group.items.map((item) => (
                <li key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm leading-5 text-[#333d4b] [font-weight:600]">
                  {item}
                </li>
              ))}
            </ul>
            <p className={cardBodyClass}>{group.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
