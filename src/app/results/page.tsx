import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { ResultsMetrics } from '@/components/sections/ResultsMetrics';
import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  const revenue = settings.heroCounters?.revenueGenerated || '$48M+';
  return {
    title: `Growth Results, ROI Multipliers & Benchmarks | ${name}`,
    description: `Detailed metrics and industry performance data from over ${revenue} in tracked client revenue scaled by ${name}.`,
  };
}

export default async function ResultsPage() {
  const [caseStudies, settings] = await Promise.all([
    api.getCaseStudies(),
    api.getSettings(),
  ]);

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Results', url: 'https://alexriveragrowth.com/results' },
        ]}
      />
      <ResultsMetrics />
      <CaseStudiesShowcase caseStudies={caseStudies} />
      <DualCtaBand whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
