import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { FAQ } from '@/models/FAQ';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const filter = category ? { category } : {};
    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, count: faqs.length, data: faqs });
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
      return NextResponse.json({ success: true, message: 'FAQ created in preview mode', data: { ...body, _id: Date.now().toString() } }, { status: 201 });
    }

    const faq = await FAQ.create(body);
    return NextResponse.json({ success: true, message: 'FAQ created', data: faq }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
