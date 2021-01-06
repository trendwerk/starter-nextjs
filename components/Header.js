import Image from 'components/Image'

export default function Header({ image, title }) {
  return image ? (
    <Image
      alt={title}
      className="w-full h-auto object-cover"
      height={800}
      layout="fill"
      priority
      src={image.url}
      style={{ maxHeight: '600px' }}
      width={1600}
    />
  ) : null
}
