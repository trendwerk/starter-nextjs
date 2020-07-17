import Footer from 'components/Footer'
import Head from 'components/Head'
import Menu from 'components/Menu'

export default function({ children, site }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head site={site} />
      <Menu site={site} />
      {children}
      <Footer site={site} />
    </div>
  )
}
