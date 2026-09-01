'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, ArrowRight, X, Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { Service } from '@/types';
import toast from 'react-hot-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    startingPrice: 'From $3,500/mo',
    targetAudience: 'B2B SaaS, E-Commerce, Scale-ups',
    deliverables: 'Full Technical Audit\nCore Web Vitals Roadmap\nSchema Architecture',
    benefits: '3x Organic Traffic Growth\n50% CAC Reduction',
    order: 0,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await api.getServices();
      setServices(data || []);
    } catch (e) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      startingPrice: 'From $3,500/mo',
      targetAudience: 'B2B SaaS, E-Commerce, Scale-ups',
      deliverables: 'Full Technical Audit\nCore Web Vitals Roadmap\nSchema Architecture',
      benefits: '3x Organic Traffic Growth\n50% CAC Reduction',
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      startingPrice: service.startingPrice || 'From $3,500/mo',
      targetAudience: service.targetAudience || 'B2B SaaS, E-Commerce',
      deliverables: Array.isArray(service.deliverables) ? service.deliverables.join('\n') : '',
      benefits: Array.isArray(service.benefits) ? service.benefits.join('\n') : '',
      order: service.order || 0,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingService ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
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

    const payload = {
      title: formData.title,
      slug: formData.slug.toLowerCase().trim(),
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      startingPrice: formData.startingPrice,
      targetAudience: formData.targetAudience,
      deliverables: formData.deliverables.split('\n').map((d) => d.trim()).filter(Boolean),
      benefits: formData.benefits.split('\n').map((b) => b.trim()).filter(Boolean),
      order: Number(formData.order) || 0,
    };

    try {
      if (editingService) {
        const idOrSlug = editingService._id || editingService.slug;
        const res = await api.adminUpdateService(token, idOrSlug, payload);
        if (res.success) {
          toast.success('Service updated successfully!');
          setModalOpen(false);
          fetchServices();
        } else {
          toast.error(res.message || 'Failed to update service');
        }
      } else {
        const res = await api.adminCreateService(token, payload);
        if (res.success) {
          toast.success('Service practice created!');
          setModalOpen(false);
          fetchServices();
        } else {
          toast.error(res.message || 'Failed to create service');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (service: Service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.title}"?`)) return;

    const token = localStorage.getItem('admin_token') || '';
    const idOrSlug = service._id || service.slug;

    try {
      const res = await api.adminDeleteService(token, idOrSlug);
      if (res.success) {
        toast.success('Service deleted successfully');
        setServices((prev) => prev.filter((s) => (s._id || s.slug) !== idOrSlug));
      } else {
        toast.error(res.message || 'Failed to delete service');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error deleting service');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Consulting Practice Scopes
          </h1>
          <p className="text-xs text-slate-400">
            Manage practice titles, deliverables, target audiences, and custom SEO meta tags.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Practice</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400 bg-slate-900/50 rounded-3xl border border-slate-800">
          No services found. Click "Add New Practice" to create your first offering!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id || service.slug}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-950 text-primary-400 border border-primary-800">
                    /{service.slug}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{service.startingPrice}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                <div className="space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Deliverables ({service.deliverables?.length || 0}):
                  </div>
                  {service.deliverables?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="truncate flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/services/${service.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-primary-400 hover:underline flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service)}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors border border-rose-900/30"
                    title="Delete Service"
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
                <span>{editingService ? 'Edit Practice Scope' : 'Add New Consulting Practice'}</span>
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
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Technical SEO & Core Web Vitals"
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
                    placeholder="e.g. technical-seo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Starting Price</label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="From $3,500/mo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Audience</label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. B2B SaaS Founders & Growth Leads"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Card Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Concise 1-2 sentence overview for the cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="In-depth explanation displayed on the dedicated service subpage..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Key Deliverables (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none font-mono"
                  placeholder="Full Technical SEO Audit&#10;Core Web Vitals Roadmap&#10;Structured Schema Architecture"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Key Business Benefits (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none font-mono"
                  placeholder="300% Higher High-Intent Organic Traffic&#10;50% Lower Customer Acquisition Cost"
                />
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
                  <span>{editingService ? 'Update Practice' : 'Save Practice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
