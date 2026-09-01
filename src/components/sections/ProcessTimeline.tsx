'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Code2,
  Activity,
  LineChart,
  Sparkles,
} from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Audit & Competitor Teardown',
    desc: 'We perform an exhaustive 120-point crawl of your site architecture, Core Web Vitals, backlink profile, and high-intent competitor keyword opportunities.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Bespoke Strategy Blueprint',
    desc: 'We map out a prioritized 90-day growth roadmap, commercial topic clusters, paid media testing matrix, and target conversion benchmarks.',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Agile Sprint Implementation',
    desc: 'We deploy technical fixes, programmatic landing pages, Schema graphs, and high-converting ad creatives with weekly continuous releases.',
  },
  {
    step: '04',
    icon: Activity,
    title: 'Continuous Multivariate CRO',
    desc: 'We run structured A/B tests on value propositions, form friction, headline hooks, and checkout flows to maximize visitor-to-customer conversion.',
  },
  {
    step: '05',
    icon: LineChart,
    title: 'Weekly Transparent ROI Reporting',
    desc: 'Every week you receive clear, actionable performance metrics linked directly to closed pipeline, CAC, and ARR growth via your 24/7 Looker Studio portal.',
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" className="py-20 md:py-28 bg-slate-50/50 dark:bg-dark-surface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
            <Sparkles className="w-3.5 h-3.5" />
            Execution Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 5-Step <span className="text-gradient">Growth Engine</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A battle-tested methodology engineered to systematically eliminate customer acquisition bottlenecks and scale ARR.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex flex-col p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary-500/40 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
