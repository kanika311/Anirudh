'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Zap,
  Building,
  ShoppingBag,
  Stethoscope,
  Sparkles,
} from 'lucide-react';

const industrySnapshots = [
  {
    icon: Building,
    title: 'B2B SaaS & Tech Scale-Ups',
    tag: 'Enterprise & DevOps',
    metrics: [
      { label: 'Organic Traffic Lift', val: '+1,207%', change: 'From 14k to 185k/mo' },
      { label: 'Blended CAC Reduction', val: '-64.3%', change: 'From $185 to $66' },
      { label: 'Attributable ARR', val: '+$3.6M', change: 'Scaled in 9 months' },
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Direct-to-Consumer Brands',
    tag: 'E-Commerce & Retail',
    metrics: [
      { label: 'Paid Ad Blended ROAS', val: '4.8x', change: 'Scaled from 1.4x' },
      { label: 'Monthly Revenue Jump', val: '+423%', change: '$65k to $340k/mo' },
      { label: 'Average Order Value', val: '+63%', change: 'Post-purchase CRO' },
    ],
  },
  {
    icon: Stethoscope,
    title: 'Multi-Location Health & Services',
    tag: '14 Regional Clinics',
    metrics: [
      { label: 'Map Pack #1-3 Dominance', val: '88%', change: 'Across all target cities' },
      { label: 'Booked Appointments', val: '+520%', change: 'From 65 to 403/mo' },
      { label: 'Cost Per Acquired Patient', val: '-73.2%', change: 'From $142 to $38' },
    ],
  },
];

export function ResultsMetrics() {
  return (
    <section id="results" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            Industry Performance Snapshots
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Proven Results Across <span className="text-gradient">Core Verticals</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            High-intent search capture and conversion engineering deliver repeatable, compounding returns regardless of market conditions.
          </p>
        </div>

        {/* 3 Industry Snapshot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industrySnapshots.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    {item.title}
                  </h3>

                  <div className="space-y-4">
                    {item.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-slate-800/80"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {m.label}
                          </span>
                          <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                            {m.val}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {m.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
