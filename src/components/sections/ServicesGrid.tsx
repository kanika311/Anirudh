'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Share2,
  BarChart3,
  Globe,
  MapPin,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Service } from '@/types';

interface ServicesGridProps {
  services: Service[];
}

const iconMap: Record<string, any> = {
  Search,
  Share2,
  BarChart3,
  Globe,
  MapPin,
  Compass,
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400">
            <Sparkles className="w-3.5 h-3.5" />
            Specialized Practice Areas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            High-Impact Services Built for <span className="text-gradient">Predictable Revenue</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Every engagement is engineered around commercial pipeline, CAC reduction, and domain authority. No vanity metrics or boilerplate checklists.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Search;
            return (
              <motion.div
                key={service._id || service.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col rounded-3xl p-8 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-primary-500/50 dark:hover:border-primary-500/50 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Top Icon & Starting Price */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    From {service.startingPrice}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                  {service.shortDescription}
                </p>

                {/* Deliverables Bullet list */}
                <div className="space-y-2.5 mb-8 border-t border-slate-100 dark:border-slate-800/80 pt-6">
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA Link */}
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center justify-between w-full px-5 py-3 rounded-xl text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-200 group/link"
                >
                  <span>Explore Service Scope</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
