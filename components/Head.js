import Head from 'next/head'
import tailwind from 'tailwind.config'

export default function ({ title, description, image, site }) {
  image = image || 'share.png'
  title = title ? `${title} - ${site.title}`: site.title

  const canonical = '#'
  const color = tailwind.theme.colors.brand[600]
  const language = site?.language

  return (
    <Head>
      <title>{title}</title>
      {description && <meta key="description" type="description" value={description} />}
      {description && <meta key="twitter:description" property="twitter:description" content={description} />}
      {language && <meta key="og:locale" property="og:locale" content={language} />}
      <meta key="msapplication-TileColor" name="msapplication-TileColor" content={color} />
      <meta key="og:image:alt" property="og:image:alt" content={title} />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:image:secure_url" property="og:image:secure_url" content={image} />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:url" property="og:image:url" content={image} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:site_name" property="og:site_name" content={site.title} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="theme-color" name="theme-color" content={color} />
      <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
      <meta key="twitter:creator" property="twitter:creator" content={site.title} />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <link key="apple-touch-icon" rel="apple-touch-icon" sizes="180x180" href="/icon-180.png" />
      <link key="canonical" rel="canonical" href={canonical} />
      <link key="favicon-16" rel="icon" type="image/png" sizes="16x16" href="/icon-16.png"/>
      <link key="favicon-32" rel="icon" type="image/png" sizes="32x32" href="/icon-32.png"/>
      <link key="font" href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap" rel="stylesheet" />
      <link key="manifest" rel="manifest" href="/manifest.json" />
    </Head>
  )
}
