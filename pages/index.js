import { getPages } from 'lib/pages'
import { getPosts } from 'lib/blog'
import { getSite } from 'lib/site'
import Head from 'next/head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'next/link'

export default function ({ pages, posts, site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>Page title &middot; {site.title }</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <>
          <Title>
            Home
          </Title>

          <ul>
            {pages.edges.map(({ node }) => (
              <li key={node.id}>
                {node.title}
              </li>
            ))}
          </ul>

          <ul>
            {posts.edges.map(({ node }) => (
              <li key={node.id}>
                <Link href="/blog/[slug]" as={`/blog/${node.slug}`}>
                  <a>{node.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
    </Layout>
  )
}

export async function getStaticProps() {
  const pages = await getPages()
  const posts = await getPosts()
  const site = await getSite()

  return {
    props: { pages, posts, site }
  }
}
