import Link from './Link'
import classnames from 'classnames'

export default function Submenu({ data, current }) {
  return (
    <>
      <h3 className="mb-6">{data.label}</h3>
      <ul className="list-none border-b">
        {data.childItems.nodes.map((item) => {
          const isCurrent = current === item.href

          return (
            <li key={item.id} className="my-0">
              <Link
                className={classnames(
                  'py-3 px-3 border-t hover:bg-gray-100 flex',
                  isCurrent && 'font-bold'
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
