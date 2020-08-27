import Link from './Link'

export default function Submenu({ items, title }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
