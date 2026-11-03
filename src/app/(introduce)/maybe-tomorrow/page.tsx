import type { Metadata } from 'next';

import { siteUrl } from '@/lib/site';
import { MaybeTomorrowLanding } from './_components/maybe-tomorrow-landing';
import '../../fonts/pretendard/1.3.9/pretendardvariable-dynamic-subset.css';

const TITLE = '내일할까 - 게으름뱅이 플래너';
const DESCRIPTION =
  '미루는 당신을 다그치지 않는 가장 마음 편한 플래너. 스와이프 한 번으로 오늘 할 일을 내일로 미루고, 진척도와 프로젝트로 가볍게 관리하세요. iPhone 무료.';
const APP_STORE_URL = 'https://apps.apple.com/app/id6777882500';
const CANONICAL = '/maybe-tomorrow';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION
  }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: TITLE,
  alternateName: 'Maybe Tomorrow',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'iOS 18.0+',
  description: DESCRIPTION,
  url: `${siteUrl}/maybe-tomorrow`,
  downloadUrl: APP_STORE_URL,
  inLanguage: ['ko', 'en'],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW'
  },
  author: {
    '@type': 'Organization',
    name: 'TrendsWhat Inc.'
  }
};

export default function MaybeTomorrowLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c')
        }}
      />
      <MaybeTomorrowLanding />
    </>
  );
}
