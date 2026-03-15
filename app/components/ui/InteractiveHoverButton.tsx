"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  dark?: boolean;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLDivElement,
  InteractiveHoverButtonProps
>(({ text = "Button", dark = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "ihb relative w-40 cursor-pointer overflow-hidden rounded-full border p-2 text-center font-semibold",
        dark ? "ihb--dark" : "ihb--light",
        className,
      )}
      {...props}
    >
      <span className="ihb__text">{text}</span>
      <div className="ihb__hover-content">
        <span>{text}</span>
        <ArrowRight size={16} />
      </div>
      <div className="ihb__circle" />
    </div>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
