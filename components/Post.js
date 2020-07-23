import Link from 'components/Link'
import Image from 'components/Image'
import formatDate from 'utils/formatDate'

export default ({ post }) => {
  const image = post.fields.summaryImage?.url || post.fields.headerImage?.url

  return (
    <div className="mb-16">
      {image && (
        <Link href={post.uri}>
          <Image
            className="rounded mb-8"
            alt={post.title}
            src={image}
            width={600}
            height={400}
          />
        </Link>
      )}

      <div className="
        mb-3
        text-gray-400
        text-sm
        uppercase
        font-semibold
        tracking-wide
      ">
       {formatDate(post.date)}
      </div>

      <h2 className="mb-6">
        {post.title}
      </h2>

      <p className="mb-6">{post.fields.summary || post.excerpt}</p>

      <Link href={post.uri} className="link" arrow="right">
        Continue reading
      </Link>
    </div>
  )
}