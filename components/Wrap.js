export default function({ children, className, width=false }) {
  return (
    <section className={`px-5 w-full ${className}`}>
      <div
        className={`
          w-full
          ${!width && 'max-w-screen-xl'}
          mx-auto
        `}
        style={{maxWidth: width ? width + 'px' : null}}
      >
        {children}
      </div>
    </section>
  )
}
