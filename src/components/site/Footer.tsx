import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-md bg-gold text-gold-foreground">ر</span>
            رعايتي
          </div>
          <p className="mt-3 text-sm text-ink-foreground/70">
            منصة مصرية تربط منظمي الفعاليات بالشركات الراعية، بأسعار بالجنيه وفواتير ضريبية.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold">المنصة</h3>
          <ul className="grid gap-2 text-ink-foreground/70">
            <li><Link to="/events" className="hover:text-gold">تصفح الفعاليات</Link></li>
            <li><Link to="/sponsors" className="hover:text-gold">للرعاة</Link></li>
            <li><Link to="/pricing" className="hover:text-gold">الأسعار</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold">الدفع والتوثيق</h3>
          <ul className="grid gap-2 text-ink-foreground/70">
            <li>إنستاباي وفوري ومحافظ المحمول</li>
            <li>تحويل بنكي بالجنيه المصري</li>
            <li>فاتورة إلكترونية ونموذج ٤١ خصم</li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold">تواصل</h3>
          <ul className="grid gap-2 text-ink-foreground/70">
            <li>واتساب: ‎+20 100 000 0000</li>
            <li>hello@raayati.eg</li>
            <li>القاهرة الجديدة، مصر</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 px-4 py-4 text-center text-xs text-ink-foreground/60">
        © {new Date().getFullYear()} رعايتي — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
