'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "primary-light" | "secondary-light";
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `flow-btn flow-btn--${variant} ${className}`.trim();

  const inner = (
    <>
      <ArrowRight className="flow-btn__arrow-left" />
      <span className="flow-btn__text">{children}</span>
      <span className="flow-btn__circle" />
      <ArrowRight className="flow-btn__arrow-right" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  );
}
