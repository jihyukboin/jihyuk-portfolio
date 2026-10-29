import Link from 'next/link';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { SiteHeader } from '@/components/layout/site-header';
import { siteOwner } from '@/lib/site';
import { getProjectAnchorId, sortedProjects } from '@/lib/portfolio';
import { PORTFOLIO_NAVIGATION_ITEMS } from './navigation';
import { PortfolioSectionNav } from './portfolio-section-nav';
import { ProjectDock, type ProjectDockItem } from './project-dock';

const projectDockItems: ProjectDockItem[] = sortedProjects.map((project) => ({
  id: getProjectAnchorId(project),
  title: project.title,
  icon: project.icon
}));

export function PortfolioHeader() {
  return (
    <>
      <SiteHeader
        navigation={<PortfolioSectionNav items={PORTFOLIO_NAVIGATION_ITEMS} />}
        mobileMenu={
          <MobileMenu>
            <div className="flex flex-col">
              <div className="flex py-3.5">
                <a
                  href={siteOwner.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg bg-[#1b64da] px-2 py-2.5 text-sm font-semibold leading-5 text-white no-underline transition-colors hover:bg-[#1957bf] focus-visible:bg-[#1957bf] focus-visible:outline-none"
                >
                  GitHub
                </a>
              </div>
              <nav aria-label="모바일 포트폴리오 탐색">
                {PORTFOLIO_NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex w-full items-center border-b border-[#e5e8eb] py-3.5 text-left text-[0.9375rem] font-semibold leading-5 no-underline transition-colors hover:bg-[#f9fafb] focus-visible:bg-[#f9fafb] focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </MobileMenu>
        }
      />
      <ProjectDock items={projectDockItems} sectionId="projects" />
    </>
  );
}
