export default function ({ content }) {
  return (
    <article
      className="prose max-w-none mb-8 last:mb-0 break-words"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
