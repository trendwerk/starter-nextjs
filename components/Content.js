import Link from 'components/Link'
import parse, { domToReact } from 'html-react-parser'

export default ({ content }) => (
  <article className="prose max-w-none mb-8 last:mb-0 break-words">
    {parse(content, parser)}
  </article>
)

const parser = {
  replace: ({ name, attribs, children }) => {
    if (name === 'a') {
      return <Link href={attribs.href}>{domToReact(children, parser)}</Link>
    }
  },
}
