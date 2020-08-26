import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Title from 'components/Title'
import Wrap from 'components/Wrap'
import Post from 'components/Post'
import Link from 'components/Link'
import Button from 'components/Button'
import Categories from 'components/Categories'

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
    <Wrap sidebar={<Categories categories={props.categories} currentCategory={props.currentCategory} />}>
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
        <Button
          className="flex justify-center"
          disabled={loading}
          onClick={() => setLoading(true)}
        >
          Load more posts
        </Button>
      )}
    </Wrap>
  )
}
