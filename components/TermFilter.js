import { useState, useEffect } from 'react'

export default function TermFilter({ terms, title, onChange }) {
  const [active, setActive] = useState([])
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    if (changed) {
      onChange(active)
    }

    setChanged(true)
  }, [active])

  return (
    <div>
      <h3 className="mb-6">{title}</h3>
      <ul className="list-none border-b">
        {terms.map(({ node }) => (
          <li key={node.id} className="m-0">
            <label className="cursor-pointer flex items-center py-3 px-3 border-t hover:bg-gray-100">
              <input
                className="mr-2"
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
