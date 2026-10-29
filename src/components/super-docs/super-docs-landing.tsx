import { LandingHeader } from './landing-header';
import {
  DownloadSection,
  FaqSection,
  FeaturesSection,
  FormatsSection,
  HeroSection,
  HighlightsSection,
  InstallSection,
  LandingFooter,
  WorkflowSection
} from './landing-sections';
import styles from './landing.module.css';

export function SuperDocsLanding() {
  return (
    <div
      className={`${styles.page} relative isolate flex min-h-dvh flex-col overflow-x-clip text-neutral-100`}
    >
      <div
        className="hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px]"
        aria-hidden="true"
      />
      <LandingHeader />
      <main id="super-docs-main" tabIndex={-1} className="flex-1">
        <HeroSection />
        <HighlightsSection />
        <FeaturesSection />
        <WorkflowSection />
        <FormatsSection />
        <InstallSection />
        <FaqSection />
        <DownloadSection />
      </main>
      <LandingFooter />
    </div>
  );
}
