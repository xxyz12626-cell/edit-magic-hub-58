import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-gold text-gold-foreground">
              <Sparkles className="size-4" />
            </span>
            سند
          </div>
          <p className="mt-3 text-sm text-ink-foreground/70">
            سوق مصري يربط الشركات بمنظمي الفعاليات في ٢٧ محافظة — أسعار بالجنيه، منظمون موثقون،
            وتقارير نتائج بعد كل حدث.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold">المنصة</h3>
          <ul className="grid gap-2 text-ink-foreground/70">
            <li><Link to="/discover" className="hover:text-gold">تصفّح الفعاليات</Link></li>
            <li><Link to="/organizers" className="hover:text-gold">لمنظمي الفعاليات</Link></li>
            <li><Link to="/discover" className="hover:text-gold">الرعاية العينية</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold">الدفع والتوثيق</h3>
          <ul className="grid gap-2 text-ink-foreground/70">
            <li>إنستاباي وفوري ومحافظ المحمول</li>
            <li>تحويل بنكي بالجنيه المصري</li>
            <li>فاتورة إلكترونية متوافقة مع مصلحة الضرائب</li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-semibold">تواصل</h3>
          <ul className="grid gap-2 text-ink-foreground/70">
            <li>واتساب: ‎+20 100 000 0000</li>
            <li>hello@sanad.eg</li>
            <li>القاهرة الجديدة، مصر</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 px-4 py-4 text-center text-xs text-ink-foreground/60">
        © {new Date().getFullYear()} سند — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
