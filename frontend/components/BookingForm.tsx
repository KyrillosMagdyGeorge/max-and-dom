'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { API_URL } from '@/lib/api';

const PRICE_PER_NIGHT_PER_GUEST = 250;

export default function BookingForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [church, setChurch] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn);
    const b = new Date(checkOut);
    const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const totalPrice = nights * guests * PRICE_PER_NIGHT_PER_GUEST;
  const deposit = Math.round(totalPrice * 0.25);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!accepted) {
      setError('You must accept the rules.');
      return;
    }
    if (!paymentImage) {
      setError('Please upload your payment screenshot.');
      return;
    }
    if (nights <= 0) {
      setError('Check-out must be after check-in.');
      return;
    }

    const form = new FormData();
    form.append('name', name);
    form.append('phone', phone);
    form.append('church', church);
    form.append('checkIn', checkIn);
    form.append('checkOut', checkOut);
    form.append('guests', String(guests));
    form.append('totalPrice', String(totalPrice));
    form.append('rulesAccepted', 'true');
    form.append('paymentImage', paymentImage);

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      router.push(`/booking/success?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name" required>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>
        <Field label="Phone" required>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Field>
        <Field label="Church / Parish">
          <input
            className="input"
            value={church}
            onChange={(e) => setChurch(e.target.value)}
          />
        </Field>
        <Field label="Guests" required>
          <input
            type="number"
            min={1}
            className="input"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
            required
          />
        </Field>
        <Field label="Check-in" required>
          <input
            type="date"
            className="input"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </Field>
        <Field label="Check-out" required>
          <input
            type="date"
            className="input"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </Field>
      </div>

      <div className="rounded-md bg-beige p-4 text-sm text-brown">
        <p>
          <strong>Nights:</strong> {nights}
        </p>
        <p>
          <strong>Total price:</strong> {totalPrice.toLocaleString()} EGP
        </p>
        <p>
          <strong>Required deposit (25%):</strong>{' '}
          {deposit.toLocaleString()} EGP
        </p>
        <p className="mt-2 text-brown/70">
          Pay the deposit via Instapay to
          <span className="font-semibold"> 01270177871</span> and upload the
          screenshot below.
        </p>
      </div>

      <Field label="Payment Screenshot" required>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPaymentImage(e.target.files?.[0] || null)}
          required
        />
      </Field>

      <label className="flex items-start gap-2 text-sm text-brown">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1"
        />
        <span>
          I have read and accept the{' '}
          <a href="/rules" target="_blank" className="underline text-gold-dark">
            retreat rules
          </a>
          , including the 2000 EGP security deposit and the 25% non-refundable
          booking deposit.
        </span>
      </label>

      {error && (
        <p className="rounded bg-darkred/10 px-3 py-2 text-sm text-darkred">
          {error}
        </p>
      )}

      <button type="submit" className="btn-gold w-full" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Booking Request'}
      </button>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid rgba(200, 161, 74, 0.5);
          background-color: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.95rem;
          color: #2c1f14;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #c8a14a;
          box-shadow: 0 0 0 2px rgba(200, 161, 74, 0.25);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-brown">
        {label}
        {required && <span className="text-darkred"> *</span>}
      </span>
      {children}
    </label>
  );
}
