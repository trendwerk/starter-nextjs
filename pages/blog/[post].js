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
import postQuery from 'queries/postQuery'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function Post(data) {
  const post = data.post

  return (
    <Layout data={data}>
      <Head
        title={post.fields?.pageTitle || post?.title}
        description={post.fields?.metaDescription}
        image={post.fields?.ogImage?.url || post.fields?.headerImage?.url}
        article={post}
      />

      <Header image={post.fields?.headerImage} title={post?.title} />

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

  return { props: data }
}

export async function getStaticPaths() {
  const data = await getFromApi(`
  query PostPaths {
      posts(first: 10000) {
        nodes {
          uri
        }
      }
    }
  `)

  return {
    paths: data.posts.nodes.map(({ uri }) => uri.replace(/\/$/, '')) || [],
    fallback: false,
  }
}
