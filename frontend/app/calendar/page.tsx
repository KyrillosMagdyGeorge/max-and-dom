import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export const metadata = {
  title: 'المواعيد المتاحة — أولاد الملوك',
};

export default function CalendarPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl text-brown md:text-4xl">
          المواعيد المتاحة
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
        <p className="mt-4 text-brown/70">
          الأيام الحمراء محجوزة، والصفراء قيد الموافقة، والبيضاء متاحة للحجز.
        </p>
      </header>
      <AvailabilityCalendar />
    </section>
  );
}
