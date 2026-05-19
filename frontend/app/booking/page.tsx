import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'Book — Awlad El Molok',
};

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl text-brown md:text-4xl">
          Book Your Retreat
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
        <p className="mt-4 text-brown/70">
          Choose your dates, pay a 25% deposit via Instapay
          <span className="font-semibold"> 01270177871</span>, and upload your
          screenshot. We&apos;ll confirm shortly.
        </p>
      </header>
      <BookingForm />
    </section>
  );
}
