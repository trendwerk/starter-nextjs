// API: <Image src="https://api.app/endpoint/image.jpg" width={480} />
// API with optional props: <Image alt="Oats" className="mb-8" fit="fill" height={320} style={{ display: 'flex' }} src="https://api.app/endpoint/image.jpg" width={480} />

const theme = require('../tailwind.config').theme

export default function ({
  alt = '',
  className = '',
  fit = 'crop',
  height,
  src,
  style,
  width,
}) {
  const allWidths = { ...theme.screens, img: width }
  const dpi1 = Object.values(allWidths).map((w) => parseInt(w))
  const dpi2 = Object.values(allWidths).map((w) => parseInt(w) * 2)

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

      return last ? `${w}px` : `(max-width: ${w}px) ${w}px`
    })
    .join(', ')

  const srcSet = (append = '') =>
    widths
      .map((w) => {
        let url = `${src}?w=${w}`

        if (height) {
          const ratio = width / height
          const h = Math.round(w / ratio)

          url += `&h=${h}`
        }

        return `${url}&fit=${fit}${append} ${w}w`
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
        src={`${src}?w=${width}&h=${height}`}
        srcSet={srcSet()}
        style={style}
        width={width}
      />
    </picture>
  )
}
