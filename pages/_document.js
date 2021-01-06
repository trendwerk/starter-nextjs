import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={process.env.LANGUAGE} className="antialiased">
        <Head>{process.env.NODE_ENV === 'production' && <Analytics />}</Head>
        <body className="overflow-x-hidden text-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

const Analytics = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${process.env.TRACKING_ID}', {
            page_path: window.location.pathname
          });
        `,
      }}
    />
  </>
)
