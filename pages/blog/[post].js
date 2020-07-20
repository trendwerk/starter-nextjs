import { fetchData, appQuery } from 'lib/api'
import Content from 'components/Content'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function({ app, post }) {
  return (
    <Layout context={{ app, post }}>
      <Head
        title={post?.fields?.title || post?.title}
        description={post?.fields?.metaDescription}
      />

      <Wrap width="800">
        <Title>{post.title}</Title>

        <Content content={post.content} />

        <Link href="/blog" arrowleft>
          Back to blog overview
        </Link>
      </Wrap>
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
      ${appQuery}
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
