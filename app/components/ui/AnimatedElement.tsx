"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";

interface AnimatedElementProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export default function AnimatedElement({
  variants,
  children,
  className,
  ...props
}: AnimatedElementProps) {
  const prefersReducedMotion = useReducedMotion();

  // Honor the user's reduced-motion preference: render content statically
  // (already visible) instead of running scroll-reveal transforms.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
