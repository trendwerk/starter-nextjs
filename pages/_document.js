import Document, { Html, Head, Main, NextScript } from 'next/document'

const LANGUAGE = process.env.LANGUAGE

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={LANGUAGE} className="antialiased">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
