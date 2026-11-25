import Image, { type ImageProps } from "next/image";

/** next/image without its inline style attribute: the alt text is kept invisible while loading by a class instead. */
export default function PlainImage({ className = "", alt, ...props }: Omit<ImageProps, "fill" | "style">) {
  return <Image {...props} alt={alt} style={{ color: "" }} className={`text-transparent ${className}`} />;
}
