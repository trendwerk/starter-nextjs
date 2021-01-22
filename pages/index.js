import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import Page from 'pages/[...page]'
import pageQuery from 'queries/pageQuery'

export default function Home(data) {
  if (!data.pages.nodes.length) {
    return <p>Please select a homepage in WordPress.</p>
  }

  return <Page data={{ ...data, post: data.pages.nodes[0] }} />
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
