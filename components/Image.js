import { useContext } from 'react'
import classnames from 'classnames'
import GeneralContext from 'components/GeneralContext'
import NextImage from 'next/image'

export default function Image({
  alt = '',
  className,
  fit = 'crop',
  withPlaceholder = false,
  layout = 'responsive',
  height,
  sizes,
  src,
  priority = undefined,
  width,
}) {
  const { general } = useContext(GeneralContext)

  if (!src && withPlaceholder) {
    src = general.placeholder.url
  } else if (!src) {
    return null
  }

  src = `${src}?w=${width * 2}&h=${height * 2}&fit=${fit}`
  height = layout == 'fill' ? undefined : height
  width = layout == 'fill' ? undefined : width

  return (
    <NextImage
      alt={alt}
      className={classnames('object-cover bg-brown-100', className)}
      height={height}
      layout={layout}
      priority={priority}
      quality={80}
      sizes={sizes || `${width}px`}
      src={src}
      width={width}
    />
  )
}
