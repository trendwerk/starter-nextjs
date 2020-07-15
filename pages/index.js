import Head from 'next/head'
import Layout from '../components/Layout'

export default function () {
  return (
    <Layout>
        <Head>
          <title>Page title</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <h1>
          Hello World 🙂
        </h1>
    </Layout>
  )
}
