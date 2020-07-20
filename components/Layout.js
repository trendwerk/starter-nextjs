import Context from 'components/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Navbar from 'components/Navbar'

export default function({ app, children }) {
  return (
    <Context.Provider value={{ app: app }}>
      <Head />
      <Navbar />
      {children}
      <Footer />
    </Context.Provider>
  )
}
