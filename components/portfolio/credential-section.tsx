import type { ReactNode } from "react";
import type { Credential } from "@/data/portfolio";
import { cardClass, cardGridClass, cardPaddingClass, cardTitleClass, sectionClass, sectionHeadingClass } from "./styles";

type CredentialSectionProps = {
  id: string;
  title: string;
  items: Credential[];
  /** 날짜 항목 라벨 (자격증: 취득일, 어학: 응시일) */
  dateLabel: string;
};

/** 자격증·어학 섹션이 공유하는 회색 카드 목록 */
export function CredentialSection({ id, title, items, dateLabel }: CredentialSectionProps) {
  return (
    <section id={id} className={sectionClass}>
      <h2 className={sectionHeadingClass}>{title}</h2>
      <div className={cardGridClass}>
        {items.map((item) => (
          <article key={item.registrationNumber} className={`${cardClass} ${cardPaddingClass} flex min-h-[248px] flex-col`}>
            <h3 className={cardTitleClass}>{item.name}</h3>
            <p className="mt-2 text-[15px] text-[#8b95a1] [font-weight:600]">{item.issuer}</p>
            <dl className="mt-auto grid gap-4 pt-8 text-[15px] leading-[1.6] tracking-[-0.02em] sm:text-base">
              {item.result && <CredentialField label="등급 및 점수">{item.result}</CredentialField>}
              <CredentialField label={dateLabel}>
                <time dateTime={item.dateTime}>{item.date}</time>
              </CredentialField>
              <CredentialField label="등록 번호">{item.registrationNumber}</CredentialField>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function CredentialField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-[#8b95a1] [font-weight:650]">{label}</dt>
      <dd className="mt-1 break-all text-[#333d4b] [font-weight:650]">{children}</dd>
    </div>
  );
}
