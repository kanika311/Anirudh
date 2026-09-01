import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { AboutBioSection } from '@/components/sections/AboutBioSection';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `About ${name} | Senior Growth & Technical SEO Consultant`,
    description: `Learn about ${name}, background scaling venture-backed SaaS and D2C brands, technical credentials, and consulting philosophy.`,
  };
}

export default async function AboutPage() {
  const settings = await api.getSettings();

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'About', url: 'https://alexriveragrowth.com/about' },
        ]}
      />
      <AboutBioSection settings={settings} />
      <ComparisonTable settings={settings} />
      <DualCtaBand settings={settings} whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
