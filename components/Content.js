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
    if (name === 'a' && attribs.class && attribs.class.includes('wp-block-button__link')) {
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

    // Image blocks
    if (name === 'div' && attribs.class.includes('wp-block-image')) {
      return (
        <figure className={`mb-6 ${children[0].attribs.class}`}>
          {domToReact(children[0].children, parser)}
        </figure>
      )
    }

    // Images
    if (name === 'img') {
      return (
        <Image
          width={attribs.width || 800}
          height={attribs.height || undefined}
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
          pt-2
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
