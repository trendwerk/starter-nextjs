import Context from 'components/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Navbar from 'components/Navbar'

export default function ({ context, children }) {
  return (
    <Context.Provider value={context}>
      <Head />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </Context.Provider>
  )
}
