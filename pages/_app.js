import 'styles/main.css'
import { useEffect } from 'react'
import Router from 'next/router'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    // Google Analtics
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
