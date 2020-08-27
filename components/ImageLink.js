import Image from 'components/Image'
import Link from 'components/Link'

export default function ImageLink({
  alt,
  className = '',
  height,
  href,
  image,
  width,
}) {
  return image ? (
    <Link
      className={`
            bg-black
            overflow-hidden
            rounded
            ${className}
          `}
      href={href}
    >
      <Image
        alt={alt}
        className="
              duration-300
              ease-in-out
              hover:scale-105
              transform
              transition-transform
            "
        src={image}
        width={width}
        height={height}
      />
    </Link>
  ) : null
}
