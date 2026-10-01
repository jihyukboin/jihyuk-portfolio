import Image from "next/image";
import { profile } from "@/data/portfolio";
import { textLinkClass } from "./styles";

export function ProfileSection() {
  return (
    <section
      className="mt-[clamp(56px,7vw,80px)] grid grid-cols-[minmax(220px,0.85fr)_1.55fr] items-center gap-[clamp(32px,5vw,64px)] max-md:grid-cols-1 max-md:gap-[34px]"
      aria-label="프로필 및 연락처"
    >
      <Image
        className="h-auto w-[231px] rounded-[14px] border border-[#e5e8eb] shadow-[0_18px_42px_rgba(35,42,52,0.1)] max-md:w-[min(50.4vw,217px)]"
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={354}
        height={472}
        // 표시 폭은 모든 화면에서 231px 이하다.
        sizes="231px"
        quality={90}
        loading="eager"
      />
      <div className="grid gap-[15px] text-[clamp(16px,1.4vw,20px)] leading-[1.45] text-[#191f28] [font-weight:620]">
        <address className="grid gap-[15px] not-italic">
          <a className={textLinkClass} href={`mailto:${profile.email}`}>
            📧 {profile.email}
          </a>
          <a className={`${textLinkClass} inline-flex items-center gap-2`} href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            <Image className="flex-none" src="/images/github.svg" alt="" width={22} height={22} sizes="22px" />
            GitHub
          </a>
        </address>
        {profile.education.map((item) => (
          <p key={item.name}>
            {item.emoji} {item.name} {item.detail}
          </p>
        ))}
      </div>
    </section>
  );
}
