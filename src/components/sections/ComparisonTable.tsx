'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';

import { SiteSettings } from '@/types';

interface ComparisonTableProps {
  settings?: SiteSettings;
  consultantName?: string;
}

export function ComparisonTable({ settings, consultantName }: ComparisonTableProps) {
  const name = consultantName || settings?.consultantName || 'Alex Rivera';
  const yearsExp = settings?.heroCounters?.yearsExperience || 10;

  const comparisonRows = [
    {
      feature: 'Direct Senior Attention',
      alex: `100% executed personally by ${name} (${yearsExp}+ yrs exp)`,
      agency: 'Pitched by seniors, handed off to junior coordinators',
    },
    {
      feature: 'Execution Velocity',
      alex: 'Rapid same-week sprints & continuous deployment',
      agency: '3 to 6-week turnaround with bureaucratic review tiers',
    },
    {
      feature: 'Bespoke Strategy vs Templates',
      alex: 'Custom data architecture tailored to your unique unit economics',
      agency: 'Generic one-size-fits-all PDF checklists and copy-paste audits',
    },
    {
      feature: 'Contract Terms & Lock-In',
      alex: 'Flexible month-to-month retainers (Earn business every 30 days)',
      agency: '6 to 12-month punitive lock-in contracts with auto-renewal',
    },
    {
      feature: 'Direct Communication Access',
      alex: 'Private Slack channel & direct WhatsApp hotline for founders',
      agency: 'Formal ticketing systems & slow weekly account manager emails',
    },
    {
      feature: 'Technical & Engineering Depth',
      alex: 'Next.js, TypeScript, React schema, server-side CAPI code execution',
      agency: 'Surface-level recommendations without code-level execution',
    },
    {
      feature: 'Client Roster & Focus',
      alex: 'Strictly capped at 6 active enterprise partners at any time',
      agency: 'Account managers juggling 15 to 25 accounts simultaneously',
    },
    {
      feature: 'Success Metric Focus',
      alex: 'Commercial revenue, pipeline ARR, and blended CAC reduction',
      agency: 'Vanity impressions, raw traffic volume, and ranking reports',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            Head-to-Head Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {name} vs. <span className="text-gradient">The Typical Agency</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See why ambitious founders and venture-backed scale-ups choose a dedicated senior partner over bloated agency overhead.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-dark-border bg-slate-50/80 dark:bg-dark-surface/80">
                  <th className="p-5 sm:p-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">
                    Feature & Workflow
                  </th>
                  <th className="p-5 sm:p-6 text-base font-extrabold text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-950/30 w-1/3 border-x border-primary-200/50 dark:border-primary-800/30">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      <span>{name} (Solo Partner)</span>
                    </div>
                  </th>
                  <th className="p-5 sm:p-6 text-base font-bold text-slate-700 dark:text-slate-300 w-1/3">
                    Typical Big Agency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-5 sm:p-6 font-bold text-slate-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="p-5 sm:p-6 bg-primary-50/20 dark:bg-primary-950/10 border-x border-primary-100/50 dark:border-primary-900/20 font-medium text-slate-900 dark:text-slate-100">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{row.alex}</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-slate-500 dark:text-slate-400">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{row.agency}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
