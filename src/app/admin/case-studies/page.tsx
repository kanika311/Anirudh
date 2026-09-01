'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ArrowRight, X, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { CaseStudy } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: 'SaaSFlow Analytics',
    clientIndustry: 'B2B SaaS',
    timeframe: '6 Months',
    summary: '',
    challenge: '',
    strategy: '',
    results: 'Generated $3.2M pipeline\nReduced CAC by 42%',
    metricLabel1: 'Organic MRR Pipeline',
    metricBefore1: '$420K',
    metricAfter1: '$3.2M',
    metricChange1: '+662%',
    metricLabel2: 'Demo Conversion Rate',
    metricBefore2: '1.4%',
    metricAfter2: '4.8%',
    metricChange2: '+242%',
    testimonialQuote: '',
    testimonialAuthor: '',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
  });

  const fetchStudies = async () => {
    setLoading(true);
    try {
      const data = await api.getCaseStudies();
      setStudies(data || []);
    } catch (e) {
      toast.error('Failed to load case studies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const openCreateModal = () => {
    setEditingStudy(null);
    setFormData({
      title: '',
      slug: '',
      client: 'SaaSFlow Analytics',
      clientIndustry: 'B2B SaaS',
      timeframe: '6 Months',
      summary: '',
      challenge: '',
      strategy: '',
      results: 'Generated $3.2M pipeline\nReduced CAC by 42%',
      metricLabel1: 'Organic MRR Pipeline',
      metricBefore1: '$420K',
      metricAfter1: '$3.2M',
      metricChange1: '+662%',
      metricLabel2: 'Demo Conversion Rate',
      metricBefore2: '1.4%',
      metricAfter2: '4.8%',
      metricChange2: '+242%',
      testimonialQuote: '',
      testimonialAuthor: '',
      coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    });
    setModalOpen(true);
  };

  const openEditModal = (study: CaseStudy) => {
    setEditingStudy(study);
    const m1 = study.metrics?.[0] || { label: '', before: '', after: '', change: '' };
    const m2 = study.metrics?.[1] || { label: '', before: '', after: '', change: '' };

    setFormData({
      title: study.title,
      slug: study.slug,
      client: study.client || 'Client',
      clientIndustry: study.clientIndustry,
      timeframe: study.timeframe,
      summary: study.summary,
      challenge: study.challenge,
      strategy: study.strategy,
      results: Array.isArray(study.results) ? study.results.join('\n') : '',
      metricLabel1: m1.label,
      metricBefore1: m1.before,
      metricAfter1: m1.after,
      metricChange1: m1.change,
      metricLabel2: m2.label,
      metricBefore2: m2.before,
      metricAfter2: m2.after,
      metricChange2: m2.change,
      testimonialQuote: study.testimonialQuote || '',
      testimonialAuthor: study.testimonialAuthor || '',
      coverImage: study.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingStudy ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error('Title and Slug are required');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('admin_token') || '';

    const metrics = [
      {
        label: formData.metricLabel1 || 'Growth',
        before: formData.metricBefore1 || '0',
        after: formData.metricAfter1 || '0',
        change: formData.metricChange1 || '+100%',
      },
    ];

    if (formData.metricLabel2) {
      metrics.push({
        label: formData.metricLabel2,
        before: formData.metricBefore2 || '0',
        after: formData.metricAfter2 || '0',
        change: formData.metricChange2 || '+100%',
      });
    }

    const payload = {
      title: formData.title,
      slug: formData.slug.toLowerCase().trim(),
      client: formData.client,
      clientIndustry: formData.clientIndustry,
      timeframe: formData.timeframe,
      summary: formData.summary,
      challenge: formData.challenge,
      strategy: formData.strategy,
      results: formData.results.split('\n').map((r) => r.trim()).filter(Boolean),
      metrics,
      coverImage: formData.coverImage,
      testimonialQuote: formData.testimonialQuote,
      testimonialAuthor: formData.testimonialAuthor,
    };

    try {
      if (editingStudy) {
        const idOrSlug = editingStudy._id || editingStudy.slug;
        const res = await api.adminUpdateCaseStudy(token, idOrSlug, payload);
        if (res.success) {
          toast.success('Case study updated successfully!');
          setModalOpen(false);
          fetchStudies();
        } else {
          toast.error(res.message || 'Failed to update case study');
        }
      } else {
        const res = await api.adminCreateCaseStudy(token, payload);
        if (res.success) {
          toast.success('Case study created!');
          setModalOpen(false);
          fetchStudies();
        } else {
          toast.error(res.message || 'Failed to create case study');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (study: CaseStudy) => {
    if (!window.confirm(`Are you sure you want to delete "${study.title}"?`)) return;

    const token = localStorage.getItem('admin_token') || '';
    const idOrSlug = study._id || study.slug;

    try {
      const res = await api.adminDeleteCaseStudy(token, idOrSlug);
      if (res.success) {
        toast.success('Case study deleted successfully');
        setStudies((prev) => prev.filter((s) => (s._id || s.slug) !== idOrSlug));
      } else {
        toast.error(res.message || 'Failed to delete case study');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error deleting case study');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Case Studies Manager
          </h1>
          <p className="text-xs text-slate-400">
            Showcase before/after analytics, client stories, and verifiable ROI metrics.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading case studies...</div>
      ) : studies.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400 bg-slate-900/50 rounded-3xl border border-slate-800">
          No case studies found. Click "Add New Case Study" to showcase client growth!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <div
              key={study._id || study.slug}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {study.clientIndustry}
                  </span>
                  <span className="text-xs text-slate-400">{study.timeframe}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{study.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {study.summary}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  {study.metrics?.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-800/60 text-center">
                      <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                      <div className="text-xs font-bold text-emerald-400">{m.after}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/case-studies/${study.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-primary-400 hover:underline flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(study)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Case Study"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(study)}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors border border-rose-900/30"
                    title="Delete Case Study"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span>{editingStudy ? 'Edit Case Study' : 'Create New Case Study'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Case Study Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Scaling B2B SaaS ARR by 340%"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. scaling-b2b-saas-arr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Client Name</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="SaaSFlow Analytics"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Industry</label>
                  <input
                    type="text"
                    value={formData.clientIndustry}
                    onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="B2B SaaS"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Timeframe</label>
                  <input
                    type="text"
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="6 Months"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="High-level overview of the engagement and outcome..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">The Challenge</label>
                  <textarea
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="What problems was the client facing?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">The Strategy & Execution</label>
                  <textarea
                    rows={3}
                    value={formData.strategy}
                    onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="What solutions and campaigns were implemented?"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Case Study Cover Image"
                  value={formData.coverImage}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Metric 1 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="text-xs font-bold text-emerald-400">Primary Impact Metric #1</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Label (e.g. Pipeline)"
                    value={formData.metricLabel1}
                    onChange={(e) => setFormData({ ...formData, metricLabel1: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Before (e.g. $400K)"
                    value={formData.metricBefore1}
                    onChange={(e) => setFormData({ ...formData, metricBefore1: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="After (e.g. $3.2M)"
                    value={formData.metricAfter1}
                    onChange={(e) => setFormData({ ...formData, metricAfter1: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Change (e.g. +662%)"
                    value={formData.metricChange1}
                    onChange={(e) => setFormData({ ...formData, metricChange1: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="text-xs font-bold text-emerald-400">Secondary Impact Metric #2</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Label (e.g. CAC)"
                    value={formData.metricLabel2}
                    onChange={(e) => setFormData({ ...formData, metricLabel2: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Before"
                    value={formData.metricBefore2}
                    onChange={(e) => setFormData({ ...formData, metricBefore2: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="After"
                    value={formData.metricAfter2}
                    onChange={(e) => setFormData({ ...formData, metricAfter2: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Change"
                    value={formData.metricChange2}
                    onChange={(e) => setFormData({ ...formData, metricChange2: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-lg shadow-primary-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingStudy ? 'Update Case Study' : 'Save Case Study'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
