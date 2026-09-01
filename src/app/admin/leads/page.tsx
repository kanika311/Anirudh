'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Lead } from '@/types';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    const token = localStorage.getItem('admin_token') || '';
    if (!token) return;
    setLoading(true);

    try {
      const res = await api.adminGetLeads(token, filterStatus);
      if (res.success) {
        setLeads(res.data || []);
      }
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    const token = localStorage.getItem('admin_token') || '';
    try {
      await api.adminUpdateLeadStatus(token, leadId, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchLeads();
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead record?')) return;
    const token = localStorage.getItem('admin_token') || '';
    try {
      await api.adminDeleteLead(token, leadId);
      toast.success('Lead deleted');
      setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      toast.error('Failed to delete lead');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Client Inquiries & Pipeline Management
          </h1>
          <p className="text-xs text-slate-400">
            View, filter, update status, and export all inbound consultation requests.
          </p>
        </div>

        <a
          href={api.getLeadsCsvExportUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export All Leads to CSV</span>
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'new', 'contacted', 'in_progress', 'converted', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
              filterStatus === status
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main Grid: Leads Table + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table View (8 cols) */}
        <div className={`rounded-3xl bg-slate-900 border border-slate-800 p-6 overflow-hidden ${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No leads found under this filter.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Prospect</th>
                    <th className="pb-3 font-semibold">Service</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      onClick={() => setSelectedLead(lead)}
                      className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        selectedLead?._id === lead._id ? 'bg-slate-800/80' : ''
                      }`}
                    >
                      <td className="py-3.5">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-slate-400">{lead.email}</div>
                      </td>
                      <td className="py-3.5 text-slate-300 font-medium">{lead.serviceNeeded}</td>
                      <td className="py-3.5 text-slate-400">{formatDate(lead.createdAt)}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
                      <td className="py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLead(lead._id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Detail Panel (5 cols) */}
        {selectedLead && (
          <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-extrabold text-lg text-white">{selectedLead.name}</h3>
                <p className="text-xs text-slate-400">{selectedLead.email}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Status
                </span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead._id, e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-xs rounded-xl p-2.5 text-white"
                >
                  <option value="new">New (Awaiting Reply)</option>
                  <option value="contacted">Contacted / Video Sent</option>
                  <option value="in_progress">In Progress (Proposal Sent)</option>
                  <option value="converted">Converted (Signed Retainer)</option>
                  <option value="closed">Closed / Junk</option>
                </select>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Website URL
                </span>
                {selectedLead.websiteUrl ? (
                  <a
                    href={selectedLead.websiteUrl.startsWith('http') ? selectedLead.websiteUrl : `https://${selectedLead.websiteUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>{selectedLead.websiteUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-500">Not provided</span>
                )}
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Phone / WhatsApp
                </span>
                <span className="text-slate-200">{selectedLead.phone || 'Not provided'}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Budget
                </span>
                <span className="text-slate-200">{selectedLead.monthlyBudget || 'Unspecified'}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Message / Growth Goals
                </span>
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <a
                href={`mailto:${selectedLead.email}?subject=Your%20Growth%20Audit%20Review`}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary-600 hover:bg-primary-500 text-white"
              >
                Send Email Reply
              </a>
              <button
                onClick={() => handleDeleteLead(selectedLead._id)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/60"
              >
                Delete Lead
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
