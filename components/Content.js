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
    // Buttons
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

    // Links
    if (node.name === 'a') {
      return (
        <Link className="link" href={node.attribs.href}>
          {domToReact(node.children, parser)}
        </Link>
      )
    }

    // Embeds
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

    // Image blocks
    if (node.attribs?.class?.includes('wp-block-image')) {
      const figure = node.name === 'figure' ? node : node.children[0]
      const image =
        figure.children[0].name === 'img'
          ? figure.children[0]
          : figure.children[0].children[0]

      let width = 800
      let height = undefined

      if (image.attribs.width || image.attribs.height) {
        width = image.attribs.width || undefined
        height = image.attribs.height || undefined
      } else if (figure.attribs.class.includes('size-thumbnail')) {
        width = 150
        height = 150
      } else if (figure.attribs.class.includes('size-medium')) {
        width = 300
      }

      return (
        <figure className={`mb-6 ${figure.attribs.class}`}>
          <Image
            width={width}
            height={height}
            alt={image.attribs.alt}
            src={image.attribs.src}
          />

          {figure.children[1]?.name === 'figcaption' && (
            <Figcaption content={figure.children[1].children} />
          )}
        </figure>
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
