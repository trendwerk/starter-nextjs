import { useRouter } from 'next/router'
import Content from 'components/Content'
import Form from 'components/Form'
import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import getSubmenu from 'functions/getSubmenu'
import Head from 'components/Head'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'
import pageQuery from 'queries/pageQuery'
import Submenu from 'components/Submenu'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function Page({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Loading fullScreen />
  }

  if (!data.post) {
    return <NotFound data={data} />
  }

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
        <Form
          fields={[
            {
              id: 'name',
              label: 'Naam',
              required: true,
            },
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              required: true,
            },
            {
              id: 'telephone',
              label: 'Telefoon',
              type: 'telephone',
              required: true,
            },
            {
              id: 'message',
              label: 'Uw bericht',
              type: 'textarea',
            },
          ]}
        />
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

  return { props: data, revalidate: 60 }
}

export async function getStaticPaths() {
  const data = await getFromCms(`
    query PostPaths { posts: pages(first: 1000) { nodes { uri } } }
  `)

  return {
    paths:
      data.posts.nodes
        .filter(({ uri }) => uri !== '/')
        .map(({ uri }) => uri.replace(/\/$/, '')) || [],
    fallback: true,
  }
}
