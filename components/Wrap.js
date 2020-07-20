export default function({ children, className, width=false, noMargin=false }) {
  return (
    <section className={`
        ${className}
        ${noMargin ? '' : 'mb-8 sm:mb-10 lg:mb-16'}
        px-5
        w-full
      `}>
      <div
        className={`
          ${width ? '' : 'max-w-screen-xl'}
          last:mb-0
          mx-auto
          w-full
        `}
        style={{maxWidth: width ? width + 'px' : null}}
      >
        {children}
      </div>
    </section>
  )
}
