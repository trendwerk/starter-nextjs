export default function ({
  children,
  className = '',
  width = false,
  noMargin = false,
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
        {children}
      </div>
    </section>
  )
}
