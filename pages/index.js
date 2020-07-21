import { fetchData, appQuery } from 'lib/api'
import Button from 'components/Button'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Menu from 'components/Menu'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function({ mainMenu, app, pages }) {
  return (
    <Layout context={{ app }}>
      <Head title='Home' />
      <Menu menu={mainMenu} />
      <Wrap width="800">
        <Title>Home</Title>

        <Button className="mb-8 w-full" href="/blog" large>Visit our blog</Button>

        <h2 className="mb-4">Pages</h2>

        <ul>
          {pages.edges.map(({ node }) => (
            <li key={node.id}>
              <Link href={`/${node.slug}`} arrowright>
                {node.title}
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchData(`
    query Index {
      pages(first: 10) {
        edges {
          node {
            slug
            title
            id
          }
        }
      }
      ${appQuery}
      mainMenu: menuItems(where:{location: MAIN}) {
        edges {
          node {
            id
            label
            url
          }
        }
      }
    }
  `)
  return { props: data }
}
