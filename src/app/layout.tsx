import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PersonLocalBusinessJsonLd } from '@/components/seo/JsonLd';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090D16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

import { api } from '@/lib/api';
import { DynamicFavicon } from '@/components/seo/DynamicFavicon';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const consultantName = settings.consultantName || 'Alex Rivera';
  const siteName = settings.siteName || `${consultantName} | Growth Consulting`;
  
  // Smart title: if globalSeo.metaTitle exists but has Alex Rivera while consultantName was updated, replace it
  let metaTitle = settings.globalSeo?.metaTitle;
  if (!metaTitle || (metaTitle.includes('Alex Rivera') && consultantName !== 'Alex Rivera')) {
    metaTitle = metaTitle ? metaTitle.replace(/Alex Rivera/g, consultantName) : `${consultantName} | ${settings.tagline || 'Senior Technical SEO & Growth Marketing Consultant'}`;
  }

  const metaDescription =
    settings.globalSeo?.metaDescription ||
    `Scale organic search, paid performance ROAS, and conversion rate architecture with battle-tested growth blueprints by ${consultantName}. 10+ years experience, $48M+ tracked revenue.`;
  const ogImageUrl = settings.globalSeo?.ogImageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop';
  const iconUrl = settings.faviconUrl || settings.logoUrl || '/favicon.ico';
  const keywords = settings.globalSeo?.keywords?.length
    ? settings.globalSeo.keywords
    : [
        'SEO consultant',
        'growth marketing consultant',
        'technical SEO audit',
        'SaaS SEO strategy',
        'Google Ads specialist',
        'CRO consultant',
        'Next.js web developer',
      ];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      default: metaTitle,
      template: `%s | ${consultantName}`,
    },
    description: metaDescription,
    keywords: keywords,
    icons: {
      icon: [
        { url: iconUrl },
        { url: iconUrl, type: 'image/png' },
        { url: iconUrl, type: 'image/x-icon' },
        { url: iconUrl, type: 'image/svg+xml' },
      ],
      shortcut: [iconUrl],
      apple: [settings.logoUrl || iconUrl],
    },
    authors: [{ name: consultantName, url: 'https://alexriveragrowth.com' }],
    creator: consultantName,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://alexriveragrowth.com',
      siteName: siteName,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      creator: settings.socialLinks?.twitter
        ? `@${settings.socialLinks.twitter.split('/').filter(Boolean).pop()}`
        : `@${consultantName.replace(/\s+/g, '').toLowerCase()}`,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await api.getSettings();
  const iconUrl = settings.faviconUrl || settings.logoUrl || '';

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <DynamicFavicon initialIcon={iconUrl} initialTitle={settings.consultantName} />
        <PersonLocalBusinessJsonLd />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col selection:bg-primary-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
