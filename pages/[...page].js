import {
  fetchData,
  mainQuery,
  pageQuery,
} from 'utils/api'
import Content from 'components/Content'
import Head from 'components/Head'
import Header from 'components/Header'
import Submenu from 'components/Submenu'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Wrap from 'components/Wrap'
import { getSubmenu } from 'utils/getMenu'

export default function Page({ data }) {
  const post = data.post
  const submenu = getSubmenu(post, data.menus)

  return (
    <Layout data={data}>
      <Head
        title={post.fields?.pageTitle || post?.title}
        description={post.fields?.metaDescription}
        image={post.fields?.ogImage?.url || post.fields?.headerImage?.url}
      />

      <Header image={post.fields?.headerImage} title={post?.title} />

      <Wrap
        width={!submenu && 800}
        sidebar={submenu && <Submenu data={submenu} current={post.uri} />}
      >
        <Title>{post.title}</Title>
        <Content content={post.content} />
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetchData(
    `
    query Post($id: ID!) {
      post: page(id: $id, idType: URI) {
        ${pageQuery}
      }
      ${mainQuery}
    }
  `,
    { variables: { id: params.page.join('/') } }
  )

  return { props: { data } }
}

export async function getStaticPaths() {
  const data = await fetchData(`
  query PostPaths {
      pages(first: 10000) {
        nodes {
          uri
        }
      }
    }
  `)

  return {
    paths:
      data.pages.nodes
        .filter(({ uri }) => uri !== '/')
        .map(({ uri }) => uri.replace(/\/$/, '')) || [],
    fallback: false,
  }
}
