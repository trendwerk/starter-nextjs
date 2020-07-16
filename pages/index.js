import { getSite } from 'lib/site'
import Head from 'next/head'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Link from 'components/Link'

export default function ({ site }) {
  return (
    <Layout site={site}>
        <Head>
          <title>Page title &middot; {site.title }</title>
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
  const site = await getSite()

  return {
    props: { site }
  }
}
