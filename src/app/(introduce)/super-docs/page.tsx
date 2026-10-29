import type { Metadata, Viewport } from 'next';
import { superDocs } from '@/lib/super-docs';
import { SuperDocsLanding } from '@/components/super-docs/super-docs-landing';
import { SuperDocsStructuredData } from '@/components/super-docs/super-docs-structured-data';

const { title, description } = superDocs;

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'dark'
};

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  applicationName: 'Super Docs',
  alternates: { canonical: '/super-docs' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/super-docs',
    siteName: 'Super Docs',
    title,
    description,
    images: [{ url: '/super-docs/app-icon.png', alt: 'Super Docs 앱 아이콘' }]
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [{ url: '/super-docs/app-icon.png', alt: 'Super Docs 앱 아이콘' }]
  },
  icons: {
    icon: {
      url: '/super-docs/favicon.ico',
      type: 'image/x-icon',
      sizes: '16x16 32x32 48x48 256x256'
    }
  }
};

export default function SuperDocsPage() {
  return (
    <>
      <SuperDocsStructuredData />
      <SuperDocsLanding />
    </>
  );
}
