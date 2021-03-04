import { default as NextHead } from 'next/head'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Analytics from 'components/Analytics'
import GeneralContext from 'components/GeneralContext'
import tailwind from 'tailwind.config'

export default function Head({
  article,
  description = false,
  image,
  index = true,
  title,
}) {
  const { app, general } = useContext(GeneralContext)

  const { asPath } = useRouter()

  title = title ? `${title} - ${app.title}` : app.title

  const url =
    asPath === '/' ? process.env.SITE_URL : process.env.SITE_URL + asPath
  const color = tailwind.theme.extend.colors.brand[600]
  const language = app?.language

  image = image
    ? image + '?w=1200&h=630&fit=crop'
    : process.env.SITE_URL + '/share.png'

  const organization = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "${general.companyName || app.title}",
    "logo": "${process.env.SITE_URL}/logo.png",
    "image": "${process.env.SITE_URL}/share.png",
    ${
      general.address
        ? `
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "${general.address}",
            "addressLocality": "${general.city}",
            "postalCode": "${general.zipcode}",
            "addressCountry": "NL"
          },
        `
        : ''
    }
    ${
      general.email
        ? `
          "email": "${general.email}",
        `
        : ''
    }
    "priceRange": "€€",
    ${
      general.telephone
        ? `
          "telephone": "${general.telephone}",
        `
        : ''
    }
    "url": "${process.env.SITE_URL}"
  }`

  article = article
    ? `{
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
      },
      "headline": "${title}",
      "image": "${image}",
      "description": "${article.fields.summary || article.summary}",
      "datePublished": "${article.date}",
      "dateModified": "${article.modified}",
      "author": {
        "@type": "Person",
        "name": "${article.author.node.name}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "${general.companyName || app.title}"
      }
    }`
    : false

  return (
    <NextHead>
      <title>{title}</title>
      {description && (
        <meta key="description" name="description" content={description} />
      )}
      {description && (
        <meta
          key="twitter:description"
          property="twitter:description"
          content={description}
        />
      )}
      {language && (
        <meta key="og:locale" property="og:locale" content={language} />
      )}
      <meta
        key="msapplication-TileColor"
        name="msapplication-TileColor"
        content={color}
      />
      <meta key="og:image:alt" property="og:image:alt" content={title} />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta
        key="og:image:secure_url"
        property="og:image:secure_url"
        content={image}
      />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:url" property="og:image:url" content={image} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:site_name" property="og:site_name" content={app.title} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="robots" name="robots" content={index ? 'index' : 'noindex'} />
      <meta key="theme-color" name="theme-color" content={color} />
      <meta
        key="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:creator"
        property="twitter:creator"
        content={app.title}
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <link
        key="apple-touch-icon"
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icon-180.png"
      />
      <link key="canonical" rel="canonical" href={url} />
      <link
        key="favicon-16"
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icon-16.png"
      />
      <link
        key="favicon-32"
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icon-32.png"
      />
      <link
        key="font"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap"
        onload="this.onload=null;this.rel='stylesheet'"
        rel="preload"
      />
      <noscript key="font-noscript">
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap"
          rel="stylesheet"
        />
      </noscript>
      <link key="manifest" rel="manifest" href="/manifest.json" />
      <link
        key="preconnect-fonts-static"
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        key="preconnect-ga"
        rel="preconnect"
        href="https://www.google-analytics.com"
        crossOrigin="true"
      />
      <link
        key="preconnect-gtm"
        rel="preconnect"
        href="https://www.googletagmanager.com"
        crossOrigin="true"
      />
      <script
        key="localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organization }}
      />
      {article && (
        <script
          key="article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: article }}
        />
      )}
      <Analytics />
    </NextHead>
  )
}
