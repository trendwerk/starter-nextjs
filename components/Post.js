import Link from 'components/Link'
import ImageLink from 'components/ImageLink'
import Date from 'components/Date'

const Post = ({ post }) => {
  const image = post.fields.summaryImage?.url || post.fields.headerImage?.url

  return (
    <div
      className="
      flex
      flex-col
      mb-16
      last:mb-0
      sm:flex-row-reverse
      sm:items-center
    "
    >
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
        <Date className="mb-2 text-sm" date={post.dateFormatted} />

        <h2 className="mb-4">
          <Link
            className="hover:text-brand-700 transition-colors duration-200"
            href={post.uri}
          >
            {post.title}
          </Link>
        </h2>

        <p className="mb-6">{post.fields.summary || post.summary}</p>

        <Link href={post.uri} className="link" arrow="right">
          Read more
        </Link>
      </div>
    </div>
  )
}

export default Post
