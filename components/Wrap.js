export default function({ children, className, width=false }) {
  return (
    <section className={`px-5 w-full ${className}`}>
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
