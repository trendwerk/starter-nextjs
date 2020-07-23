import { fetchData, mainQuery } from 'lib/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function (data) {
  const posts = data.posts.edges

  return (
    <Layout data={data}>
      <Head title="Blog" />

      <Wrap width="800">
        <Title>Blog</Title>

        <ul>
          {posts.map(({ node }) => (
            <li key={node.id}>
              <Link href={`/blog/${node.slug}`} className="link" arrow="right">
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
      ${mainQuery}
    }
  `)
  return { props: data }
}
