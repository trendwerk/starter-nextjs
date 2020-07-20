import Context from 'components/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Navbar from 'components/Navbar'

export default function({ context, children }) {
  return (
    <Context.Provider value={context}>
      <Head />
      <Navbar />
      {children}
      <Footer />
    </Context.Provider>
  )
}
