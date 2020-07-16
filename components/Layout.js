import Footer from 'components/Footer'
import Head from 'next/head'
import Header from 'components/Header'
import Wrap from 'components/Wrap'

export default function ({ children, site }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{site.title}</title>
        <meta type="description" value={site.description} key="description"/>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap" rel="stylesheet"/>

      </Head>

      <Header site={site} />

      <Wrap className="mb-8">
        {children}
      </Wrap>

      <Footer site={site} />
    </div>
  )
}
