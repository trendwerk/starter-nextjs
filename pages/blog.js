import { getPosts } from 'lib/blog'
import { getSite } from 'lib/site'
import Head from 'next/head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'components/Link'

export default function ({ posts, site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>Blog &middot; {site.title }</title>
        </Head>

        <>
          <Title>
            Blog
          </Title>

          <ul>
            {posts.edges.map(({ node }) => (
              <li key={node.id}>
                <Link href="/blog/[slug]" as={`/blog/${node.slug}`}>
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
  const posts = await getPosts()
  const site = await getSite()

  return {
    props: { posts, site }
  }
}
