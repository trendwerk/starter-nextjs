import Data from 'components/Data'
import Footer from 'components/Footer'
import Menu from 'components/Menu'

const Layout = ({ data, children }) => (
  <div className="flex flex-col min-h-screen">
    <Data.Provider value={{ app: data.app }}>
      <Menu items={data.menuItems} />
      {children}
      <Footer />
    </Data.Provider>
  </div>
)

export default Layout
