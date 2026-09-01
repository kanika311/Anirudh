'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Key,
  UserPlus,
  Users,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Shield,
  User,
  Mail,
  Calendar,
} from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminSecurityPage() {
  const [activeTab, setActiveTab] = useState<'password' | 'admins'>('password');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminsList, setAdminsList] = useState<AdminUser[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Create Admin Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'superadmin' | 'editor'>('admin');
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  // Reset Admin Password Modal State
  const [resetModalAdmin, setResetModalAdmin] = useState<AdminUser | null>(null);
  const [resetAdminNewPassword, setResetAdminNewPassword] = useState('');
  const [resettingPassword, setResettingPassword] = useState(false);

  // Delete Admin State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token') || '';
    if (token) {
      api.adminGetMe(token).then((res) => {
        if (res.success && res.admin) {
          setCurrentUser(res.admin);
        }
      });
      loadAdmins(token);
    }
  }, []);

  const loadAdmins = async (token?: string) => {
    const authToken = token || localStorage.getItem('admin_token') || '';
    if (!authToken) return;
    setLoadingAdmins(true);
    try {
      const res = await api.adminGetAdmins(authToken);
      if (res.success && res.data) {
        setAdminsList(res.data);
      }
    } catch {
      toast.error('Failed to load admin accounts');
    } finally {
      setLoadingAdmins(false);
    }
  };

  // Handle Current User Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    const token = localStorage.getItem('admin_token') || '';
    if (!token) {
      toast.error('Session expired. Please sign in again.');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await api.adminChangePassword(token, currentPassword, newPassword);
      if (res.success) {
        toast.success(res.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res.message || 'Failed to change password');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while changing password');
    } finally {
      setSavingPassword(false);
    }
  };

  // Handle Create New Admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAdminName || !newAdminEmail || !newAdminPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (newAdminPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const token = localStorage.getItem('admin_token') || '';
    setCreatingAdmin(true);

    try {
      const res = await api.adminCreateAdmin(token, {
        name: newAdminName,
        email: newAdminEmail,
        password: newAdminPassword,
        role: newAdminRole,
      });

      if (res.success) {
        toast.success(res.message || 'New admin account created successfully!');
        setNewAdminName('');
        setNewAdminEmail('');
        setNewAdminPassword('');
        setNewAdminRole('admin');
        setShowCreateModal(false);
        loadAdmins();
      } else {
        toast.error(res.message || 'Failed to create admin');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error creating admin');
    } finally {
      setCreatingAdmin(false);
    }
  };

  // Handle Reset Password for an Admin
  const handleResetAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalAdmin) return;

    if (resetAdminNewPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    const token = localStorage.getItem('admin_token') || '';
    setResettingPassword(true);

    try {
      const res = await api.adminUpdateAdmin(token, resetModalAdmin._id, {
        newPassword: resetAdminNewPassword,
      });

      if (res.success) {
        toast.success(`Password for ${resetModalAdmin.name} reset successfully!`);
        setResetModalAdmin(null);
        setResetAdminNewPassword('');
      } else {
        toast.error(res.message || 'Failed to reset password');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error resetting password');
    } finally {
      setResettingPassword(false);
    }
  };

  // Handle Delete Admin
  const handleDeleteAdmin = async (admin: AdminUser) => {
    if (adminsList.length <= 1) {
      toast.error('Cannot delete the only admin account.');
      return;
    }

    if (currentUser && (currentUser.id === admin._id || currentUser.email === admin.email)) {
      toast.error('You cannot delete your own logged-in account.');
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to delete admin "${admin.name}" (${admin.email})?`);
    if (!confirmed) return;

    const token = localStorage.getItem('admin_token') || '';
    setDeletingId(admin._id);

    try {
      const res = await api.adminDeleteAdmin(token, admin._id);
      if (res.success) {
        toast.success('Admin account deleted successfully');
        loadAdmins();
      } else {
        toast.error(res.message || 'Failed to delete admin');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error deleting admin');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-primary-400" />
            <span>Admins & Security Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Change your admin password, create new administrator accounts, and manage team access permissions.
          </p>
        </div>

        {activeTab === 'admins' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-lg shadow-primary-600/30 transition-all self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New Admin</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <button
          onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'password'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Change My Password</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('admins');
            loadAdmins();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'admins'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Admin Accounts ({adminsList.length})</span>
        </button>
      </div>

      {/* TAB 1: CHANGE MY PASSWORD */}
      {activeTab === 'password' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-400" />
                  <span>Update Account Password</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ensure your account is using a strong password with at least 6 characters.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5">
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-primary-500 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-primary-500 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-primary-500 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-[11px] text-rose-400 font-semibold mt-1">Passwords do not match</p>
                  )}
                  {newPassword && confirmPassword && newPassword === confirmPassword && (
                    <p className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-primary-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {savingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Save New Password</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* User Info & Security Tips */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active User Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Currently Logged-In As
              </h3>
              <div className="flex items-center gap-3.5 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                  {currentUser?.name?.slice(0, 2).toUpperCase() || 'AD'}
                </div>
                <div>
                  <div className="font-extrabold text-white text-base">
                    {currentUser?.name || 'Administrator'}
                  </div>
                  <div className="text-xs text-slate-400">{currentUser?.email || 'admin@apexconsulting.com'}</div>
                  <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                    <Shield className="w-3 h-3" />
                    <span>{currentUser?.role || 'admin'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Best Practices */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Security Guidelines</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Use at least 8 characters with a mix of numbers & symbols.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Do not share admin credentials across team members. Create individual accounts instead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Passwords are hashed with bcrypt before storing into the database.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADMIN ACCOUNTS & TEAM MANAGEMENT */}
      {activeTab === 'admins' && (
        <div className="space-y-6">
          {loadingAdmins ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
              <p className="text-xs text-slate-400">Loading admin accounts...</p>
            </div>
          ) : adminsList.length === 0 ? (
            <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <Users className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Additional Admins Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Create new admin accounts to grant team members access to the CMS dashboard.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md"
              >
                Create First Admin
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminsList.map((admin) => {
                const isMe = currentUser && (currentUser.id === admin._id || currentUser.email === admin.email);
                return (
                  <div
                    key={admin._id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                          {admin.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isMe && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-950 text-primary-400 border border-primary-800/60">
                              You
                            </span>
                          )}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              admin.role === 'superadmin'
                                ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                                : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                            }`}
                          >
                            {admin.role}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-white text-base">{admin.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{admin.email}</span>
                        </p>
                      </div>

                      {admin.createdAt && (
                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-600" />
                          <span>Added {new Date(admin.createdAt).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setResetModalAdmin(admin);
                          setResetAdminNewPassword('');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        <Key className="w-3.5 h-3.5 text-primary-400" />
                        <span>Reset Pass</span>
                      </button>

                      {!isMe && adminsList.length > 1 && (
                        <button
                          onClick={() => handleDeleteAdmin(admin)}
                          disabled={deletingId === admin._id}
                          className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/40 transition-colors"
                          title="Delete Admin"
                        >
                          {deletingId === admin._id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODAL: CREATE NEW ADMIN */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary-950 text-primary-400 border border-primary-800">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create New Admin Account</h3>
                  <p className="text-xs text-slate-400">Add a new user with dashboard access</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Initial Password *</label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Role *</label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="admin">Administrator (Full Access)</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="editor">Editor (Content & Leads)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {creatingAdmin ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create Admin</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET ANOTHER ADMIN'S PASSWORD */}
      {resetModalAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary-950 text-primary-400 border border-primary-800">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Reset Password</h3>
                <p className="text-xs text-slate-400">For {resetModalAdmin.name} ({resetModalAdmin.email})</p>
              </div>
            </div>

            <form onSubmit={handleResetAdminPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">New Password *</label>
                <input
                  type="password"
                  required
                  value={resetAdminNewPassword}
                  onChange={(e) => setResetAdminNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setResetModalAdmin(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resettingPassword}
                  className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {resettingPassword ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
