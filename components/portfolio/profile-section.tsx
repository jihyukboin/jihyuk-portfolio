import Image from "next/image";
import { textLinkClass } from "./styles";

export function ProfileSection() {
  return (
    <section
      className="mt-[clamp(56px,7vw,80px)] grid grid-cols-[minmax(220px,0.85fr)_1.55fr] items-center gap-[clamp(32px,5vw,64px)] max-[720px]:grid-cols-1 max-[720px]:gap-[34px]"
      aria-label="프로필 및 연락처"
    >
      <Image
        className="h-auto w-[231px] rounded-[14px] border border-[#e9e9e7] shadow-[0_18px_42px_rgba(35,42,52,0.1)] max-[720px]:w-[min(50.4vw,217px)]"
        src="/images/jihyuk.webp"
        alt="정지혁 프로필 사진"
        width={354}
        height={472}
        sizes="(max-width: 700px) 51vw, 231px"
        quality={90}
      />
      <div className="grid gap-[15px] text-[clamp(16px,1.4vw,20px)] leading-[1.45] [font-weight:620]">
        <address className="grid gap-[15px] not-italic">
          <p>📧 jihyukboin@gmail.com</p>
          <a className={`${textLinkClass} inline-flex items-center gap-2`} href="https://github.com/jihyukboin" target="_blank" rel="noreferrer">
            <Image className="flex-none" src="/images/github.svg" alt="" width={22} height={22} sizes="22px" />
            Github
          </a>
        </address>
        <p>🏫 가톨릭대학교 컴퓨터정보공학 · 졸업</p>
        <p>🎓 삼성 청년 SW·AI 아카데미(SSAFY) 16기 · 이수 중</p>
      </div>
    </section>
  );
}
