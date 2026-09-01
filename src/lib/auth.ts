import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from './db';
import { Admin, IAdmin } from '../models/Admin';

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(id: string, email: string, role: string): string {
  const secret = process.env.JWT_SECRET || 'alex_rivera_growth_jwt_secret_key_2025';
  return jwt.sign({ id, email, role }, secret, { expiresIn: '7d' });
}

export async function verifyAuth(request: NextRequest): Promise<{ admin: IAdmin; payload: AuthPayload } | null> {
  try {
    let token: string | undefined;

    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieToken = request.cookies.get('token')?.value;
      if (cookieToken) {
        token = cookieToken;
      }
    }

    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET || 'alex_rivera_growth_jwt_secret_key_2025';
    const decoded = jwt.verify(token, secret) as AuthPayload;

    const conn = await connectDB();
    if (!conn) {
      const fallbackAdmin = {
        _id: decoded.id,
        name: 'Alex Rivera',
        email: decoded.email,
        role: decoded.role,
      } as unknown as IAdmin;
      return { admin: fallbackAdmin, payload: decoded };
    }

    try {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (admin) {
        return { admin, payload: decoded };
      }
    } catch {
      // Fallback
    }

    const fallbackAdmin = {
      _id: decoded.id,
      name: 'Alex Rivera',
      email: decoded.email,
      role: decoded.role,
    } as unknown as IAdmin;
    return { admin: fallbackAdmin, payload: decoded };
  } catch (error) {
    return null;
  }
}
