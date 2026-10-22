import { createPortfolioOpenGraphImage } from "@/lib/portfolio-open-graph";

// 파일 기반 메타데이터 상속 없이 기존 공개 이미지 URL을 유지한다.
export const dynamic = "force-static";

export function GET() {
  return createPortfolioOpenGraphImage();
}
