import Link from './Link'

export default function Submenu({ data }) {
  return (
    <>
      <h3 className="mb-6">{data.label}</h3>
      <ul className="list-none border-b">
        {data.childItems.nodes.map((item) => (
          <li key={item.id} className="my-0">
            <Link
              className="py-3 px-3 border-t hover:bg-gray-100 flex"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
