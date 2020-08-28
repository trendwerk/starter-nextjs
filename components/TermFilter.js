export default function TermFilter({ terms, title }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {terms.map(({ node }) => (
          <li key={node.id}>{node.name}</li>
        ))}
      </ul>
    </div>
  )
}
