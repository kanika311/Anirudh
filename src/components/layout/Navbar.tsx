'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Share2,
  BarChart3,
  Globe,
  MapPin,
  Compass,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [settings, setSettings] = useState<{
    consultantName?: string;
    tagline?: string;
    consultantInitials?: string;
    logoUrl?: string;
  }>({
    consultantName: 'Alex Rivera',
    tagline: 'Growth & SEO Consultant',
    consultantInitials: 'AR',
    logoUrl: '',
  });
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSettings(data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Don't show public navbar in /admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const servicesMenu = [
    {
      title: 'Technical & Organic SEO',
      slug: 'seo',
      desc: 'Architectural audits, schema, and rank domination',
      icon: Search,
    },
    {
      title: 'Performance Paid Ads',
      slug: 'paid-ads',
      desc: 'High ROAS Google & Meta conversion funnels',
      icon: BarChart3,
    },
    {
      title: 'Social Media Growth',
      slug: 'social-media-marketing',
      desc: 'Founder branding and organic distribution',
      icon: Share2,
    },
    {
      title: 'Conversion Web Dev',
      slug: 'web-development',
      desc: 'Blazing Next.js apps with 98+ PageSpeed',
      icon: Globe,
    },
    {
      title: 'City-Specific & Local SEO',
      slug: 'local-marketing',
      desc: 'Top 3 Map Pack rankings and regional lead capture',
      icon: MapPin,
    },
    {
      title: 'Fractional CMO Advisory',
      slug: 'consulting',
      desc: 'C-Suite GTM roadmap and executive marketing guidance',
      icon: Compass,
    },
  ];

  const resultsMenu = [
    {
      title: 'Client Case Studies',
      href: '/case-studies',
      desc: 'Real verified metrics & $45M+ revenue breakdown',
      icon: TrendingUp,
    },
    {
      title: 'Client Testimonials',
      href: '/testimonials',
      desc: 'Video reviews & feedback from funded founders',
      icon: Users,
    },
    {
      title: 'Growth Benchmarks',
      href: '/results',
      desc: 'Industry performance metrics across SaaS & D2C',
      icon: Award,
    },
  ];

  const aboutMenu = [
    {
      title: `About ${settings.consultantName || 'Alex Rivera'}`,
      href: '/about',
      desc: '10+ years experience scaling high-growth brands',
      icon: Award,
    },
    {
      title: 'Why Choose Us',
      href: '/why-choose-us',
      desc: 'Solo Senior Consultant vs Typical Big Agency',
      icon: CheckCircle2,
    },
    {
      title: 'Our 5-Step Process',
      href: '/#process',
      desc: 'Audit → Strategy → Execution → Optimization → ROI',
      icon: Sparkles,
    },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/85 dark:bg-dark-bg/85 backdrop-blur-md border-b border-slate-200/80 dark:border-dark-border shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.consultantName || 'Logo'}
                className="w-10 h-10 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                {settings.consultantInitials || 'AR'}
              </div>
            )}
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-slate-900 dark:text-white flex items-center gap-1.5">
                {settings.consultantName || 'Alex Rivera'}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for Advisory" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{settings.tagline || 'Growth & SEO Consultant'}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors',
                  activeDropdown === 'services'
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400'
                )}
              >
                Services
                <ChevronDown className={cn('w-4 h-4 transition-transform', activeDropdown === 'services' && 'rotate-180')} />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-[560px] pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="glass-panel dark:bg-dark-surface/95 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-dark-border grid grid-cols-2 gap-2">
                    {servicesMenu.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          href={`/services/${item.slug}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="col-span-2 pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Custom tailored scopes for high-growth brands</span>
                      <Link href="/services/seo" className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                        Explore all services <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('results')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors',
                  activeDropdown === 'results'
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400'
                )}
              >
                Results
                <ChevronDown className={cn('w-4 h-4 transition-transform', activeDropdown === 'results' && 'rotate-180')} />
              </button>

              {activeDropdown === 'results' && (
                <div className="absolute top-full left-0 w-[340px] pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="glass-panel dark:bg-dark-surface/95 rounded-2xl p-3 shadow-xl border border-slate-200 dark:border-dark-border flex flex-col gap-1">
                    {resultsMenu.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors',
                  activeDropdown === 'about'
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400'
                )}
              >
                About
                <ChevronDown className={cn('w-4 h-4 transition-transform', activeDropdown === 'about' && 'rotate-180')} />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-[340px] pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="glass-panel dark:bg-dark-surface/95 rounded-2xl p-3 shadow-xl border border-slate-200 dark:border-dark-border flex flex-col gap-1">
                    {aboutMenu.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions: Theme Toggle & Audit Button */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#audit-form"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 hover:from-primary-700 hover:to-indigo-800 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
              Claim Free Audit
            </Link>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-slate-200 dark:border-dark-border p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-400">Services</div>
            <div className="grid grid-cols-1 gap-1">
              {servicesMenu.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold text-slate-800 dark:text-slate-100"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="font-bold text-xs uppercase tracking-wider text-slate-400 pt-2">Results & Proof</div>
            <div className="grid grid-cols-1 gap-1">
              <Link href="/case-studies" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Case Studies
              </Link>
              <Link href="/testimonials" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Testimonials
              </Link>
              <Link href="/results" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Growth Benchmarks
              </Link>
            </div>

            <div className="font-bold text-xs uppercase tracking-wider text-slate-400 pt-2">Company</div>
            <div className="grid grid-cols-1 gap-1">
              <Link href="/about" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                About {settings.consultantName || 'Alex Rivera'}
              </Link>
              <Link href="/why-choose-us" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Why Choose Us
              </Link>
              <Link href="/pricing" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Pricing & Retainers
              </Link>
              <Link href="/blog" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Growth Blog
              </Link>
              <Link href="/contact" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-sm font-semibold">
                Contact & Office
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <Link
                href="/#audit-form"
                className="w-full text-center py-3 px-4 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md"
              >
                Claim Free Growth Audit
              </Link>
              <a
                href="https://wa.me/14158903421"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3 px-4 rounded-xl font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Chat Directly on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
