import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-charcoal text-cream rounded-full px-8 py-3.5 font-medium hover:bg-charcoal-light transition-colors",
  secondary:
    "border border-charcoal text-charcoal rounded-full px-8 py-3.5 font-medium hover:bg-charcoal hover:text-cream transition-colors",
} as const;

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-body ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
