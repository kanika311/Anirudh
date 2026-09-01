import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await seedDatabase();
    return NextResponse.json({ success: true, message: 'Database successfully seeded with initial marketing consultant data & admin account!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Seeding failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ success: true, message: 'Database successfully seeded with initial marketing consultant data & admin account!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Seeding failed' }, { status: 500 });
  }
}
