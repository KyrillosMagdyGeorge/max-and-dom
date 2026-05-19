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

const TAB_LABEL: Record<Tab, string> = {
  pending: 'قيد المراجعة',
  approved: 'مؤكدة',
  rejected: 'مرفوضة',
  calendar: 'التقويم',
};

const STATUS_LABEL: Record<Booking['status'], string> = {
  pending: 'قيد المراجعة',
  approved: 'مؤكد',
  rejected: 'مرفوض',
};

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
      setError(err instanceof Error ? err.message : 'فشل تحميل البيانات');
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
      alert(err instanceof Error ? err.message : 'فشل تأكيد الحجز');
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
      alert(err instanceof Error ? err.message : 'فشل رفض الحجز');
    }
  }

  function logout() {
    clearToken();
    router.push('/admin/login');
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-brown">لوحة الإدارة</h1>
        <button onClick={logout} className="btn-outline">
          تسجيل خروج
        </button>
      </header>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gold/30 pb-2">
        {(['pending', 'approved', 'rejected', 'calendar'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-t-md px-4 py-2 font-display text-sm tracking-wider ${
              tab === t
                ? 'bg-gold text-white'
                : 'text-brown hover:bg-gold/10'
            }`}
          >
            {TAB_LABEL[t]}
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
              <p className="text-brown/70">جارٍ التحميل…</p>
            ) : bookings.length === 0 ? (
              <p className="text-brown/70">لا يوجد حجوزات {TAB_LABEL[tab]}.</p>
            ) : (
              <ul className="space-y-2">
                {bookings.map((b) => (
                  <li key={b._id}>
                    <button
                      onClick={() => setSelected(b)}
                      className={`w-full rounded-md border px-3 py-2 text-right text-sm ${
                        selected?._id === b._id
                          ? 'border-gold bg-gold/10'
                          : 'border-gold/30 bg-white hover:bg-beige'
                      }`}
                    >
                      <div className="font-medium text-brown">{b.name}</div>
                      <div className="text-xs text-brown/70">
                        {new Date(b.checkIn).toLocaleDateString('ar-EG')} ←{' '}
                        {new Date(b.checkOut).toLocaleDateString('ar-EG')}
                      </div>
                      <div className="text-xs text-brown/60">
                        {b.guests} ضيف · {b.deposit.toLocaleString('ar-EG')} جنيه
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
              <p className="text-brown/70">اختر حجزًا لعرض التفاصيل.</p>
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
          تم الإنشاء في {new Date(booking.createdAt).toLocaleString('ar-EG')}
        </p>
      </div>

      <dl className="grid gap-2 text-sm md:grid-cols-2">
        <Info label="رقم الهاتف" value={booking.phone} />
        <Info label="الكنيسة" value={booking.church || '—'} />
        <Info
          label="تاريخ الدخول"
          value={new Date(booking.checkIn).toLocaleDateString('ar-EG')}
        />
        <Info
          label="تاريخ الخروج"
          value={new Date(booking.checkOut).toLocaleDateString('ar-EG')}
        />
        <Info label="عدد الضيوف" value={booking.guests} />
        <Info
          label="إجمالي السعر"
          value={`${booking.totalPrice.toLocaleString('ar-EG')} جنيه`}
        />
        <Info
          label="المقدم (٢٥٪)"
          value={`${booking.deposit.toLocaleString('ar-EG')} جنيه`}
        />
        <Info label="الحالة" value={STATUS_LABEL[booking.status]} />
      </dl>

      <div>
        <p className="mb-2 text-sm font-medium text-brown">صورة الإيصال</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={booking.paymentImage}
          alt="صورة الإيصال"
          className="max-h-80 rounded border border-gold/30"
        />
      </div>

      {booking.status === 'approved' && booking.qrCode && (
        <div>
          <p className="mb-2 text-sm font-medium text-brown">رمز الدخول</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={booking.qrCode}
            alt="رمز الدخول"
            className="h-48 w-48 rounded border border-gold/30"
          />
        </div>
      )}

      {booking.status === 'pending' && (
        <div className="flex gap-3">
          <button onClick={onApprove} className="btn-gold">
            تأكيد
          </button>
          <button
            onClick={onReject}
            className="btn-outline border-darkred text-darkred hover:bg-darkred/10"
          >
            رفض
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
