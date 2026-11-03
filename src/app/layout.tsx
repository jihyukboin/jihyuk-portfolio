import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteName, siteOwner, siteUrl } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  applicationName: siteName,
  authors: [{ name: siteOwner.name, url: siteOwner.githubUrl }],
  creator: siteOwner.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  themeColor: '#ffffff'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ko" className="h-full antialiased">
      <body>
        {children}
        {gaMeasurementId && (
          <>
            <Script id="google-analytics-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaMeasurementId)});`}
            </Script>
            <Script
              id="google-analytics"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="lazyOnload"
            />
          </>
        )}
      </body>
    </html>
  );
}
