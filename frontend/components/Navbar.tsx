'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/calendar', label: 'التقويم' },
  { href: '/booking', label: 'احجز' },
  { href: '/rules', label: 'القوانين' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-beige/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg text-brown">
          <span className="text-gold-dark">†</span> أولاد الملوك
        </Link>

        <button
          className="md:hidden text-brown"
          onClick={() => setOpen((o) => !o)}
          aria-label="القائمة"
        >
          ☰
        </button>

        <div
          className={`${
            open ? 'block' : 'hidden'
          } absolute left-0 right-0 top-full border-b border-gold/40 bg-beige md:static md:block md:border-0 md:bg-transparent`}
        >
          <ul className="flex flex-col items-stretch gap-1 px-4 py-3 md:flex-row md:items-center md:gap-6 md:px-0 md:py-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-display text-sm tracking-wider text-brown hover:text-gold-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="block font-display text-sm tracking-wider text-darkred hover:text-brown"
              >
                الإدارة
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
