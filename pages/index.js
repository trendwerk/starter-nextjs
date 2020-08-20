import { fetchData, mainQuery } from 'utils/api'
import Button from 'components/Button'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'
import Wrap from 'components/Wrap'
import Page from 'pages/[page]'

const Home = (data) => {
  if (data.home.nodes.length) {
    return <Page data={{ ...data, post: data.home.nodes[0] }} />
  }

  return (
    <Layout data={data}>
      <Head title="Home" description="" />

      <Wrap width="800">
        <Title>Home</Title>

        <Button className="mb-8 w-full" href="/blog" large>
          Visit our blog
        </Button>

        <h2 className="mb-4">Pages</h2>
        <ul>
          {data.pages.nodes.map((node) => (
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

export default Home

export async function getStaticProps() {
  const data = await fetchData(`
    query Index {
      home: pageByTemplate(where: { template: "page_on_front" }) {
        nodes {
          title
          content
          fields {
            headerImage {
              url:sourceUrl
            }
            title
            metaDescription
          }
        }
      }
      pages(first: 10) {
        nodes {
          id
          title
          uri
        }
      }
      ${mainQuery}
    }
  `)
  return { props: data }
}
