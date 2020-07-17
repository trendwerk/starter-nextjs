import { fetchData, siteQuery } from 'lib/api'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'

export default function ({ pages, site }) {
  return (
    <Layout site={site}>
        <Title>
          Home
        </Title>

        <Link href="/blog">
          Visit our blog
        </Link>

        <h2>Pages</h2>

        <ul>
          {pages.edges.map(({ node }) => (
            <li key={node.id}>
              <Link href="/[page]" as={`/${node.slug}`} arrowright>
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
    query Index {
      pages(first: 10) {
        edges {
          node {
            slug
            title
            id
          }
        }
      }
      ${siteQuery}
    }
  `)
  return { props: data }
}
