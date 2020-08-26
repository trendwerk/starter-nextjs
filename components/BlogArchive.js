import { useState, useEffect } from 'react'
import Title from 'components/Title'
import Wrap from 'components/Wrap'
import Post from 'components/Post'
import Link from 'components/Link'

const Category = ({ category, currentCategory }) => (
  <li key={category.id} className="m-0">
    <Link
      href={category.uri}
      className={`
      flex
      py-3
      px-3
      border-t
      hover:bg-gray-100
      ${currentCategory == category.id && 'font-bold'}
    `}
    >
      {category.name}
    </Link>
    {category.children && category.children.edges.length > 0 && (
      <ul className="list-none ml-4">
        {category.children.edges.map(({ node }) => (
          <Category
            key={node.id}
            category={node}
            currentCategory={currentCategory}
          />
        ))}
      </ul>
    )}
  </li>
)

export default function BlogArchive(props) {
  const [posts, setPosts] = useState(props.posts.edges)
  const [pageInfo, setPageInfo] = useState(props.posts.pageInfo)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      const getMore = async () => {
        const result = await props
          .fetchMore(pageInfo.endCursor)
          .catch(() => setLoading(false))

        if (result) {
          setLoading(false)
          setPosts(posts.concat(result.posts.edges))
          setPageInfo(result.posts.pageInfo)
        }
      }

      getMore()
    }
  }, [loading])

  useEffect(() => {
    setPosts(props.posts.edges)
    setPageInfo(props.posts.pageInfo)
  }, [props.posts])

  return (
    <Wrap>
      <div className="lg:flex flex-row-reverse">
        <div className="flex-1 mb-12 lg:mb-0">
          <Title>{props.title}</Title>
          {props.description && <p className="mb-10">{props.description}</p>}

          {posts.length ? (
            posts.map(({ node }) => <Post post={node} key={node.id} />)
          ) : (
            <div>
              <p>There are no blog posts yet.</p>
            </div>
          )}

          {pageInfo.hasNextPage && (
            <a
              className={`
              ${
                loading
                  ? 'bg-gray-500 text-gray-300'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }
              px-3
              py-3
              font-bold
              flex
              justify-center
              cursor-pointer
            `}
              onClick={() => setLoading(true)}
            >
              Load more posts
            </a>
          )}
        </div>
        <div className="lg:w-1/4 lg:mr-16">
          <h3 className="mb-6">Blog categories</h3>
          <ul className="list-none border-b">
            <Link
              href="/blog"
              className={`
              flex
              py-3
              px-3
              border-t
              hover:bg-gray-100
              ${!props.currentCategory && 'font-bold'}
            `}
            >
              All categories
            </Link>
            {props.categories.edges.map(({ category }) => (
              <Category
                key={category.id}
                category={category}
                currentCategory={props.currentCategory}
              />
            ))}
          </ul>
        </div>
      </div>
    </Wrap>
  )
}
