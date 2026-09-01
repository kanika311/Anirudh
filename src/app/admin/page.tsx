'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  Search,
  FileText,
  DollarSign,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Lead } from '@/types';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminDashboardOverview() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newLeadCount, setNewLeadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('admin_token') || '';
    if (!token) return;

    try {
      const res = await api.adminGetLeads(token);
      if (res.success) {
        setLeads(res.data || []);
        setNewLeadCount(res.newCount || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    const token = localStorage.getItem('admin_token') || '';
    try {
      await api.adminUpdateLeadStatus(token, leadId, newStatus);
      toast.success(`Lead marked as ${newStatus}`);
      fetchDashboardData();
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Consultancy Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time inquiries, pipeline health, and content management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={api.getLeadsCsvExportUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Leads to CSV</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Inbound Leads
            </span>
            <Users className="w-5 h-5 text-primary-400" />
          </div>
          <div className="text-3xl font-black text-white">{leads.length}</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{newLeadCount} New Inquiries Awaiting Reply</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Practices
            </span>
            <Search className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">6</div>
          <div className="text-xs text-slate-400">SEO, PPC, CRO, Web Dev, Local, CMO</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Case Studies
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">3</div>
          <div className="text-xs text-slate-400">B2B SaaS, D2C & Local Clinic</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Published Insights
            </span>
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">4</div>
          <div className="text-xs text-slate-400">SEO, PPC & CRO Playbooks</div>
        </div>
      </div>

      {/* Recent Inbound Leads Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">Recent Inbound Client Inquiries</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-950 text-primary-400 border border-primary-800">
              {leads.length} Total
            </span>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-primary-400 hover:text-primary-300 flex items-center gap-1"
          >
            <span>Manage All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">No leads recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Prospect</th>
                  <th className="pb-3 font-semibold">Service Needed</th>
                  <th className="pb-3 font-semibold">Website</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4">
                      <div className="font-bold text-white">{lead.name}</div>
                      <div className="text-slate-400">{lead.email}</div>
                    </td>
                    <td className="py-4 text-slate-300 font-medium">
                      {lead.serviceNeeded}
                    </td>
                    <td className="py-4">
                      {lead.websiteUrl ? (
                        <a
                          href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary-400 hover:underline"
                        >
                          {lead.websiteUrl.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-4 text-slate-300">{lead.monthlyBudget || '—'}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === 'new'
                            ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                            : lead.status === 'contacted'
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                            : lead.status === 'in_progress'
                            ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-800'
                            : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/services"
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-500 transition-all flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white"
        >
          <span>Manage Practice Scopes</span>
          <ArrowRight className="w-4 h-4 text-primary-400" />
        </Link>
        <Link
          href="/admin/blog"
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-500 transition-all flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white"
        >
          <span>Author New SEO Article</span>
          <ArrowRight className="w-4 h-4 text-primary-400" />
        </Link>
        <Link
          href="/admin/settings"
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-500 transition-all flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white"
        >
          <span>Configure Hero Stats & WhatsApp</span>
          <ArrowRight className="w-4 h-4 text-primary-400" />
        </Link>
      </div>
    </div>
  );
}
