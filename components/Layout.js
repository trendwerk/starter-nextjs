import Context from 'components/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Menu from 'components/Menu'

export default function({ app, children }) {
  return (
    <Context.Provider value={{ app: app }}>
      <Head />
      <Menu />
      {children}
      <Footer />
    </Context.Provider>
  )
}
