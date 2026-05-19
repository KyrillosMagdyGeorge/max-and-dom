export const metadata = {
  title: 'Rules — Awlad El Molok',
};

const sections = [
  {
    title: 'Check-in & Check-out',
    items: [
      'Check-in: 11:00 AM',
      'Check-out: 9:00 AM',
      'Day-use: 9:00 AM – 9:00 PM',
    ],
  },
  {
    title: 'Conduct',
    items: [
      'No smoking anywhere on the premises.',
      'No alcohol or any intoxicants.',
      'No loud music; please respect the spiritual atmosphere.',
      'Modest dress code at all times.',
    ],
  },
  {
    title: 'Pool Rules',
    items: [
      'Children must be accompanied by an adult at all times.',
      'No diving or running on wet surfaces.',
      'Appropriate swimwear is required.',
      'Pool hours: 9:00 AM – 7:00 PM.',
    ],
  },
  {
    title: 'Deposits & Penalties',
    items: [
      'Security deposit: 2000 EGP, refundable upon checkout.',
      'Cleaning penalties apply for any damages or excessive mess.',
      'Booking deposit: 25% of the total price (non-refundable).',
    ],
  },
];

export default function RulesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl text-brown md:text-4xl">
          Retreat Rules
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
        <p className="mt-4 text-brown/70">
          To preserve the spiritual nature of our retreat, please read and
          accept the following rules before booking.
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((s) => (
          <article key={s.title} className="card">
            <h2 className="font-display text-xl text-brown">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-brown/80">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="/booking" className="btn-gold">I Accept &amp; Book Now</a>
      </div>
    </section>
  );
}
