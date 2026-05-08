interface UserAvatarProps {
  src?: string | null;
  name: string;
  seed?: string | null;
  size?: number;
  className?: string;
  title?: string;
  alt?: string;
}

// Brand duotone: charcoal + cream-dark
const DICEBEAR_BG = "1A1A1A,F2F0EB";

export function boringAvatarUrl(seed: string, size = 80) {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
    seed
  )}&size=${size}&backgroundColor=${DICEBEAR_BG}`;
}

export default function UserAvatar({
  src,
  name,
  seed,
  size = 40,
  className = "",
  title,
  alt,
}: UserAvatarProps) {
  const url = src ?? boringAvatarUrl(seed ?? name, size * 2);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt ?? name}
      title={title}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
