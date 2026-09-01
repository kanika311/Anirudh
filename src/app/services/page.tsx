import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Consulting Practice Areas & Growth Services | ${name}`,
    description: `Comprehensive search engine optimization, paid media scaling, conversion rate optimization, and high-performance Next.js web development by ${name}.`,
  };
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    api.getServices(),
    api.getSettings(),
  ]);

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Services', url: 'https://alexriveragrowth.com/services' },
        ]}
      />
      <ServicesGrid services={services} />
      <DualCtaBand whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
