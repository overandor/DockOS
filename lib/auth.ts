import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export type UserSession = {
  userId: string;
  email: string;
  walletAddress?: string;
  role: 'user' | 'host' | 'admin';
  verified: boolean;
};

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export function generateToken(user: UserSession): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as UserSession;
  } catch {
    return null;
  }
}

export function generateEmailVerificationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Mock user database (replace with real database in production)
export const mockUsers: Record<string, { email: string; passwordHash: string; walletAddress?: string; verified: boolean }> = {
  'user-1': {
    email: 'demo@example.com',
    passwordHash: '', // Will be set on signup
    verified: true
  }
};

export async function createUser(email: string, password: string): Promise<UserSession | null> {
  // Check if user exists
  const existingUser = Object.values(mockUsers).find(u => u.email === email);
  if (existingUser) {
    return null;
  }

  const userId = `user-${Date.now()}`;
  const passwordHash = await hashPassword(password);

  mockUsers[userId] = {
    email,
    passwordHash,
    verified: false
  };

  return {
    userId,
    email,
    role: 'user',
    verified: false
  };
}

export async function authenticateUser(email: string, password: string): Promise<UserSession | null> {
  const user = Object.entries(mockUsers).find(([, u]) => u.email === email);
  
  if (!user) {
    return null;
  }

  const [userId, userData] = user;
  const passwordMatch = await comparePasswords(password, userData.passwordHash);

  if (!passwordMatch) {
    return null;
  }

  return {
    userId,
    email: userData.email,
    walletAddress: userData.walletAddress,
    role: 'user',
    verified: userData.verified
  };
}

export async function linkWallet(userId: string, walletAddress: string): Promise<boolean> {
  if (mockUsers[userId]) {
    mockUsers[userId].walletAddress = walletAddress;
    return true;
  }
  return false;
}

export async function getUserByWallet(walletAddress: string): Promise<UserSession | null> {
  const user = Object.entries(mockUsers).find(([, u]) => u.walletAddress === walletAddress);
  
  if (!user) {
    return null;
  }

  const [userId, userData] = user;
  return {
    userId,
    email: userData.email,
    walletAddress: userData.walletAddress,
    role: 'user',
    verified: userData.verified
  };
}
