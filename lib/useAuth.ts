import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('auth-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('[v0] Error parsing user:', error);
        localStorage.removeItem('auth-user');
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [router]);

  return { user, loading };
}

export function useProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return { isLoading: true, user: null };
  }

  if (!user) {
    return { isLoading: false, user: null };
  }

  return { isLoading: false, user };
}
