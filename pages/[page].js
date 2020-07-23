import { fetchData, mainQuery } from 'utils/api'
import Content from 'components/Content'
import Head from 'components/Head'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function (data) {
  const post = data.post

  return (
    <Layout data={data}>
      <Head
        title={post?.fields?.title || post?.title}
        description={post?.fields?.metaDescription}
        image={post?.fields?.ogImage?.url || post?.fields?.headerImage?.url}
      />

      <Header image={post?.fields?.headerImage} title={post?.title} />

      <Wrap width="800">
        <Title>{post.title}</Title>

        <Content blocks={post.blocks} />
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetchData(
    `
    query Page($id: ID!) {
      post: page(id: $id, idType: URI) {
        title
        blocks {
          name
          saveContent
          innerBlocks {
            saveContent
          }
        }
        fields {
          headerImage {
            url:sourceUrl
          }
          title
          metaDescription
        }
      }
      ${mainQuery}
    }
  `,
    {
      variables: {
        id: params.page,
      },
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
    fallback: true,
  }
}
