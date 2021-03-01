import classnames from 'classnames'
import Link from 'components/Link'

export default function Alert({ className, children, link, type = 'warning' }) {
  return (
    <div
      className={classnames(
        'p-3 rounded flex items-center leading-6 text-base',
        type == 'error' && 'bg-red-500 text-white',
        type == 'warning' && 'bg-yellow-400',
        type == 'success' && 'bg-green-500 text-white',
        className
      )}
    >
      {type === 'error' && (
        <svg
          className="w-6 h-6 mr-3 flex-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      {type === 'warning' && (
        <svg
          className="w-6 h-6 mr-3 flex-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      {type === 'success' && (
        <svg
          className="w-6 h-6 mr-3 flex-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full">
        {children}

        {link && (
          <Link
            className="underline mt-2 sm:mt-0 sm:mr-2 sm:ml-6 flex-none"
            href={link.href}
          >
            {link.label}
          </Link>
        )}
      </div>
    </div>
  )
}
