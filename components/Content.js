import Button from 'components/Button'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'components/Image'
import LightboxWrap, { SRLWrapper as Lightbox } from 'simple-react-lightbox'
import Link from 'components/Link'
import parse, { domToReact } from 'html-react-parser'

const Video = dynamic(() => import('components/Video'), {
  loading: () => <Loading />,
})

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

      const isVideo =
        node.attribs?.class?.includes('is-provider-vimeo') ||
        node.attribs?.class?.includes('is-provider-youtube')

      return (
        <figure className="mb-6">
          <Video src={iframe.attribs.src} title={iframe.attribs.title} />

          {node.children[1]?.name === 'figcaption' && (
            <Figcaption content={node.children[1].children} />
          )}
        </figure>
      )
    }

    // Image
    if (node.attribs?.class?.includes('wp-block-image')) {
      const link =
        node.children[0].name === 'a'
          ? node.children[0]
          : node.children[0].children[0]?.name === 'a'
          ? node.children[0].children[0]
          : false

      // Without link
      if (!link) {
        return <ImageFigure node={node} />
      }

      const caption =
        node.children[1]?.name === 'figcaption'
          ? node.children[1].children[0].data
          : node.children[0]?.children[1]?.name === 'figcaption'
          ? node.children[0].children[1].children[0].data
          : false

      // With link to image
      if (link.attribs.href.indexOf(process.env.CMS_URL) === 0) {
        return (
          <LightboxWrap>
            <Lightbox
              customCaptions={caption ? [{ id: 0, caption }] : undefined}
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
        <Link href={link.attribs.href}>
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
    <figure className={classnames('mb-6', figure.attribs.class, className)}>
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
