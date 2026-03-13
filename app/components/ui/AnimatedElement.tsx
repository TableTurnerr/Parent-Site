"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

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
