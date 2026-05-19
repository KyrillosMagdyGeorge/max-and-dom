'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/booking', label: 'Book' },
  { href: '/rules', label: 'Rules' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-beige/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg text-brown">
          <span className="text-gold-dark">†</span> Awlad El Molok
        </Link>

        <button
          className="md:hidden text-brown"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
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
                  className="block font-display text-sm uppercase tracking-wider text-brown hover:text-gold-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="block font-display text-sm uppercase tracking-wider text-darkred hover:text-brown"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
