import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PricingPlan } from '@/models/PricingPlan';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }
    const plans = await PricingPlan.find().sort({ order: 1, priceMonthly: 1 });
    return NextResponse.json({ success: true, count: plans.length, data: plans });
  } catch (error: any) {
    return NextResponse.json({ success: true, count: 0, data: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, message: 'Pricing plan created in preview mode', data: { ...body, _id: Date.now().toString() } }, { status: 201 });
    }

    const plan = await PricingPlan.create(body);
    return NextResponse.json({ success: true, message: 'Pricing plan created', data: plan }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
