import Head from 'next/head'

export default function ({ children }) {
  return (
    <>
      <Head>
        <title>Default title</title>
        <meta type="description" value="Default description" key="description" />
      </Head>

      <header/>

      <main>
        { children }
      </main>

      <footer/>
    </>
  )
}
