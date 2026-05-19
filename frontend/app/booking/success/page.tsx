'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { api } from '@/lib/api';

type Booking = {
  _id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'approved' | 'rejected';
  deposit: number;
  qrCode?: string;
};

export const dynamic = 'force-dynamic';

function SuccessInner() {
  const params = useSearchParams();
  const id = params.get('id');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api<Booking>(`/bookings/${id}`)
      .then(setBooking)
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="text-4xl text-gold">†</div>
      <h1 className="mt-4 font-display text-3xl text-brown">Request Received</h1>
      <p className="mt-4 text-brown/70">
        Thank you. Your booking is now <strong>pending</strong> review by the
        admin. You will be contacted once it is approved.
      </p>

      {error && <p className="mt-6 text-darkred">{error}</p>}

      {booking && (
        <div className="card mt-8 text-left">
          <h2 className="font-display text-xl text-brown">Booking Details</h2>
          <ul className="mt-3 space-y-1 text-sm text-brown/80">
            <li>
              <strong>Name:</strong> {booking.name}
            </li>
            <li>
              <strong>Check-in:</strong>{' '}
              {new Date(booking.checkIn).toLocaleDateString()}
            </li>
            <li>
              <strong>Check-out:</strong>{' '}
              {new Date(booking.checkOut).toLocaleDateString()}
            </li>
            <li>
              <strong>Deposit Paid:</strong>{' '}
              {booking.deposit.toLocaleString()} EGP
            </li>
            <li>
              <strong>Status:</strong>{' '}
              <span className="capitalize">{booking.status}</span>
            </li>
          </ul>

          {booking.status === 'approved' && booking.qrCode && (
            <div className="mt-6 text-center">
              <h3 className="font-display text-lg text-brown">Your Entry QR</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={booking.qrCode}
                alt="Entry QR code"
                className="mx-auto mt-4 h-48 w-48"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-2xl px-4 py-16 text-center text-brown/70">
          Loading…
        </section>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
