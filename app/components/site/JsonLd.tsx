/** Renders one or more JSON-LD schema objects into a <script> tag. */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) && data.length === 1 ? data[0] : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
