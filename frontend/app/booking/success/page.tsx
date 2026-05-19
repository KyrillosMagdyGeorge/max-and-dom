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

const STATUS_LABEL: Record<Booking['status'], string> = {
  pending: 'قيد المراجعة',
  approved: 'مؤكد',
  rejected: 'مرفوض',
};

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
      <h1 className="mt-4 font-display text-3xl text-brown">تم استلام طلبك</h1>
      <p className="mt-4 text-brown/70">
        شكرًا لك. حجزك الآن <strong>قيد المراجعة</strong> من قِبل الإدارة.
        سيتم التواصل معك بمجرد الموافقة.
      </p>

      {error && <p className="mt-6 text-darkred">{error}</p>}

      {booking && (
        <div className="card mt-8 text-right">
          <h2 className="font-display text-xl text-brown">تفاصيل الحجز</h2>
          <ul className="mt-3 space-y-1 text-sm text-brown/80">
            <li>
              <strong>الاسم:</strong> {booking.name}
            </li>
            <li>
              <strong>تاريخ الدخول:</strong>{' '}
              {new Date(booking.checkIn).toLocaleDateString('ar-EG')}
            </li>
            <li>
              <strong>تاريخ الخروج:</strong>{' '}
              {new Date(booking.checkOut).toLocaleDateString('ar-EG')}
            </li>
            <li>
              <strong>المقدم المدفوع:</strong>{' '}
              {booking.deposit.toLocaleString('ar-EG')} جنيه
            </li>
            <li>
              <strong>الحالة:</strong>{' '}
              <span>{STATUS_LABEL[booking.status]}</span>
            </li>
          </ul>

          {booking.status === 'approved' && booking.qrCode && (
            <div className="mt-6 text-center">
              <h3 className="font-display text-lg text-brown">رمز الدخول الخاص بك</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={booking.qrCode}
                alt="رمز الدخول"
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
          جارٍ التحميل…
        </section>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
