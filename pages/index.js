import { fetchData, mainQuery } from 'utils/api'
import Page from 'pages/[page]'
import Layout from 'components/Layout'
import Wrap from 'components/Wrap'

const Home = (data) => {
  if (data.pages.nodes.length) {
    return <Page data={{ ...data, post: data.pages.nodes[0] }} />
  }

  return (
    <Layout data={data}>
      <Wrap className="text-center">
        <p>
          Please select a static homepage in your{' '}
          <a
            className="link"
            href={`${process.env.WP_URL}/wp/wp-admin/options-reading.php`}
          >
            reading settings
          </a>{' '}
          to show the homepage.
        </p>
      </Wrap>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const data = await fetchData(`
    query Index {
      pages: pageByTemplate(where: { template: "page_on_front" }) {
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
      ${mainQuery}
    }
  `)
  return { props: data }
}
