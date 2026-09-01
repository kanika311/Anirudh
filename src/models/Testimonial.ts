import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatar: string;
  initials: string;
  location: string;
  rating: number;
  quote: string;
  metricHighlight?: string;
  serviceProvided?: string;
  featured: boolean;
  order: number;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, default: '' },
    initials: { type: String, default: 'AR' },
    location: { type: String, default: 'San Francisco, CA' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    quote: { type: String, required: true },
    metricHighlight: { type: String, default: '+320% Qualified Leads' },
    serviceProvided: { type: String, default: 'Technical SEO & CRO' },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
