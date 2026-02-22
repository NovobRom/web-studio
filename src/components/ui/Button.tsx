import Link from "next/link";

interface ButtonProps {
  variant: "primary" | "secondary";
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function Button({
  variant,
  href,
  children,
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-9 py-4 rounded-[var(--radius-pill)] font-semibold text-[0.95rem] transition-all duration-300 no-underline";

  const styles = {
    primary:
      "bg-accent text-bg hover:opacity-90 hover:-translate-y-0.5 shadow-[0_0_0_0_rgba(212,168,67,0)] hover:shadow-[0_8px_30px_rgba(212,168,67,0.25)]",
    secondary:
      "bg-transparent text-text border border-[var(--color-border-hover)] hover:border-[var(--color-text-dim)] hover:bg-white/[0.03]",
  };

  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
