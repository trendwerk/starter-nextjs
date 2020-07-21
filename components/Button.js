import Router from 'components/Router'

export default function({
  as,
  children,
  className,
  href,
  large=false
}) {
  return (
    <Router href={href}>
      <a className={`
          bg-brand-600
          duration-200
          font-semibold
          hover:bg-brand-700
          inline-block
          rounded-lg
          shadow-md
          text-center
          text-white
          transition-bg
          ${large ? `
            px-8
            py-4
          ` : `
            px-6
            py-3
            text-sm
          `}
          ${className}
      `}>
        {children}
      </a>
    </Router>
  )
}
