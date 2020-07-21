import Link from 'components/Link'

export default function ({ menu }) {
  return (
    <ul>
      {menu.edges.map(({ node }) => (
        <li key={node.id}>
          <Link href={node.url} className="link" arrowright>
            {node.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
