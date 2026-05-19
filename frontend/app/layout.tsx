import type { Metadata } from 'next';
import { Cinzel, Playfair_Display, Cairo } from 'next/font/google';

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'مقر أولاد الملوك',
  description:
    'مقر روحي مسيحي أرثوذكسي — إيبارشية الشرقية وعاشر من رمضان',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cinzel.variable} ${playfair.variable} ${cairo.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
