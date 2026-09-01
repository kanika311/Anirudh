import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Client Case Studies & Verified Revenue Growth | ${name}`,
    description: `Explore verified case studies showing before/after metrics, organic traffic growth, and CAC reduction across SaaS, E-Commerce, and Medical clinics by ${name}.`,
  };
}

export default async function CaseStudiesPage() {
  const [caseStudies, settings] = await Promise.all([
    api.getCaseStudies(),
    api.getSettings(),
  ]);

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Case Studies', url: 'https://alexriveragrowth.com/case-studies' },
        ]}
      />
      <CaseStudiesShowcase caseStudies={caseStudies} />
      <DualCtaBand whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
