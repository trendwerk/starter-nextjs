import Button from 'components/Button'
import Link from 'components/Link'
import Image from 'components/Image'
import parse, { domToReact } from 'html-react-parser'

export default ({ content }) => (
  <article className="content max-w-none break-words">{parse(content, parser)}</article>
)

const parser = {
  replace: ({ name, attribs, children }) => {
    // Button
    if (name === 'a' && attribs.class === 'wp-block-button__link') {
      return <Button className="mb-8" href={attribs.href}>{domToReact(children, parser)}</Button>
    }

    // Link
    if (name === 'a') {
      return <Link href={attribs.href}>{domToReact(children, parser)}</Link>
    }

    // Image
    if (name === 'img') {
      return (
        <Image
          className="mb-6"
          width={800}
          alt={attribs.alt}
          src={attribs.src.replace('app/uploads', 'static')}
        />
      )
    }
  },
}
