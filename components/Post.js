import Link from 'components/Link'
import ImageLink from 'components/ImageLink'
import formatDate from 'utils/formatDate'

export default ({ post }) => {
  const image = post.fields.summaryImage?.url || post.fields.headerImage?.url

  return (
    <div className="
      flex
      flex-col
      mb-16
      sm:flex-row-reverse
      sm:items-center
    ">
      <ImageLink
        className="
          flex-none
          mb-8
          sm:ml-12
          sm:mb-0
          sm:w-3/8
        "
        alt={post.title}
        href={post.uri}
        image={image}
        width={600}
        height={400}
      />

      <div>
        <div className="
          mb-2
          text-gray-400
          text-sm
          uppercase
          font-semibold
          tracking-wide
        ">
          {formatDate(post.date)}
        </div>

        <h2 className="mb-4">
          <Link className="hover:text-brand-700 transition-colors duration-200" href={post.uri}>
          {post.title}
          </Link>
        </h2>

        <p className="mb-6">{post.fields.summary || post.excerpt}</p>

        <Link href={post.uri} className="link" arrow="right">
          Read more
        </Link>
      </div>
    </div>
  )
}