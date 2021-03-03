import { useRouter } from 'next/router'
import Categories from 'components/Categories'
import categoriesQuery from 'queries/categoriesQuery'
import Content from 'components/Content'
import Date from 'components/Date'
import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import Head from 'components/Head'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'
import postQuery from 'queries/postQuery'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function Post(data) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Loading fullScreen />
  }

  if (!data.post) {
    return <NotFound data={data} />
  }

  const post = data.post
  const fields = post.fields

  return (
    <Layout data={data}>
      <Head
        title={fields?.pageTitle || post?.title}
        description={fields?.metaDescription}
        image={fields?.ogImage?.url || fields?.headerImage?.url}
        article={post}
      />

      <Header image={fields?.headerImage} title={post?.title} />

      <Wrap
        sidebar={
          <Categories categories={data.categories} currentCategory={false} />
        }
      >
        <Date className="mb-2 text-sm lg:text-base" date={post.dateFormatted} />

        <Title>{post.title}</Title>

        <Content content={post.content} />

        <Link href="/blog" arrow="left" className="link">
          Back to the blog
        </Link>
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getFromApi(
    `
    query Post($id: ID!) {
      post(id: $id, idType: URI) {
        ${postQuery()}
      }
      ${categoriesQuery()}
      ${generalQuery()}
    }
  `,
    { variables: { id: '/blog/' + params.post } }
  )

  return { props: data, revalidate: 60 }
}

export async function getStaticPaths() {
  const data = await getFromApi(`
  query PostPaths {
      posts(first: 1000) {
        nodes {
          uri
        }
      }
    }
  `)

  return {
    paths: data.posts.nodes.map(({ uri }) => uri.replace(/\/$/, '')) || [],
    fallback: true,
  }
}
