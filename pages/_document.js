import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={process.env.LANGUAGE}>
        <Head />
        <body className="overflow-x-hidden text-gray-800 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
