export default function({ content }) {
  return (
    <article
      className="prose max-w-none mb-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
