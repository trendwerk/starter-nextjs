export default function ({ content }) {
  return (
    <article
      className="prose max-w-none mb-8 last:mb-0 overflow-hidden"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
