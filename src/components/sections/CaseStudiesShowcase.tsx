'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ArrowRight,
  Sparkles,
  Quote,
  Building2,
  Calendar,
} from 'lucide-react';
import { CaseStudy } from '@/types';

interface CaseStudiesShowcaseProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesShowcase({ caseStudies }: CaseStudiesShowcaseProps) {
  const featured = caseStudies.slice(0, 3);

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-slate-50/50 dark:bg-dark-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Real Data. Real Pipelines. <span className="text-gradient">Verified Growth</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Explore how our bespoke search and acquisition frameworks transform unit economics for market leaders.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-bold text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {featured.map((study, idx) => (
            <motion.div
              key={study._id || study.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Image & Metadata */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                <Image
                  src={study.coverImage}
                  alt={study.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-sm">
                    {study.clientIndustry}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-600 text-white shadow-sm">
                    {study.timeframe}
                  </span>
                </div>
              </div>

              {/* Right Column: Case Story & Metric Pairs */}
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Client: {study.client}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {/* Before / After Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {study.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface/80 border border-slate-200/60 dark:border-dark-border"
                    >
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        {metric.before}
                      </div>
                      <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        {metric.after}
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial Quote if available */}
                {study.testimonialQuote && (
                  <div className="p-4 rounded-2xl bg-primary-50/50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30 flex items-start gap-3">
                    <Quote className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                      "{study.testimonialQuote}"
                      {study.testimonialAuthor && (
                        <div className="text-xs font-bold text-slate-900 dark:text-white not-italic mt-1">
                          — {study.testimonialAuthor}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Card CTA */}
                <div className="pt-2">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 group"
                  >
                    <span>Read Full Methodology & Step-By-Step Breakdown</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
