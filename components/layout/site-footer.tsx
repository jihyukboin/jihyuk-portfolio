import Link from "next/link";

import { profile } from "@/data/portfolio";

import { NAVIGATION_ITEMS } from "./navigation";

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
    links: NAVIGATION_ITEMS,
  },
  {
    title: "연락처",
    links: [
      { label: "이메일", href: `mailto:${profile.email}`, external: true },
      { label: "GitHub", href: profile.githubUrl, external: true },
    ],
  },
];

const linkClass =
  "text-[15px] text-[#8b95a1] no-underline transition-colors hover:text-[#4e5968] max-[480px]:flex max-[480px]:min-h-8 max-[480px]:items-center";

function FooterNavigationLink({ link }: { link: FooterLink }) {
  if (link.external) {
    const opensNewTab = link.href.startsWith("http");
    return (
      <a
        href={link.href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }

  return <Link href={link.href} className={linkClass}>{link.label}</Link>;
}

export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-[#e5e8eb] bg-white px-6 pb-8 pt-10 text-[15px] leading-[1.7] text-[#4e5968] [overflow-x:clip] max-[480px]:px-5 max-[480px]:pb-6 max-[480px]:pt-8">
      <div className="mx-auto flex w-full max-w-[800px] min-w-0 flex-col gap-7 text-left">
        <nav aria-label="푸터 메뉴" className="grid grid-cols-2 gap-6 max-[480px]:gap-x-4">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col items-start gap-3">
              <h2 className="m-0 text-[16px] font-bold leading-none text-[#333d4b]">{section.title}</h2>
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

        <div className="flex flex-col items-start gap-1 pt-6">
          <p className="m-0 text-[15px] font-bold text-[#4e5968]">{profile.name}</p>
          <p className="m-0 text-[15px] leading-[1.6] text-[#8b95a1]">{profile.headline}</p>
          <p className="m-0 text-[15px] text-[#8b95a1]">© {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
