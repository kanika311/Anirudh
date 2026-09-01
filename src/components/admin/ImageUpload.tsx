'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Loader2, X, Check } from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  placeholder = 'https://...',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WebP, SVG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('admin_token') || '';

    try {
      const res = await api.uploadImage(token, file);
      if (res.success && res.url) {
        onChange(res.url);
        toast.success('Image uploaded successfully!');
      } else {
        // Client-side fallback to FileReader DataURL
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onChange(e.target.result as string);
            toast.success('Image loaded!');
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      // Fallback to FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result as string);
          toast.success('Image loaded!');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300">{label}</label>
        <button
          type="button"
          onClick={() => setMode(mode === 'upload' ? 'url' : 'upload')}
          className="text-[11px] font-semibold text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
        >
          {mode === 'upload' ? (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Or Enter URL</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-3 h-3" />
              <span>Upload from Device</span>
            </>
          )}
        </button>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {value ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/80 p-2 flex items-center gap-4">
              <div className="w-20 h-16 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 relative border border-slate-700">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{value.split('/').pop() || 'Current Image'}</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3" />
                  <span>Image Selected</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <UploadCloud className="w-3 h-3" />}
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-400 transition-colors"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-primary-500 bg-primary-950/20'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800/60'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center justify-center py-2 space-y-2">
                  <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
                  <p className="text-xs text-slate-300 font-semibold">Uploading media file...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-primary-400">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white">Click to upload photo</span>
                    <span className="text-xs text-slate-400"> or drag and drop</span>
                  </div>
                  <p className="text-[11px] text-slate-500">PNG, JPG, WebP or SVG (Max 5MB)</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <ImageIcon className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      )}
    </div>
  );
}
