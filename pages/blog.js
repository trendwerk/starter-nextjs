import { useState, useEffect } from 'react'
import { fetchData, mainQuery } from 'utils/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Post from 'components/Post'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

const buildPostsQuery = (cursor = '') => `
  posts(first: 2, after: "${cursor}") {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        title
        uri
        dateFormatted
        summary
        fields {
          summaryTitle
          summary
          summaryImage {
            url:sourceUrl
          }
          headerImage {
            url:sourceUrl
          }
        }
      }
    }
  }
`

const Blog = (data) => {
  const [posts, setPosts] = useState(data.posts.edges)
  const [pageInfo, setPageInfo] = useState(data.posts.pageInfo)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (loading) {
      const getMore = async () => {
        const result = await fetchData(`
          query MorePosts {
            ${buildPostsQuery(pageInfo.endCursor)}
          }
        `).catch(() => setLoading(false))

        if (result) {
          setLoading(false)
          setPosts(posts.concat(result.posts.edges))
          setPageInfo(result.posts.pageInfo)
        }
      }

      getMore()
    }
  }, [loading])

  return (
    <Layout data={data}>
      <Head title="Blog" description="" />

      <Wrap width="800">
        <Title>Blog</Title>

        {posts.length ? posts.map(({ node }) => (
          <Post post={node} key={node.id} />
        )) : (
          <div>
            <p>There are no blog posts yet.</p>
          </div>
        )}

        {pageInfo.hasNextPage && (
          <a className={`${loading ? 'bg-gray-500 text-gray-300' : 'bg-gray-800 hover:bg-gray-700 text-white'} px-3 py-3 font-bold flex justify-center cursor-pointer`} onClick={() => setLoading(true)}>Load more posts</a>
        )}
      </Wrap>
    </Layout>
  )
}

export default Blog

export async function getStaticProps() {
  const data = await fetchData(`
    query Blog {
      ${buildPostsQuery()}
      ${mainQuery}
    }
  `)

  return { props: data }
}
