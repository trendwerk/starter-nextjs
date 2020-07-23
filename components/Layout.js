import Context from 'components/Context'
import Footer from 'components/Footer'
import Head from 'components/Head'
import Menu from 'components/Menu'

export default function ({ data, children }) {
  return (
    <Context.Provider
      value={{
        app: data.app,
        menuItems: data.menuItems,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Menu />
        {children}
        <Footer />
      </div>
    </Context.Provider>
  )
}
