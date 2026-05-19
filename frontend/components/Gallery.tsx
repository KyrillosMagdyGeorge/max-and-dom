'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const images = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/gallery-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Retreat center photo ${i + 1}`,
}));

export default function Gallery() {
  return (
    <section className="bg-beige-dark/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl text-brown md:text-4xl">
            Gallery
          </h2>
          <div className="mx-auto mt-2 h-px w-24 bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-brown/70">
            Pool, sports field, gathering spaces, and quiet corners for prayer.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="group relative overflow-hidden rounded-md border border-gold/30 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
