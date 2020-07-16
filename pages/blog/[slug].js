import { getAllPosts, getPost } from 'lib/blog'
import { getSite } from 'lib/site'
import Head from 'next/head'
import Layout from 'components/Layout'

export default function ({ post, site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>{post.title} &middot; {site.title}</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <>
          <h1>
            {post.title}
          </h1>

          <div dangerouslySetInnerHTML={{__html: post.content}} />
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
