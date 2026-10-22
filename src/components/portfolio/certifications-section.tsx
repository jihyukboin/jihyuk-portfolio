import { certifications } from "@/data/portfolio";
import { CredentialSection } from "./credential-section";

export function CertificationsSection() {
  return <CredentialSection id="certifications" title="자격증" items={certifications} dateLabel="취득일" />;
}
