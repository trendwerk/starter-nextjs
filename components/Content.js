import Button from 'components/Button'
import Link from 'components/Link'
import parse, { domToReact } from 'html-react-parser'

export default ({ content }) => (
  <article className="max-w-none last:mb-0 break-words leading-7">
    {parse(content, parser)}
  </article>
)

const parser = {
  replace: ({ name, attribs, children }) => {
    // Paragraph
    if (name === 'p') {
      return (
        <p className="text-gray-500 mb-6">{domToReact(children, parser)}</p>
      )
    }

    // Heading 2
    if (name === 'h2') {
      return <h2 className="text-2xl mb-2">{domToReact(children, parser)}</h2>
    }

    // Heading 3
    if (name === 'h3') {
      return <h2 className="text-xl mb-2">{domToReact(children, parser)}</h2>
    }

    // Button
    if (name === 'a' && attribs.class === 'wp-block-button__link') {
      return (
        <Button href={attribs.href} className="mb-6">
          {domToReact(children, parser)}
        </Button>
      )
    }

    // Anchor
    if (name === 'a') {
      return (
        <Link
          href={attribs.href}
          className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
        >
          {domToReact(children, parser)}
        </Link>
      )
    }
  },
}
