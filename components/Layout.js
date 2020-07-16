import Footer from 'components/Footer'
import Head from 'next/head'
import Header from 'components/Header'
import Wrap from 'components/Wrap'

export default function ({ children }) {
  return (
    <div className=" bg-gray-100 flex flex-col min-h-screen">
      <Head>
        <title>Default title</title>
        <meta type="description" value="Default description" key="description" />
      </Head>

      <Header/>

      <Wrap className="mb-8">
        {children}
      </Wrap>

      <Footer/>
    </div>
  )
}
