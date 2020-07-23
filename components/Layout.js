import Data from 'components/Data'
import Footer from 'components/Footer'
import Menu from 'components/Menu'

export default ({ data, children }) => (
  <div className="flex flex-col min-h-screen">
    <Data.Provider value={{ app: data.app }}>
      <Menu items={data.menuItems} />
      {children}
      <Footer />
    </Data.Provider>
  </div>
)
