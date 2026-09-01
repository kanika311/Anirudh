import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/Admin';
import { generateToken } from '@/lib/auth';
import { seedDatabase } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const conn = await connectDB();

    if (conn) {
      try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
          console.log('⚡ Initializing database seed for admin credentials...');
          await seedDatabase();
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
        if (admin) {
          const isMatch = await admin.comparePassword(password);
          if (isMatch) {
            const token = generateToken(admin._id.toString(), admin.email, admin.role);
            const response = NextResponse.json({
              success: true,
              message: 'Login successful',
              token,
              admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
              },
            });

            response.cookies.set('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 7 * 24 * 60 * 60,
              path: '/',
              sameSite: 'lax',
            });

            return response;
          }
        }
      } catch (dbErr) {
        console.warn('DB query error during login, checking configured env admin fallback:', (dbErr as Error).message);
      }
    }

    // Fallback: Check configured environment admin credentials
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@apexconsulting.com').toLowerCase();
    const envAdminPass = process.env.ADMIN_PASSWORD || 'Admin@123456';

    if (email.toLowerCase() === envAdminEmail && password === envAdminPass) {
      const token = generateToken('admin-local-id', envAdminEmail, 'admin');
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: 'admin-local-id',
          name: 'Alex Rivera',
          email: envAdminEmail,
          role: 'admin',
        },
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message || 'Server error during login' }, { status: 500 });
  }
}
