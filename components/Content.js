import Button from 'components/Button'
import Link from 'components/Link'
import parse, { domToReact } from 'html-react-parser'

export default ({ content }) => (
  <article className="max-w-none break-words">{parse(content, parser)}</article>
)

const parser = {
  replace: ({ name, attribs, children }) => {
    // Button
    if (name === 'a' && attribs.class === 'wp-block-button__link') {
      return <Button href={attribs.href}>{domToReact(children, parser)}</Button>
    }

    // Link
    if (name === 'a') {
      return <Link href={attribs.href}>{domToReact(children, parser)}</Link>
    }

    // Image
    if (name === 'img') {
    }
  },
}
