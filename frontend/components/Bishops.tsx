'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const bishops = [
  {
    name: 'قداسة البابا تواضروس الثاني',
    role: 'بابا الإسكندرية وبطريرك الكرازة المرقسية الـ١١٨',
    image: '/images/pope-tawadros.jpg',
  },
  {
    name: 'نيافة الأنبا مكار',
    role: 'أسقف الشرقية وعاشر من رمضان',
    image: '/images/bishop-makar.png',
  },
  {
    name: 'القديسَين مكسيموس ودوماديوس',
    role: 'شفيعا المقر',
    image: '/images/saints-max-dom.jpg',
  },
];

export default function Bishops() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-display text-3xl text-brown md:text-4xl">
          آباؤنا الروحيون
        </h2>
        <div className="mx-auto mt-2 h-px w-24 bg-gold" />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {bishops.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card text-center"
          >
            <div className="mx-auto mb-4 flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-gold bg-beige">
              {b.image ? (
                <Image
                  src={b.image}
                  alt={b.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-5xl text-gold-dark">†</span>
              )}
            </div>
            <h3 className="font-display text-lg text-brown">{b.name}</h3>
            <p className="mt-2 text-sm italic text-brown/70">{b.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
