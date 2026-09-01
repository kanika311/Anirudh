'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { PricingPlan } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PricingTableProps {
  plans: PricingPlan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Investment
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Predictable Retainers. <span className="text-gradient">Zero Hidden Markups.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Flexible month-to-month scopes engineered for high ROI. Cancel with 30-day notice anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <div className="p-1 rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-dark-border inline-flex items-center">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-primary-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly Retainer
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'quarterly'
                    ? 'bg-white dark:bg-primary-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Quarterly Growth Sprint</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceQuarterly;
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan._id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-slate-900 text-white dark:bg-dark-card border-2 border-primary-500 shadow-2xl scale-100 lg:scale-105 z-10'
                    : 'bg-white dark:bg-dark-card text-slate-900 dark:text-white border border-slate-200 dark:border-dark-border shadow-md hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-primary-500 to-indigo-500 text-white shadow-md uppercase tracking-wider">
                    {plan.badge || 'Most Popular Choice'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-extrabold tracking-tight">{plan.name}</h3>
                    {!isPopular && plan.badge && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isPopular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black">
                        {formatCurrency(price)}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          isPopular ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        / month
                      </span>
                    </div>
                    {billingCycle === 'quarterly' && (
                      <div className="text-xs text-emerald-500 font-bold mt-1">
                        Billed quarterly (Save {formatCurrency((plan.priceMonthly - plan.priceQuarterly) * 3)} / quarter)
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className={isPopular ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>
                          {feat}
                        </span>
                      </div>
                    ))}

                    {/* Exclusions if any */}
                    {plan.notIncluded &&
                      plan.notIncluded.map((notFeat, nfIdx) => (
                        <div
                          key={nfIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 dark:text-slate-600 opacity-60 line-through"
                        >
                          <X className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <span>{notFeat}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={plan.ctaUrl || '/contact'}
                  className={`w-full text-center py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-slate-100 hover:bg-primary-600 hover:text-white dark:bg-slate-800 dark:hover:bg-primary-600 text-slate-900 dark:text-white'
                  }`}
                >
                  <span>{plan.ctaText || 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
