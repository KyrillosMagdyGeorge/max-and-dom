export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gold/40 bg-brown text-beige">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-gold text-lg">Awlad El Molok</h3>
          <p className="mt-2 text-sm leading-relaxed">
            Orthodox Christian retreat center — Coptic Orthodox Diocese of
            Eastern Sharqia &amp; 10th of Ramadan.
          </p>
        </div>
        <div>
          <h4 className="font-display text-gold text-sm uppercase">Contact</h4>
          <p className="mt-2 text-sm">Instapay: 01270177871</p>
        </div>
        <div>
          <h4 className="font-display text-gold text-sm uppercase">Quick</h4>
          <ul className="mt-2 text-sm space-y-1">
            <li><a href="/rules" className="hover:text-gold">Rules</a></li>
            <li><a href="/booking" className="hover:text-gold">Book a stay</a></li>
            <li><a href="/calendar" className="hover:text-gold">Availability</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20 py-4 text-center text-xs text-beige/80">
        © {new Date().getFullYear()} Awlad El Molok Retreat Center
      </div>
    </footer>
  );
}
