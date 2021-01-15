import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import Layout from 'components/Layout'
import Page from 'pages/[...page]'
import pageQuery from 'queries/pageQuery'
import Wrap from 'components/Wrap'

export default function Home(data) {
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
            href={`${process.env.CMS_URL}/wp/wp-admin/options-reading.php`}
          >
            reading settings
          </a>{' '}
          to show the homepage.
        </p>
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getFromApi(`
    query Index {
      pages: pageByTemplate(where: { template: "page_on_front" }) {
        nodes {
          ${pageQuery()}
        }
      }
      ${generalQuery()}
    }
  `)
  return { props: data, revalidate: 60 }
}
