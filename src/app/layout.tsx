import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PersonLocalBusinessJsonLd } from '@/components/seo/JsonLd';
import { Toaster } from 'react-hot-toast';
import { api } from '@/lib/api';
import { DynamicFavicon } from '@/components/seo/DynamicFavicon';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#06060F' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const consultantName =
    settings.consultantName && settings.consultantName !== 'Alex Rivera'
      ? settings.consultantName
      : 'Anirudh Kumar';
  const siteName =
    settings.siteName && !settings.siteName.includes('Alex Rivera')
      ? settings.siteName
      : `${consultantName} | Best Digital Marketing Expert in Lucknow & Kanpur`;

  let metaTitle = settings.globalSeo?.metaTitle;
  if (!metaTitle || metaTitle.includes('Alex Rivera')) {
    metaTitle = `Best Digital Marketing Expert in Lucknow & Kanpur | ${consultantName} – SEO Specialist`;
  }

  const metaDescription =
    settings.globalSeo?.metaDescription ||
    `${consultantName} – Lucknow & Kanpur ka #1 Digital Marketing Expert. SEO, Social Media Marketing, Meta Ads, Google Ads, Website Development. Free SEO Audit available. 200+ clients served.`;
  const ogImageUrl = settings.globalSeo?.ogImageUrl || '/anirudh-hero.png';
  const iconUrl = settings.faviconUrl || settings.logoUrl || '/anirudh-hero.png';
  const keywords = settings.globalSeo?.keywords?.length
    ? settings.globalSeo.keywords
    : [
        'seo expert in lucknow',
        'digital marketing lucknow',
        'anirudh kumar lucknow',
        'best seo in lucknow',
        'digital marketing kanpur',
        'seo company lucknow',
        'social media marketing lucknow',
        'meta ads expert lucknow',
        'google ads lucknow',
        'website development lucknow',
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
      ],
      shortcut: [iconUrl],
      apple: [iconUrl],
    },
    authors: [{ name: consultantName, url: 'https://anirudhkumarseo.netlify.app' }],
    creator: consultantName,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://anirudhkumarseo.netlify.app',
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
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await api.getSettings();
  const iconUrl = settings.faviconUrl || settings.logoUrl || '/anirudh-hero.png';

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${bebasNeue.variable}`}
      data-theme="dark"
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <DynamicFavicon initialIcon={iconUrl} initialTitle={settings.consultantName || 'Anirudh Kumar'} />
        <PersonLocalBusinessJsonLd />
      </head>
      <body className="min-h-screen antialiased flex flex-col selection:bg-orange-500 selection:text-white">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
