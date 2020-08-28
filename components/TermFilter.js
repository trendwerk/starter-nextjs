import { useState } from 'react'

export default function TermFilter({ terms, title }) {
  const [active, setActive] = useState([])

  return (
    <div>
      <h3>{title}</h3>
      <ul className="list-none">
        {terms.map(({ node }) => (
          <li key={node.id}>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={active.indexOf(node.slug) !== -1}
                onChange={event => event.target.checked ? setActive([...active, node.slug]) : setActive(active.filter(item => item !== node.slug))}
              />
              {node.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
