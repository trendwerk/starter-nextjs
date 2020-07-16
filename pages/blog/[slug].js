import Head from 'next/head'
import Layout from 'components/Layout'
import { getAllPosts, getPost } from 'lib/blog'

export default function ({ post }) {
  return (
    <Layout>
        <Head>
          <title>{post.title} - [sitename]</title>
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

  return {
    props: {
      post: data.post,
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
