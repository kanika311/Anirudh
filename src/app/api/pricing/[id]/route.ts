import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PricingPlan } from '@/models/PricingPlan';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: false, message: 'Database offline' }, { status: 404 });
    }
    const plan = await PricingPlan.findById(params.id);
    if (!plan) {
      return NextResponse.json({ success: false, message: 'Pricing plan not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Pricing plan updated in preview mode', data: { ...body, _id: params.id } });
    }

    const plan = await PricingPlan.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return NextResponse.json({ success: false, message: 'Pricing plan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Pricing plan updated', data: plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Pricing plan deleted in preview mode' });
    }

    const plan = await PricingPlan.findByIdAndDelete(params.id);

    if (!plan) {
      return NextResponse.json({ success: false, message: 'Pricing plan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Pricing plan deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
