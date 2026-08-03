import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/events", label: "الفعاليات" },
  { to: "/sponsors", label: "للرعاة" },
  { to: "/pricing", label: "الأسعار" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid size-8 place-items-center rounded-md bg-brand text-brand-foreground">ر</span>
          <span>رعايتي</span>
        </Link>

        <nav className="mr-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mr-auto md:mr-0 flex items-center gap-2">
          <Link
            to="/events"
            className="hidden rounded-md border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:inline-flex"
          >
            دخول
          </Link>
          <Link
            to="/pricing"
            className="rounded-md bg-brand px-3.5 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            انشر فعاليتك
          </Link>
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-border md:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border/60 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
