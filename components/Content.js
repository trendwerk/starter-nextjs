import Button from 'components/Button'
import Link from 'components/Link'
import Image from 'components/Image'
import parse, { domToReact } from 'html-react-parser'

const Content = ({ content }) => (
  <article className="content max-w-none break-words">
    {parse(content, parser)}
  </article>
)

const parser = {
  replace: ({ name, attribs, children }) => {
    // Buttons
    if (name === 'a' && attribs.class === 'wp-block-button__link') {
      return (
        <Button className="mb-6" href={attribs.href}>
          {domToReact(children, parser)}
        </Button>
      )
    }

    // Links
    if (name === 'a') {
      return (
        <Link className="link" href={attribs.href}>
          {domToReact(children, parser)}
        </Link>
      )
    }

    // Images
    if (name === 'img') {
      return (
        <Image
          width={800}
          alt={attribs.alt}
          src={attribs.src.replace('app/uploads', 'static')}
        />
      )
    }

    // Captions
    if (name === 'figcaption') {
      return (
        <figcaption className="
          italic
          leading-relaxed
          pt-3
          text-center
          text-gray-400
          text-sm
          w-full
        ">
          {domToReact(children, parser)}
        </figcaption>
      )
    }
  },
}

export default Content
