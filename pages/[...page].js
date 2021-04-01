import Content from 'components/Content'
import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import getSubmenu from 'functions/getSubmenu'
import Head from 'components/Head'
import Header from 'components/Header'
import Layout from 'components/Layout'
import pageQuery from 'queries/pageQuery'
import Submenu from 'components/Submenu'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

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
  const data = await getFromApi(
    `
    query Post($id: ID!) {
      post: page(id: $id, idType: URI) {
        ${pageQuery()}
      }
      ${generalQuery()}
    }
  `,
    { variables: { id: params.page.join('/') } }
  )

  return { props: { data } }
}

export async function getStaticPaths() {
  const data = await getFromApi(`
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
    fallback: 'blocking',
  }
}
