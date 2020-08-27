import Button from 'components/Button'
import clsx from 'clsx'
import Image from 'components/Image'
import LightboxWrap, { SRLWrapper as Lightbox } from 'simple-react-lightbox'
import Link from 'components/Link'
import parse, { domToReact } from 'html-react-parser'

export default function Content({ content }) {
  return (
    <article className="content max-w-none break-words">
      {content && parse(content, parser)}
    </article>
  )
}

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
          <LightboxWrap>
            <Lightbox
              customCaptions={
                node.children[1]?.name === 'figcaption'
                  ? [{ id: 0, caption: node.children[1].children[0].data }]
                  : undefined
              }
              options={{
                buttons: {
                  showDownloadButton: false,
                  showFullscreenButton: false,
                  showNextButton: false,
                  showPrevButton: false,
                  showThumbnailsButton: false,
                },
                settings: {
                  autoplaySpeed: 0,
                },
                thumbnails: {
                  showThumbnails: false,
                },
              }}
            >
              <ImageFigure node={node} className="cursor-pointer" />
            </Lightbox>
          </LightboxWrap>
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

const ImageFigure = ({ node, className = '' }) => {
  const figure = node.name === 'figure' ? node : node.children[0]
  const image =
    figure.children[0].name === 'img'
      ? figure.children[0]
      : figure.children[0].children[0]
  let width = 800
  let height = undefined

  if (image.attribs.width || image.attribs.height) {
    width = parseInt(image.attribs.width) || undefined
    height = parseInt(image.attribs.height) || undefined
  } else if (figure.attribs.class.includes('size-thumbnail')) {
    width = 150
    height = 150
  } else if (figure.attribs.class.includes('size-medium')) {
    width = 300
  }

  return (
    <figure className={clsx('mb-6', figure.attribs.class, className)}>
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
