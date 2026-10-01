import { cumulativeUsersText } from "@/data/portfolio";

export function Introduction() {
  return (
    // scroll-mt를 article 상단 패딩(pt-[clamp(40px,6vw,64px)])과 맞춰 "/#introduction" 이동 시 페이지 맨 위로 스크롤되게 한다.
    <header id="introduction" className="scroll-mt-[clamp(40px,6vw,64px)]">
      <h1 className="max-w-[780px] text-[clamp(34px,4vw,52px)] leading-[1.22] tracking-[-0.055em] text-[#242321] [font-weight:750]">
        안녕하세요,<br></br>개발자 정지혁입니다.
      </h1>
      <div className="mt-[clamp(40px,5vw,64px)] grid max-w-[890px] gap-[clamp(28px,3vw,40px)] text-[clamp(17px,1.55vw,22px)] leading-[1.55] tracking-[-0.035em] [font-weight:560]">
        <p>
          <strong className="text-[#2383e2]">실제 사용자가 있는 서비스를 끝까지 만듭니다.</strong><br />
          학습 플랫폼, 금융 기록 앱, 여행 리뷰 서비스, 콘텐츠 자동화 서비스를 기획·개발·배포·운영해 왔습니다.<br />
          웹·모바일·백엔드·MySQL·Cloud·AI 기능을 하나의 운영 가능한 시스템으로 연결합니다.
        </p>
        <p>
          <strong className="text-[#2383e2]">문제를 사용자 흐름과 데이터 흐름으로 나누어 해결합니다.</strong><br />
          입력·처리·저장·조회·실패 복구 단계를 분리하고, 로그·DB 상태·배포 산출물·브라우저 동작을 함께 확인합니다.<br />
          임고봇은 현재 누적 <u>{cumulativeUsersText}</u>의 사용자가 이용하는 학습 플랫폼으로 운영하고 있습니다.
        </p>
        <p>
          <strong className="text-[#2383e2]">AI의 편의성과 데이터 신뢰성을 함께 설계합니다.</strong><br />
          AI가 입력을 구조화하거나 결과를 생성하더라도, 사용자 승인·검증·이력 관리가 남는 서비스 구조를 지향합니다.<br />
          현재 삼성 청년 SW·AI 아카데미에서 Java·Spring 기반의 협업 개발을 학습하고 있습니다.
        </p>
      </div>
    </header>
  );
}
