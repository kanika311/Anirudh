import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { DualCtaBand } from '@/components/sections/DualCtaBand';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const [service, settings] = await Promise.all([
    api.getServiceBySlug(params.slug),
    api.getSettings(),
  ]);
  if (!service) {
    return { title: 'Service Not Found' };
  }

  const name = settings.consultantName || 'Alex Rivera';

  return {
    title: service.seo?.metaTitle || `${service.title} | ${name} Consulting`,
    description:
      service.seo?.metaDescription || service.shortDescription || 'Bespoke marketing and SEO consulting services.',
    keywords: service.seo?.keywords,
    openGraph: {
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const [service, settings] = await Promise.all([
    api.getServiceBySlug(params.slug),
    api.getSettings(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Services', url: 'https://alexriveragrowth.com/services' },
          { name: service.title, url: `https://alexriveragrowth.com/services/${service.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Hero */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
            <Sparkles className="w-3.5 h-3.5" />
            Specialized Practice
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {service.shortDescription}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Investment: From {service.startingPrice}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Target: {service.targetAudience}</span>
            </div>
          </div>
        </div>

        {/* Two Column Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Detailed Overview & Strategic Benefits */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Practice Overview & Methodology
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.fullDescription}
              </p>

              {service.benefits && service.benefits.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Key Commercial Advantages:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, bIdx) => (
                      <div
                        key={bIdx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Deliverables Scope & Direct CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white dark:bg-dark-card border border-slate-800 dark:border-dark-border shadow-xl space-y-6">
              <h3 className="text-xl font-extrabold tracking-tight">
                What's Included in This Scope:
              </h3>

              <div className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/#audit-form"
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free Consultation for {service.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dual CTA */}
        <DualCtaBand whatsappNumber={settings.whatsappNumber} />
      </div>
    </div>
  );
}
