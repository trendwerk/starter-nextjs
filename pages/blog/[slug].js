import { getAllPosts, getPost } from 'lib/blog'
import { getSite } from 'lib/site'
import Head from 'next/head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'components/Link'

export default function ({ post, site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>{post.title} &middot; {site.title}</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <>
          <Title>
            {post.title}
          </Title>

          <div
            className="mb-8 last:border-b-0"
            dangerouslySetInnerHTML={{__html: post.content}}
          />

          <Link href="/blog">
            Back to blog overview
          </Link>
        </>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug)
  const site = await getSite()

  return {
    props: {
      post: data.post,
      site
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()

  return {
    paths: posts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  }
}
