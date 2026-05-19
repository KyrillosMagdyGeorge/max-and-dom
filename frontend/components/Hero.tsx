'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beige via-beige to-beige-dark">
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold text-4xl"
        >
          †
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 font-display text-4xl text-brown md:text-6xl"
        >
          Awlad El Molok Retreat Center
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg italic text-brown/80 md:text-xl"
        >
          Coptic Orthodox Diocese of Eastern Sharqia &amp; 10th of Ramadan
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base text-brown/70"
        >
          A place of prayer, quiet, and renewal under the intercession of
          Saints Maximus &amp; Domadius.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link href="/booking" className="btn-gold">
            Book a Stay
          </Link>
          <Link href="/calendar" className="btn-outline">
            View Availability
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
