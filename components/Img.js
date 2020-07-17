// API: <Img src="2020/07/oats.jpg" width={480} height={320} alt="Oats" className="mb-8" />

const theme = require('../tailwind.config').theme

export default ({
  src,
  width,
  height,
  alt = '',
  className = '',
  screens = null,
}) => {
  const ratio = width / height
  const screensList = screens ? { ...theme.screens, ...screens } : theme.screens
  const allWidths = { ...screensList, img: width }
  const dpi1 = Object.values(allWidths).map((w) => parseInt(w))
  const dpi2 = Object.values(allWidths).map((w) => parseInt(w) * 2)
  const wrapPadding = 40 * 2

  const widths = [...dpi1, ...dpi2]
    .filter((w, index, all) => {
      const tooLarge = w > width * 2
      const duplicate = all.indexOf(w) !== index

      return !tooLarge && !duplicate
    })
    .sort((a, b) => a - b)

  const sizes = widths
    .map((w, i) => {
      const last = i === widths.length - 1

      return last ? `${w}px` : `(max-width: ${w + wrapPadding}px) ${w}px`
    })
    .join(', ')

  const srcSet = (append = '') =>
    widths
      .map((w) => {
        const h = Math.round(w / ratio)
        return `${process.env.STATIC_URL}/${src}?w=${w}&h=${h}${append} ${w}w`
      })
      .join(', ')

  return (
    <picture>
      <source type="image/webp" sizes={sizes} srcSet={srcSet('&fm=webp')} />
      <img
        alt={alt}
        className={`bg-gray-200 ${className}`}
        height={height}
        loading="lazy"
        sizes={sizes}
        src={`${process.env.STATIC_URL}/${src}?w=${width}&h=${height}`}
        srcSet={srcSet()}
        width={width}
      />
    </picture>
  )
}
