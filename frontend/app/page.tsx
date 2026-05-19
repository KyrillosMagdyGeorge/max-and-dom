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
          جاهز للحجز؟
        </h2>
        <p className="mt-4 text-brown/70">
          احجز إقامتك بدفع مقدم ٢٥٪ عن طريق انستاباي
          <span className="font-semibold text-brown"> 01270177871</span>.
          ارفع صورة من إيصال الدفع وسيتم التأكيد قريبًا.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="btn-gold">ابدأ الحجز</Link>
          <Link href="/rules" className="btn-outline">اقرأ القوانين</Link>
        </div>
      </section>
    </>
  );
}
