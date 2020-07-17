import { fetchData, siteQuery } from 'lib/api'
import Head from 'next/head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'components/Link'

export default function ({ post, site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>{post.title} - {site.title}</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <>
          <Title>
            {post.title}
          </Title>

          <div
            className="mb-8 last:border-b-0"
            dangerouslySetInnerHTML={{__html: post.content}}
          />

          <Link href="/" arrowleft>
            Back to home
          </Link>
        </>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetchData(`
    query Page($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
      }
      ${siteQuery}
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
