import Image from 'components/Image'

export default function Header({ image, title }) {
  return image ? (
    <div
      className="relative w-full h-auto"
      style={{ height: '50vw', maxHeight: '600px' }}
    >
      <Image
        alt={title}
        className="object-cover"
        height={800}
        layout="fill"
        priority
        src={image.url}
        width={1600}
      />
    </div>
  ) : null
}
