import Context from 'lib/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Menu from 'components/Menu'

export default function ({ context, children }) {
  return (
    <Context.Provider value={context}>
      <Head />
      <div className="flex flex-col min-h-screen">
        <Menu />
        {children}
        <Footer />
      </div>
    </Context.Provider>
  )
}
