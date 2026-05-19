'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api, clearToken, isAuthed } from '@/lib/api';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

type Booking = {
  _id: string;
  name: string;
  phone: string;
  church?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  deposit: number;
  paymentImage: string;
  status: 'pending' | 'approved' | 'rejected';
  qrCode?: string;
  createdAt: string;
};

type Tab = 'pending' | 'approved' | 'rejected' | 'calendar';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('pending');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Booking | null>(null);

  const load = useCallback(async () => {
    if (tab === 'calendar') return;
    setLoading(true);
    setError(null);
    try {
      const data = await api<Booking[]>(`/admin/bookings?status=${tab}`, {
        auth: true,
      });
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (!isAuthed()) {
      router.push('/admin/login');
      return;
    }
    load();
  }, [load, router]);

  async function approve(id: string) {
    try {
      const updated = await api<Booking>(`/admin/bookings/${id}/approve`, {
        method: 'PATCH',
        auth: true,
      });
      setSelected(updated);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Approval failed');
    }
  }

  async function reject(id: string) {
    try {
      await api<Booking>(`/admin/bookings/${id}/reject`, {
        method: 'PATCH',
        auth: true,
      });
      setSelected(null);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Rejection failed');
    }
  }

  function logout() {
    clearToken();
    router.push('/admin/login');
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-brown">Admin Dashboard</h1>
        <button onClick={logout} className="btn-outline">
          Logout
        </button>
      </header>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gold/30 pb-2">
        {(['pending', 'approved', 'rejected', 'calendar'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-t-md px-4 py-2 font-display text-sm uppercase tracking-wider ${
              tab === t
                ? 'bg-gold text-white'
                : 'text-brown hover:bg-gold/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'calendar' ? (
        <AvailabilityCalendar />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {error && <p className="text-darkred">{error}</p>}
            {loading ? (
              <p className="text-brown/70">Loading…</p>
            ) : bookings.length === 0 ? (
              <p className="text-brown/70">No {tab} bookings.</p>
            ) : (
              <ul className="space-y-2">
                {bookings.map((b) => (
                  <li key={b._id}>
                    <button
                      onClick={() => setSelected(b)}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
                        selected?._id === b._id
                          ? 'border-gold bg-gold/10'
                          : 'border-gold/30 bg-white hover:bg-beige'
                      }`}
                    >
                      <div className="font-medium text-brown">{b.name}</div>
                      <div className="text-xs text-brown/70">
                        {new Date(b.checkIn).toLocaleDateString()} →{' '}
                        {new Date(b.checkOut).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-brown/60">
                        {b.guests} guests · {b.deposit.toLocaleString()} EGP
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <BookingDetails
                booking={selected}
                onApprove={() => approve(selected._id)}
                onReject={() => reject(selected._id)}
              />
            ) : (
              <p className="text-brown/70">Select a booking to view details.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function BookingDetails({
  booking,
  onApprove,
  onReject,
}: {
  booking: Booking;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="card space-y-4">
      <div>
        <h2 className="font-display text-xl text-brown">{booking.name}</h2>
        <p className="text-sm text-brown/70">
          Created {new Date(booking.createdAt).toLocaleString()}
        </p>
      </div>

      <dl className="grid gap-2 text-sm md:grid-cols-2">
        <Info label="Phone" value={booking.phone} />
        <Info label="Church" value={booking.church || '—'} />
        <Info
          label="Check-in"
          value={new Date(booking.checkIn).toLocaleDateString()}
        />
        <Info
          label="Check-out"
          value={new Date(booking.checkOut).toLocaleDateString()}
        />
        <Info label="Guests" value={booking.guests} />
        <Info
          label="Total Price"
          value={`${booking.totalPrice.toLocaleString()} EGP`}
        />
        <Info
          label="Deposit (25%)"
          value={`${booking.deposit.toLocaleString()} EGP`}
        />
        <Info label="Status" value={booking.status} />
      </dl>

      <div>
        <p className="mb-2 text-sm font-medium text-brown">Payment Screenshot</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={booking.paymentImage}
          alt="Payment screenshot"
          className="max-h-80 rounded border border-gold/30"
        />
      </div>

      {booking.status === 'approved' && booking.qrCode && (
        <div>
          <p className="mb-2 text-sm font-medium text-brown">Entry QR</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={booking.qrCode}
            alt="Entry QR"
            className="h-48 w-48 rounded border border-gold/30"
          />
        </div>
      )}

      {booking.status === 'pending' && (
        <div className="flex gap-3">
          <button onClick={onApprove} className="btn-gold">
            Approve
          </button>
          <button
            onClick={onReject}
            className="btn-outline border-darkred text-darkred hover:bg-darkred/10"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-brown/60">{label}</dt>
      <dd className="font-medium text-brown">{value}</dd>
    </div>
  );
}
