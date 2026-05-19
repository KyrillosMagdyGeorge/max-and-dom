import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'احجز — أولاد الملوك',
};

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl text-brown md:text-4xl">
          احجز إقامتك
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
        <p className="mt-4 text-brown/70">
          اختر تواريخك، وادفع مقدم ٢٥٪ عن طريق انستاباي
          <span className="font-semibold"> 01270177871</span>،
          ثم ارفع صورة الإيصال. سيتم التأكيد قريبًا.
        </p>
      </header>
      <BookingForm />
    </section>
  );
}
