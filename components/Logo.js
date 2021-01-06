import { useContext } from 'react'
import GeneralContext from 'components/GeneralContext'
import Link from 'components/Link'

export default function Logo() {
  const { app } = useContext(GeneralContext)

  return (
    <Link
      href="/"
      className="font-serif font-bold text-lg flex items-center flex-none"
    >
      <svg
        className="text-brand-600 h-8 w-8 mr-3 flex-none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 5C14 5 5 14 5 50s9 45 45 45 45-9 45-45S86 5 50 5z"
          fill="currentColor"
        />
      </svg>

      {app.title}
    </Link>
  )
}
