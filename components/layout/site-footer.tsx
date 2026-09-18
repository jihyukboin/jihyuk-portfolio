import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const SECTIONS: FooterSection[] = [
  {
    title: "포트폴리오",
    links: [
      { label: "경험", href: "/#experience" },
      { label: "자격증", href: "/#certifications" },
      { label: "프로젝트", href: "/#projects" },
      { label: "기술", href: "/#skills" },
    ],
  },
  {
    title: "연락처",
    links: [
      { label: "이메일", href: "mailto:jihyukboin@gmail.com", external: true },
      { label: "GitHub", href: "https://github.com/jihyukboin", external: true },
    ],
  },
  {
    title: "사이트",
    links: [
      { label: "홈", href: "/" },
      { label: "사이트맵", href: "/sitemap.xml", external: true },
    ],
  },
];

function FooterNavigationLink({ link }: { link: FooterLink }) {
  const className = "text-[15px] text-[rgba(3,24,50,0.46)] no-underline transition-colors hover:text-[rgba(0,12,30,0.7)] max-[480px]:flex max-[480px]:min-h-8 max-[480px]:items-center";

  if (link.external) {
    const opensNewTab = link.href.startsWith("http");
    return (
      <a
        href={link.href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return <Link href={link.href} className={className}>{link.label}</Link>;
}

export function SiteFooter() {
  return (
    <footer aria-label="사이트 푸터" className="shrink-0 overflow-x-hidden bg-white px-6 pb-8 pt-10 text-[15px] leading-[1.7] text-[rgba(0,12,30,0.8)] [overflow-x:clip] max-[480px]:px-5 max-[480px]:pb-6 max-[480px]:pt-8">
      <div className="mx-auto flex w-full max-w-[800px] min-w-0 flex-col gap-7 text-left">
        <nav aria-label="사이트 주요 정보" className="grid grid-cols-3 gap-6 max-[800px]:grid-cols-2 max-[800px]:gap-x-6 max-[800px]:gap-y-7 max-[480px]:gap-x-4 max-[480px]:gap-y-6">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col items-start gap-3">
              <h2 className="m-0 text-[16px] font-bold leading-none text-[rgba(0,12,30,0.8)]">{section.title}</h2>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <FooterNavigationLink link={link} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="flex items-end justify-between gap-8 pt-6 text-left max-[640px]:flex-col max-[640px]:items-start">
          <div className="flex flex-col items-start gap-1">
            <p className="m-0 text-[15px] font-bold text-[rgba(0,12,30,0.6)]">정지혁</p>
            <p className="m-0 text-[15px] leading-[1.6] text-[rgba(3,24,50,0.36)]">Full Stack Developer Portfolio</p>
            <p className="m-0 text-[15px] leading-[1.6] text-[rgba(3,24,50,0.36)]">웹·모바일·백엔드·Cloud를 연결해 서비스를 만듭니다.</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-4">
              <a href="mailto:jihyukboin@gmail.com" className="text-[15px] text-[rgba(3,24,50,0.46)] no-underline transition-colors hover:text-[rgba(0,12,30,0.7)]">이메일</a>
              <a href="https://github.com/jihyukboin" target="_blank" rel="noopener noreferrer" className="text-[15px] font-bold text-[rgba(0,12,30,0.8)] no-underline transition-colors hover:text-[rgba(0,12,30,0.7)]">GitHub</a>
            </div>
            <p className="m-0 text-[15px] text-[rgba(3,24,50,0.36)]">© {new Date().getFullYear()} 정지혁. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
