import Footer from 'components/Footer'
import Head from 'components/Head'
import Menu from 'components/Menu'

export default function({ app, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head app={app} />
      <Menu app={app} />
      {children}
      <Footer app={app} />
    </div>
  )
}
