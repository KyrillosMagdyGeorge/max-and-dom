export const metadata = {
  title: 'القوانين — أولاد الملوك',
};

const sections = [
  {
    title: 'مواعيد الدخول والخروج',
    items: [
      'الدخول: ١١:٠٠ صباحًا',
      'الخروج: ٩:٠٠ صباحًا',
      'اليوم الواحد: من ٩:٠٠ صباحًا حتى ٩:٠٠ مساءً',
    ],
  },
  {
    title: 'السلوك العام',
    items: [
      'ممنوع التدخين في كل أنحاء المقر.',
      'ممنوع تناول الكحول أو أي مسكرات.',
      'ممنوع تشغيل موسيقى صاخبة — احترامًا للأجواء الروحية.',
      'الالتزام بالزي المحتشم طوال الوقت.',
    ],
  },
  {
    title: 'قوانين حمام السباحة',
    items: [
      'يجب أن يكون الأطفال برفقة شخص بالغ طوال الوقت.',
      'ممنوع الغطس أو الجري على الأرضيات المبتلة.',
      'يجب ارتداء ملابس سباحة لائقة.',
      'مواعيد السباحة: من ٩:٠٠ صباحًا حتى ٧:٠٠ مساءً.',
    ],
  },
  {
    title: 'العربون والغرامات',
    items: [
      'تأمين ٢٠٠٠ جنيه يُرد عند الخروج.',
      'تُطبَّق غرامات نظافة في حالة أي تلفيات أو فوضى زائدة.',
      'مقدم الحجز: ٢٥٪ من إجمالي السعر (غير مسترد).',
    ],
  },
];

export default function RulesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl text-brown md:text-4xl">
          قوانين المقر
        </h1>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
        <p className="mt-4 text-brown/70">
          للحفاظ على الطابع الروحي للمقر، يُرجى قراءة القوانين التالية والموافقة عليها قبل الحجز.
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((s) => (
          <article key={s.title} className="card">
            <h2 className="font-display text-xl text-brown">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-1 pr-6 text-brown/80">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="/booking" className="btn-gold">أوافق وأحجز الآن</a>
      </div>
    </section>
  );
}
