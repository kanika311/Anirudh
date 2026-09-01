import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Why Choose ${name} vs Agency`,
    description: `Discover why venture-backed founders choose direct senior consultant ${name} over bloated agency overhead and junior account managers.`,
  };
}

export default async function WhyChooseUsPage() {
  const settings = await api.getSettings();

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Why Choose Us', url: 'https://alexriveragrowth.com/why-choose-us' },
        ]}
      />
      <WhyChooseUs settings={settings} />
      <ComparisonTable settings={settings} />
      <ProcessTimeline />
      <DualCtaBand settings={settings} whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
