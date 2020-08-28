import { useState, useEffect } from 'react'
import Post from 'components/Post'
import Button from 'components/Button'

export default function Posts(props) {
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
    <>
      {posts.length ? (
        posts.map(({ node }) => <Post post={node} key={node.id} />)
      ) : (
        <div>
          <p>We couldn't find any posts matching your criteria.</p>
        </div>
      )}

      {pageInfo.hasNextPage && (
        <Button
          className="flex justify-center"
          disabled={loading}
          onClick={() => setLoading(true)}
        >
          Load more posts
        </Button>
      )}
    </>
  )
}
