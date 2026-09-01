import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { PricingTable } from '@/components/sections/PricingTable';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Consulting Retainers & Pricing Plans | ${name}`,
    description: `Transparent month-to-month growth retainers for high-growth B2B SaaS, E-Commerce, and local multi-location brands with senior consultant ${name}. Zero hidden fees.`,
  };
}

export default async function PricingPage() {
  const [plans, faqs, settings] = await Promise.all([
    api.getPricingPlans(),
    api.getFAQs('Working Together'),
    api.getSettings(),
  ]);

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Pricing', url: 'https://alexriveragrowth.com/pricing' },
        ]}
      />
      <PricingTable plans={plans} />
      <ComparisonTable settings={settings} />
      <FaqAccordion faqs={faqs} />
      <DualCtaBand settings={settings} whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
