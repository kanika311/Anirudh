import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { CaseStudy } from '@/models/CaseStudy';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }
    const caseStudies = await CaseStudy.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, count: caseStudies.length, data: caseStudies });
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
      return NextResponse.json({ success: true, message: 'Case study created in preview mode', data: { ...body, _id: Date.now().toString() } }, { status: 201 });
    }

    const caseStudy = await CaseStudy.create(body);
    return NextResponse.json({ success: true, message: 'Case study created successfully', data: caseStudy }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
