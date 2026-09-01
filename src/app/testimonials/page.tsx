import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { ResultsMetrics } from '@/components/sections/ResultsMetrics';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Client Reviews & Founder Testimonials | ${name}`,
    description: `Verified 5-star testimonials and reviews from founders, VPs of Growth, and CMOs who have scaled their search pipeline with ${name}.`,
  };
}

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([
    api.getTestimonials(),
    api.getSettings(),
  ]);

  return (
    <div className="pt-24 md:pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Testimonials', url: 'https://alexriveragrowth.com/testimonials' },
        ]}
      />
      <TestimonialsCarousel testimonials={testimonials} settings={settings} />
      <ResultsMetrics />
      <DualCtaBand settings={settings} whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
