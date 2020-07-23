import Image from 'components/Image'

export default ({ image, title }) =>
  image ? (
    <Image
      alt={title}
      className="w-full h-auto object-cover"
      height={800}
      src={image.url}
      style={{ maxHeight: '600px' }}
      width={1600}
    />
  ) : null
