import Link from 'components/Link'
import parse, { domToReact } from 'html-react-parser'

export default ({ content }) => (
  <article className="prose max-w-none mb-8 last:mb-0 break-words">
    {parse(content, parser)}
  </article>
)

const parser = {
  replace: (node) => {
    if (node.name === 'a') {
      return (
        <Link href={node.attribs.href}>
          {domToReact(node.children, parser)}
        </Link>
      )
    }

    return node
  },
}
