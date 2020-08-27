import Data from 'components/Data'
import Footer from 'components/Footer'
import Menu from 'components/Menu'

export default function Layout({ data, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Data.Provider
        value={{
          app: data.app,
          general: data.general.fields,
          menus: data.menus,
        }}
      >
        <Menu menus={data.menus} />
        {children}
        <Footer />
      </Data.Provider>
    </div>
  )
}
