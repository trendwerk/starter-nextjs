import { fetchData, appQuery } from 'lib/api'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'components/Link'

export default function({ app, posts }) {
  return (
    <Layout app={app}>
      <Title>Blog</Title>

      <ul>
        {posts.edges.map(({ node }) => (
          <li key={node.id}>
            <Link href="/blog/[post]" as={`/blog/${node.slug}`} arrowright>
              {node.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchData(`
    query Blog {
      posts(first: 10) {
        edges {
          node {
            slug
            title
            id
          }
        }
      }
      ${appQuery}
    }
  `)
  return { props: data }
}
