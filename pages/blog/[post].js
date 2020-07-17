import { fetchData, siteQuery } from 'lib/api'
import Content from 'components/Content'
import Head from 'next/head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'

export default function({ post, site }) {
  return (
    <Layout site={site}>
      <Head>
        <title>
          {post.title} - {site.title}
        </title>
        <meta type="description" value="Page description" key="description" />
      </Head>

      <>
        <Title>{post.title}</Title>

        <Content content={post.content} />

        <Link href="/blog" arrowleft>
          Back to blog overview
        </Link>
      </>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetchData(
    `
    query Post($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
      }
      ${siteQuery}
    }
  `,
    {
      variables: {
        id: params.post
      }
    }
  )
  return { props: data }
}

export async function getStaticPaths() {
  const data = await fetchData(`
  query PostPaths {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  return {
    paths: data.posts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true
  }
}
