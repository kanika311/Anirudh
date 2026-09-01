import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Lead } from '@/models/Lead';
import { sendLeadNotification } from '@/lib/mailer';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  websiteUrl: z.string().optional(),
  serviceNeeded: z.string().min(2, 'Service needed is required'),
  monthlyBudget: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  source: z.string().optional(),
});

// GET /api/leads - Protected admin endpoint
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({
        success: true,
        count: 0,
        newCount: 0,
        data: [],
      });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const service = searchParams.get('service');

    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (service && service !== 'all') {
      filter.serviceNeeded = service;
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    const count = await Lead.countDocuments(filter);
    const newCount = await Lead.countDocuments({ status: 'new' });

    return NextResponse.json({
      success: true,
      count,
      newCount,
      data: leads,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/leads - Public audit & contact form endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';

    const conn = await connectDB();
    let leadId = 'lead-' + Date.now();

    if (conn) {
      const lead = await Lead.create({
        ...validatedData,
        ipAddress,
      });
      leadId = lead._id.toString();
    }

    // Asynchronously trigger notification
    sendLeadNotification(validatedData).catch((err) =>
      console.error('Lead email background err:', err)
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your audit & consultation request has been received. Alex will get back to you within 24 hours.',
        leadId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message || 'Error submitting lead' }, { status: 500 });
  }
}
