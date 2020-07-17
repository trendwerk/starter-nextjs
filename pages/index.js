import { fetchData, siteQuery } from 'lib/api'
import Head from 'next/head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'

export default function ({ site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>Page title - {site.title }</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <>
          <Title>
            Home
          </Title>

          <Link href="/blog">
            Visit our blog
          </Link>
        </>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchData(`
    {
      ${siteQuery}
    }
  `)
  return { props: data }
}
