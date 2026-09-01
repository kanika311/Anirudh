import mongoose, { Document, Schema, Model } from 'mongoose';

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  serviceNeeded: string;
  monthlyBudget?: string;
  message: string;
  status: LeadStatus;
  notes?: string;
  source?: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    serviceNeeded: { type: String, required: true },
    monthlyBudget: { type: String, default: '$2,500 - $5,000' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'converted', 'closed'],
      default: 'new',
    },
    notes: { type: String, default: '' },
    source: { type: String, default: 'Homepage Audit Form' },
    ipAddress: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
