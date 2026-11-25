/** Renders one or more JSON-LD schema objects into a <script> tag. */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) && data.length === 1 ? data[0] : data;
  return (
    <script
      type="application/ld+json"
      // Emails keep their value but not a plain "@" (JSON parsers decode \u0040), so harvesters don't find them.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/(\w)@(\w)/g, "$1\\u0040$2") }}
    />
  );
}
