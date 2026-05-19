import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export const metadata = {
  title: 'Availability — Awlad El Molok',
};

export default function CalendarPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl text-brown md:text-4xl">
          Availability
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
        <p className="mt-4 text-brown/70">
          Days shaded red are booked, yellow are pending approval. White days
          are open for reservation.
        </p>
      </header>
      <AvailabilityCalendar />
    </section>
  );
}
