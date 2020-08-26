export default function Wrap({
  children,
  className = '',
  width = false,
  noMargin = false,
  sidebar,
}) {
  return (
    <section
      className={`
        ${className}
        ${noMargin ? '' : 'mt-10 mb-16 sm:mt-16 sm:mb-20 lg:mt-24 lg:mb-32'}
        px-5
        sm:px-10
        w-full
      `}
    >
      <div
        className={`
          ${width ? '' : 'max-w-screen-xl'}
          mx-auto
          w-full
        `}
        style={{ maxWidth: width ? width + 'px' : null }}
      >
        {sidebar ? (
          <div className="lg:flex flex-row-reverse">
            <div className="flex-1 mb-12 lg:mb-0">{children}</div>
            <div className="lg:w-1/4 lg:mr-16">{sidebar}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  )
}
