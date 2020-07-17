export default function({ children, className }) {
  return (
    <section className={`px-5 w-full ${className}`}>
      <div className="w-full max-w-screen-xl mx-auto">{children}</div>
    </section>
  )
}
