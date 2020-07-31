import { fetchData, mainQuery } from 'utils/api'
import Button from 'components/Button'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function (data) {

  return (
    <Layout data={data}>
      <Head title="Home" />

      <Wrap className="text-center" width="600">
        <Title>Page not found</Title>

        <p className="mb-8">The page you are looking for doesn't exist or has been moved. Go to the <Link href="/" className="link">homepage</Link> or use the menu to find the page you are looking for.</p>

        <Button href="/" large>
          Go to the homepage
        </Button>
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchData(`
    query Index {
      ${mainQuery}
    }
  `)
  return { props: data }
}
