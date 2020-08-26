import 'styles/main.css'
import Router from 'next/router'
import { useEffect } from 'react'

const App = function ({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    const sendView = (path) => {
      window.gtag('config', process.env.TRACKING_ID, { page_path: path })
    }

    Router.events.on('routeChangeComplete', sendView)

    return () => {
      Router.events.off('routeChangeComplete', sendView)
    }
  }, [])

  return <Component {...pageProps} />
}

export default App
