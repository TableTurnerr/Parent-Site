import { redirect } from "next/navigation";

export default async function AdminLoginRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "string") qs.set(k, v);
  }
  if (!qs.has("next")) qs.set("next", "/admin");
  redirect(`/login?${qs.toString()}`);
}
