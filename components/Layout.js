import Footer from 'components/Footer'
import Head from 'components/Head'
import Header from 'components/Header'
import Wrap from 'components/Wrap'

export default function ({ children, site }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head site={site}/>

      <Header site={site} />

      <Wrap className="mb-8">
        {children}
      </Wrap>

      <Footer site={site} />
    </div>
  )
}
