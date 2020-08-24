import Button from 'components/Button'
import Link from 'components/Link'
import Image from 'components/Image'
import parse, { domToReact } from 'html-react-parser'
import { Fragment } from 'react'

const Content = ({ content }) => (
  <article className="content max-w-none break-words">
    {parse(content, parser)}
  </article>
)

const parser = {
  replace: (node) => {
    // Button
    if (
      node.name === 'a' &&
      node.attribs?.class?.includes('wp-block-button__link')
    ) {
      return (
        <Button className="mb-6" href={node.attribs.href}>
          {domToReact(node.children, parser)}
        </Button>
      )
    }

    // Link
    if (node.name === 'a') {
      return (
        <Link className="link" href={node.attribs.href}>
          {domToReact(node.children, parser)}
        </Link>
      )
    }

    // Embed
    if (node.attribs?.class?.includes('wp-block-embed')) {
      const iframe = node.children[0].children.filter(
        (node) => node.name === 'iframe'
      )[0]

      return (
        <figure className="mb-6">
          <div className="relative pb-9/16">
            <iframe
              src={iframe.attribs.src}
              frameBorder={0}
              allow="fullscreen"
              className="h-full w-full top-0 left-0 absolute"
              loading="lazy"
            />
          </div>

          {node.children[1]?.name === 'figcaption' && (
            <Figcaption content={node.children[1].children} />
          )}
        </figure>
      )
    }

    // Image
    if (node.attribs?.class?.includes('wp-block-image')) {
      const link = node.children.filter((node) => node.name === 'a')

      // Without link
      if (!link.length) {
        return <ImageFigure node={node} />
      }

      // With link to image
      if (link[0].attribs.href.indexOf(process.env.WP_URL) === 0) {
        return (
          <div
            onClick={() => {
              const img = link[0].children.filter(
                (node) => node.name === 'img'
              )[0]
              const url =
                parseInt(img.attribs.width) > 1920
                  ? `${img.attribs.src}?w=1920`
                  : img.attribs.src

              console.log(url)
            }}
          >
            <ImageFigure node={node} />
          </div>
        )
      }

      // With external link
      return (
        <Link href={link[0].attribs.href}>
          <ImageFigure node={node} />
        </Link>
      )
    }
  },
}

export default Content

const Figcaption = ({ content }) => (
  <figcaption
    className="
    italic
    leading-relaxed
    pt-2
    text-center
    text-gray-400
    text-sm
    w-full
  "
  >
    {domToReact(content, parser)}
  </figcaption>
)

const ImageFigure = ({ node }) => {
  const image =
    node.children[0].name === 'img'
      ? node.children[0]
      : node.children[0].children[0]

  return (
    <figure className="mb-6">
      <Image
        width={image.attribs.width}
        height={image.attribs.height}
        alt={image.attribs.alt}
        src={image.attribs.src}
      />

      {node.children[1]?.name === 'figcaption' && (
        <Figcaption content={node.children[1].children} />
      )}
    </figure>
  )
}
