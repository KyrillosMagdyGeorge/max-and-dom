export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gold/40 bg-brown text-beige">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-gold text-lg">أولاد الملوك</h3>
          <p className="mt-2 text-sm leading-relaxed">
            مقر روحي مسيحي أرثوذكسي — إيبارشية الشرقية وعاشر من رمضان.
          </p>
        </div>
        <div>
          <h4 className="font-display text-gold text-sm">تواصل معنا</h4>
          <p className="mt-2 text-sm">انستاباي: 01270177871</p>
        </div>
        <div>
          <h4 className="font-display text-gold text-sm">روابط سريعة</h4>
          <ul className="mt-2 text-sm space-y-1">
            <li><a href="/rules" className="hover:text-gold">القوانين</a></li>
            <li><a href="/booking" className="hover:text-gold">احجز الآن</a></li>
            <li><a href="/calendar" className="hover:text-gold">المواعيد المتاحة</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20 py-4 text-center text-xs text-beige/80">
        © {new Date().getFullYear()} مقر أولاد الملوك
      </div>
    </footer>
  );
}
