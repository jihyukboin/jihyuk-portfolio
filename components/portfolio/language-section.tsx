import { languageTests } from "@/data/portfolio";
import { CredentialSection } from "./credential-section";

export function LanguageSection() {
  return <CredentialSection id="language-tests" title="어학" items={languageTests} dateLabel="응시일" />;
}
