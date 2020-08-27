export default function Date({ className = '', date }) {
  return (
    <div
      className={`
      ${className}
      font-semibold
      text-gray-400
      tracking-wide
      uppercase
    `}
    >
      {date}
    </div>
  )
}
