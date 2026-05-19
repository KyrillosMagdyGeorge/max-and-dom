'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { api, saveToken } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await api<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      saveToken(token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center font-display text-3xl text-brown">
        Admin Login
      </h1>
      <div className="mx-auto mt-2 h-px w-24 bg-gold" />
      <form onSubmit={onSubmit} className="card mt-8 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brown">
            Username
          </span>
          <input
            className="w-full rounded-md border border-gold/50 bg-white px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brown">
            Password
          </span>
          <input
            type="password"
            className="w-full rounded-md border border-gold/50 bg-white px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && (
          <p className="rounded bg-darkred/10 px-3 py-2 text-sm text-darkred">
            {error}
          </p>
        )}
        <button type="submit" className="btn-gold w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}
