import { fetchData, appQuery } from 'lib/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function({ app, posts }) {
  return (
    <Layout context={{ app }}>
      <Head title='Blog' />

      <Wrap width="800">
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
