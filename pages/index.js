import Head from 'next/head'
import Layout from '../components/Layout'
import Wrap from '../components/Wrap'
import { getPosts } from '../lib/posts'
import { getPages } from '../lib/pages'

export default function ({ pages, posts }) {
  return (
    <Layout>
        <Head>
          <title>Page title</title>
          <meta type="description" value="Page description" key="description" />
        </Head>

        <Wrap>
          <h1>
            Hello there 🙂
          </h1>

          <h2>
            Here are some pages
          </h2>

          <ul>
            {pages.edges.map(({ node }) => (
              <li key={node.id}>
                {node.title}
              </li>
            ))}
          </ul>

          <h2>
            And here are some posts
          </h2>

          <ul>
            {posts.edges.map(({ node }) => (
              <li key={node.id}>
                {node.title}
              </li>
            ))}
          </ul>
        </Wrap>
    </Layout>
  )
}

export async function getStaticProps() {
  const pages = await getPages()
  const posts = await getPosts()

  return {
    props: { pages, posts }
  }
}
