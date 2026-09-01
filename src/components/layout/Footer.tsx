'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>({
    consultantName: 'Alex Rivera',
    tagline: 'Senior Growth & Technical SEO Consultant',
    consultantInitials: 'AR',
    logoUrl: '',
    contactEmail: 'alex@apexconsulting.com',
    contactPhone: '+1 (415) 890-3421',
    address: '500 Howard Street, Suite 400, San Francisco, CA 94105',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexriveragrowth',
      twitter: 'https://twitter.com/alexriveraseo',
      github: 'https://github.com/alexrivera',
      youtube: 'https://youtube.com/@alexriveragrowth',
    },
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSettings(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 dark:bg-[#070A11] text-slate-300 border-t border-slate-800">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-primary-950/60 text-primary-400 border border-primary-800/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Direct Senior Execution</h4>
                <p className="text-xs text-slate-400">Zero junior hand-offs or account manager fluff</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  {settings.heroCounters?.yearsExperience || 10}+ Years & {settings.heroCounters?.revenueGenerated || '$48M+'} Scaled
                </h4>
                <p className="text-xs text-slate-400">Proven track record across SaaS, D2C & Local</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Performance Guarantee</h4>
                <p className="text-xs text-slate-400">Month-to-month contracts. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.consultantName || 'Logo'}
                  className="w-10 h-10 rounded-xl object-contain shadow-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {settings.consultantInitials || 'AR'}
                </div>
              )}
              <div>
                <div className="font-extrabold text-xl text-white">{settings.consultantName || 'Alex Rivera'}</div>
                <p className="text-xs text-slate-400">{settings.tagline || 'Senior Growth & Technical SEO Consultant'}</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Helping venture-backed tech startups, e-commerce powerhouses, and high-ticket service brands dominate organic search, maximize paid ROAS, and scale enterprise revenue.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 1: Services */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Core Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/seo" className="hover:text-white transition-colors">
                  Technical SEO Audits
                </Link>
              </li>
              <li>
                <Link href="/services/paid-ads" className="hover:text-white transition-colors">
                  Google & Meta Ads
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-white transition-colors">
                  Social Media Authority
                </Link>
              </li>
              <li>
                <Link href="/services/conversion-rate-optimization" className="hover:text-white transition-colors">
                  CRO & Funnel UX
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="hover:text-white transition-colors">
                  Next.js Web Speed
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Evidence */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Case Studies</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/case-studies/saas-pipeline-scaling" className="hover:text-white transition-colors">
                  SaaS ARR +340%
                </Link>
              </li>
              <li>
                <Link href="/case-studies/lumina-skin-d2c-scaling" className="hover:text-white transition-colors">
                  Lumina Skin (8.4x ROAS)
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us" className="hover:text-white transition-colors">
                  Consultant vs Agency
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About {settings.consultantName || 'Alex'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Direct */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Direct Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 mt-0.5" />
                <a href={`mailto:${settings.contactEmail || 'alex@apexconsulting.com'}`} className="hover:text-white transition-colors">
                  {settings.contactEmail || 'alex@apexconsulting.com'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 mt-0.5" />
                <a href={`tel:${settings.contactPhone || '+14158903421'}`} className="hover:text-white transition-colors">
                  {settings.contactPhone || '+1 (415) 890-3421'}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>{settings.address || 'San Francisco, CA & Worldwide'}</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-xs text-slate-500 hover:text-slate-400 underline transition-colors"
                >
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {settings.consultantName || 'Alex Rivera'}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-slate-400 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              XML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
