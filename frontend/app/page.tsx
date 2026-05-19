import Hero from '@/components/Hero';
import Bishops from '@/components/Bishops';
import Gallery from '@/components/Gallery';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bishops />
      <Gallery />

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="font-display text-3xl text-brown md:text-4xl">
          Ready to Book?
        </h2>
        <p className="mt-4 text-brown/70">
          Reserve your retreat with a 25% deposit via Instapay
          <span className="font-semibold text-brown"> 01270177871</span>.
          Upload your payment screenshot and our team will confirm shortly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="btn-gold">Start Booking</Link>
          <Link href="/rules" className="btn-outline">Read the Rules</Link>
        </div>
      </section>
    </>
  );
}
