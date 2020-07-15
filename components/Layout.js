import Head from 'next/head'

export default function ({ children }) {
  return (
    <>
      <Head>
        <title>Hello world 🙂</title>
      </Head>

      <header>
        [header]
      </header>

      <main>
        { children }
      </main>

      <footer>
        [footer]
      </footer>
    </>
  )
}
