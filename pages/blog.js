import { fetchData, mainQuery } from 'utils/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Post from 'components/Post'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function (data) {
  const posts = data.posts.edges

  return (
    <Layout data={data}>
      <Head title="Blog" />

      <Wrap width="800">
        <Title>Blog</Title>

        {posts.map(({ node }) => (
          <Post post={node} key={node.id} />
        ))}
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchData(`
    query Blog {
      posts(first: 10) {
        edges {
          node {
            title
            id
            date
            excerpt
            uri
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
