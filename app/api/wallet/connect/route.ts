import { linkWallet, generateToken, getUserByWallet } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, signature, message, email } = await req.json();

    if (!walletAddress || !signature || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if wallet already has an account
    const existingUser = await getUserByWallet(walletAddress);
    if (existingUser) {
      const token = generateToken(existingUser);
      const response = NextResponse.json({ user: existingUser, token }, { status: 200 });
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60
      });
      return response;
    }

    // Create new user with wallet
    const userId = `user-${Date.now()}`;
    const user = {
      userId,
      email: email || `wallet-${walletAddress.substring(0, 6)}@dockos.local`,
      walletAddress,
      role: 'user' as const,
      verified: true
    };

    // Store in mock database
    const token = generateToken(user);

    const response = NextResponse.json({ user, token }, { status: 201 });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('[v0] Wallet connection error:', error);
    return NextResponse.json(
      { error: 'Wallet connection failed' },
      { status: 500 }
    );
  }
}
