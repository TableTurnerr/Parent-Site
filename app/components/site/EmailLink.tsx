import { SITE_CONFIG } from "@/app/lib/constants";

/** The contact email as a normal link, with "@" written as an HTML entity so address harvesters don't find it. */
export default function EmailLink({ className = "" }: { className?: string }) {
  const email = SITE_CONFIG.email.replace("@", "&#64;");
  return <span dangerouslySetInnerHTML={{ __html: `<a href="mailto:${email}" class="${className}">${email}</a>` }} />;
}
