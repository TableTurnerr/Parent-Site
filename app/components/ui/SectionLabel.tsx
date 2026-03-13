interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`font-display text-warm-gray text-lg md:text-xl tracking-wide ${className}`.trim()}>
      {children}
    </p>
  );
}
