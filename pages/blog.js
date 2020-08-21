import { fetchData, mainQuery } from 'utils/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Post from 'components/Post'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

const Blog = (data) => {
  const posts = data.posts.edges

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
      </Wrap>
    </Layout>
  )
}

export default Blog

export async function getStaticProps() {
  const data = await fetchData(`
    query Blog {
      posts(first: 10) {
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
      ${mainQuery}
    }
  `)

  return { props: data }
}
