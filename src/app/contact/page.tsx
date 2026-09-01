import React from 'react';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { ContactSection } from '@/components/sections/ContactSection';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await api.getSettings();
  const name = settings.consultantName || 'Alex Rivera';
  return {
    title: `Contact & Schedule Free Growth Audit | ${name}`,
    description: `Get in touch with senior consultant ${name}. Schedule a 20-point Technical SEO audit or 30-minute discovery session.`,
  };
}

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    api.getSettings(),
    api.getServices(),
  ]);

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Contact', url: 'https://alexriveragrowth.com/contact' },
        ]}
      />

      <ContactSection settings={settings} services={services} />

      {/* Embedded Google Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-dark-border h-[350px] w-full relative">
          <iframe
            title="Alex Rivera Headquarters Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0863025211993!2d-122.39868722363574!3d37.78917201121021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806282862d51%3A0xe54d8a1db81b4b1a!2s500%20Howard%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale contrast-125 dark:opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
