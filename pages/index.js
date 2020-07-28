import { fetchData, mainQuery } from 'utils/api'
import Button from 'components/Button'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

const Pages = function (data) {
  const pages = data.pages.edges

  return (
    <Layout data={data}>
      <Head title="Home" />

      <Wrap width="800">
        <Title>Home</Title>

        <Button className="mb-8 w-full" href="/blog" large>
          Visit our blog
        </Button>

        <h2 className="mb-4">Pages</h2>
        <ul>
          {pages.map(({ node }) => (
            <li key={node.id}>
              <Link href={node.uri} className="link" arrow="right">
                {node.title}
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </Layout>
  )
}

export default Pages

export async function getStaticProps() {
  const data = await fetchData(`
    query Index {
      pages(first: 10) {
        edges {
          node {
            id
            title
            uri
          }
        }
      }
      ${mainQuery}
    }
  `)
  return { props: data }
}
