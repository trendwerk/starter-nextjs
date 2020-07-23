import Data from 'components/Data'
import Footer from 'components/Footer'
import Menu from 'components/Menu'

export default function ({ data, children }) {
  return (
    <Data.Provider value={{ app: data.app }}>
      <div className="flex flex-col min-h-screen">
        <Menu items={data.menuItems} />
        {children}
        <Footer />
      </div>
    </Data.Provider>
  )
}
