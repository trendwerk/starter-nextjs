const theme = require('tailwindcss/defaultTheme')
const base = `${process.env.WORDPRESS_API_URL}/static`

export default ({ url, width, height, alt = '', screens }) => {
  const ratio = width / height
  const screensList = screens ? { ...theme.screens, ...screens } : theme.screens
  const widths = Object.values(screensList).map((breakpoint) =>
    parseInt(breakpoint)
  )
  const sizes = widths
    .map((w, i) => {
      return i === widths.length - 1 ? `${w}px` : `(max-width: ${w}px) ${w}px`
    })
    .join(', ')
  const srcSet = (append = '') =>
    widths
      .map((w) => {
        const h = Math.round(w / ratio)
        return `${base}/${url}?w=${w}&h=${h}${append} ${w}w`
      })
      .join(', ')

  return (
    <picture>
      <source type="image/webp" sizes={sizes} srcSet={srcSet('&fm=webp')} />
      <img
        alt={alt}
        className="bg-gray-200"
        height={height}
        loading="lazy"
        sizes={sizes}
        src={`${base}/${url}?w=${width}&h=${height}`}
        srcSet={srcSet()}
        width={width}
      />
    </picture>
  )
}
