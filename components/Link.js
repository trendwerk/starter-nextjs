import Router from 'components/Router'

export default function({
  arrowleft = false,
  arrowright = false,
  children,
  className,
  href
}) {
  return (
    <Router
      className={`text-brand-600 hover:text-brand-700 transition-color duration-200 flex items-center ${className}`}
      href={href}
    >
      {arrowleft && (
        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {children}
      {arrowright && (
        <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </Router>
  )
}
