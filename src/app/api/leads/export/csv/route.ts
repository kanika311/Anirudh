import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Lead } from '@/models/Lead';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();

    const headers = [
      'Lead ID',
      'Date',
      'Name',
      'Email',
      'Phone',
      'Website',
      'Service Needed',
      'Budget',
      'Status',
      'Notes',
      'Message',
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((lead: any) => [
      escapeCsv(lead._id),
      escapeCsv(new Date(lead.createdAt).toISOString()),
      escapeCsv(lead.name),
      escapeCsv(lead.email),
      escapeCsv(lead.phone || ''),
      escapeCsv(lead.websiteUrl || ''),
      escapeCsv(lead.serviceNeeded || ''),
      escapeCsv(lead.monthlyBudget || ''),
      escapeCsv(lead.status || ''),
      escapeCsv(lead.notes || ''),
      escapeCsv(lead.message || ''),
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\r\n');

    const dateStr = new Date().toISOString().slice(0, 10);
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-export-${dateStr}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'CSV export failed: ' + error.message }, { status: 500 });
  }
}
