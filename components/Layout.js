import Context from 'components/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Menu from 'components/Menu'

export default function({ app, children }) {
  return (
    <Context.Provider value={{ app: app }}>
      <div className="flex flex-col min-h-screen">
        <Head />
        <Menu />
        {children}
        <Footer />
      </div>
    </Context.Provider>
  )
}
