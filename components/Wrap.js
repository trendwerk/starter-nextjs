export default function({ children, className, width=false, noMargin=false }) {
  return (
    <section className={`
        ${className}
        ${noMargin ? '' : 'my-10 sm:my-16 lg:my-24'}
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
