import { GeneralProvider } from 'components/GeneralContext'
import Footer from 'components/Footer'
import Menu from 'components/Menu'

export default function Layout({ data, children }) {
  return (
    <GeneralProvider data={data}>
      <div className="flex flex-col min-h-screen">
        <Menu menus={data.menus} />
        {children}
        <Footer />
      </div>
    </GeneralProvider>
  )
}
