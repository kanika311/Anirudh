'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UserCheck,
  TrendingUp,
  LayoutDashboard,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface WhyChooseUsProps {
  settings?: SiteSettings;
}

export function WhyChooseUs({ settings }: WhyChooseUsProps) {
  const name = settings?.consultantName || 'Alex Rivera';

  const features = [
    {
      icon: UserCheck,
      title: '100% Direct Senior Execution',
      desc: `You work directly with ${name}. No junior coordinators, no communication telephone game, and no bloated agency overhead.`,
    },
    {
      icon: TrendingUp,
      title: 'Obsessed with Commercial Revenue',
      desc: 'We optimize for qualified sales pipeline, lower blended CAC, and high-intent conversions — not vanity traffic graphs.',
    },
    {
      icon: LayoutDashboard,
      title: '24/7 Transparent Live Reporting',
      desc: 'Custom Google Looker Studio dashboards giving you real-time visibility into keyword movements, ad ROAS, and pipeline attribution.',
    },
    {
      icon: Zap,
      title: 'Agile Velocity & Flexible Terms',
      desc: 'Rapid weekly execution sprints with flexible month-to-month retainers. We earn your business continuously through tangible ROI.',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            {settings?.whyChooseBadge || 'The Consultant Advantage'}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {settings?.whyChooseHeading || 'Why High-Growth Founders Choose a Solo Senior Partner'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {settings?.whyChooseSubheading ||
              'Traditional marketing agencies are structurally misaligned. Here is why the solo consulting model yields 3x faster execution and vastly superior ROI.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Pill */}
        <div className="text-center">
          <Link
            href="/why-choose-us"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-slate-100 dark:bg-dark-card hover:bg-primary-50 dark:hover:bg-primary-950/40 text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 border border-slate-200 dark:border-dark-border transition-all"
          >
            <span>See Detailed Side-by-Side Model Comparison (Me vs Agency)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
