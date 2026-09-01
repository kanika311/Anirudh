import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import {
  TrendingUp,
  CheckCircle2,
  Quote,
  ArrowRight,
  Sparkles,
  Calendar,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { DualCtaBand } from '@/components/sections/DualCtaBand';

interface CaseStudyPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const [study, settings] = await Promise.all([
    api.getCaseStudyBySlug(params.slug),
    api.getSettings(),
  ]);
  if (!study) {
    return { title: 'Case Study Not Found' };
  }

  const name = settings.consultantName || 'Alex Rivera';

  return {
    title: study.seo?.metaTitle || `${study.title} | ${name} Case Study`,
    description:
      study.seo?.metaDescription || study.summary || 'Detailed growth marketing case study breakdown.',
    keywords: study.seo?.keywords,
    openGraph: {
      title: study.seo?.metaTitle || study.title,
      description: study.seo?.metaDescription || study.summary,
      images: [
        {
          url: study.coverImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const [study, settings] = await Promise.all([
    api.getCaseStudyBySlug(params.slug),
    api.getSettings(),
  ]);

  if (!study) {
    notFound();
  }

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://alexriveragrowth.com' },
          { name: 'Case Studies', url: 'https://alexriveragrowth.com/case-studies' },
          { name: study.client, url: `https://alexriveragrowth.com/case-studies/${study.slug}` },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
              {study.clientIndustry}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Timeframe: {study.timeframe}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {study.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {study.summary}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[350px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-border">
          <Image
            src={study.coverImage}
            alt={study.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Verified Metrics Grid */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white dark:bg-dark-card border border-slate-800 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-6 text-center">
            Verified Before vs After Metrics
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/80 dark:bg-dark-surface border border-slate-700/80 text-center"
              >
                <div className="text-xs text-slate-400 font-semibold mb-1 truncate">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-400 line-through">
                  Before: {metric.before}
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                  {metric.after}
                </div>
                <div className="text-[11px] font-bold text-emerald-300 mt-0.5">
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Breakdown: Challenge, Strategy, Execution, Results */}
        <div className="space-y-8 text-slate-700 dark:text-slate-200">
          {/* 1. Challenge */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-primary-600">01.</span> The Initial Challenge & Bottlenecks
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* 2. Strategy */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-primary-600">02.</span> Strategic Growth Architecture
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {study.strategy}
            </p>
          </div>

          {/* 3. Execution Checklist */}
          {study.execution && study.execution.length > 0 && (
            <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-primary-600">03.</span> Key Initiatives & Deployments
              </h2>
              <div className="space-y-3 pt-2">
                {study.execution.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Results */}
          {study.results && study.results.length > 0 && (
            <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-primary-600">04.</span> Revenue & Commercial Impact
              </h2>
              <div className="space-y-3 pt-2">
                {study.results.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-medium">
                    <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonial Callout */}
          {study.testimonialQuote && (
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-primary-900 to-indigo-950 text-white shadow-xl space-y-4">
              <Quote className="w-8 h-8 text-amber-400" />
              <p className="text-lg sm:text-xl italic font-medium leading-relaxed">
                "{study.testimonialQuote}"
              </p>
              {study.testimonialAuthor && (
                <div className="text-sm font-bold text-amber-300 not-italic pt-2">
                  — {study.testimonialAuthor}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dual CTA */}
        <DualCtaBand whatsappNumber={settings.whatsappNumber} />
      </div>
    </div>
  );
}
