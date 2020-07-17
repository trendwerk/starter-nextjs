import { get, siteQuery } from 'lib/api'
import Head from 'next/head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'components/Link'

export default function ({ posts, site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>Blog &middot; {site.title}</title>
        </Head>

        <>
          <Title>
            Blog
          </Title>

          <ul>
            {posts.edges.map(({ node }) => (
              <li key={node.id}>
                <Link href="/blog/[slug]" as={`/blog/${node.slug}`} arrowright>
                  {node.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await get(`
    {
      posts(first: 10) {
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
