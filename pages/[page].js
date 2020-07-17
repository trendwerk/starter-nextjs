import { fetchData, siteQuery } from 'lib/api'
import Content from 'components/Content'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Title from 'components/Title'

export default function({ post, site }) {
  return (
    <Layout site={site}>
      <Head
        title={post?.fields?.seoTitle || post?.title}
        description={post?.fields?.seoDescription}
        site={site}
      />

      <Title>{post.title}</Title>

      <Content content={post.content} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetchData(
    `
    query Page($id: ID!) {
      post: page(id: $id, idType: URI) {
        title
        content
        fields {
          seoTitle
          seoDescription
        }
      }
      ${siteQuery}
    }
  `,
    {
      variables: {
        id: params.page
      }
    }
  )
  return { props: data }
}

export async function getStaticPaths() {
  const data = await fetchData(`
  query PagePaths {
      pages(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  return {
    paths: data.pages.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true
  }
}
