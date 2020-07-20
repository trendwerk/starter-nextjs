import { fetchData, appQuery } from 'lib/api'
import Button from 'components/Button'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'

export default function({ app, pages }) {
  return (
    <Layout app={app}>
      <Title>Home</Title>

      <Button className="mb-8 w-full" href="/blog" large>Visit our blog</Button>

      <h2 className="mb-4">Pages</h2>

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
      ${appQuery}
    }
  `)
  return { props: data }
}
