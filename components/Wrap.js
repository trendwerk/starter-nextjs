export default function({ children, className, width=false, noMargin=false }) {
  return (
    <section className={`px-5 w-full ${className}`}>
      <div
        className={`
          ${noMargin ? 'mb-8 sm:mb-12' : ''}
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
