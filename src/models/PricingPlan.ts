import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  badge?: string;
  priceMonthly: number;
  priceQuarterly: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  ctaUrl: string;
  popular: boolean;
  order: number;
}

const PricingPlanSchema: Schema<IPricingPlan> = new Schema(
  {
    name: { type: String, required: true },
    badge: { type: String, default: '' },
    priceMonthly: { type: Number, required: true },
    priceQuarterly: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    notIncluded: { type: [String], default: [] },
    ctaText: { type: String, default: 'Schedule Strategy Call' },
    ctaUrl: { type: String, default: '/contact' },
    popular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PricingPlan: Model<IPricingPlan> = mongoose.models.PricingPlan || mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema);
